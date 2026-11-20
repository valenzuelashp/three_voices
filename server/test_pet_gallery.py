import importlib.util
import json
import tempfile
import threading
import unittest
from http.server import ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen


spec = importlib.util.spec_from_file_location("pet_gallery", Path(__file__).with_name("pet-gallery.py"))
pet_gallery = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pet_gallery)


def multipart(fields, photo):
    boundary = "three-voices-test-boundary"
    parts = []
    for name, value in fields.items():
        parts.extend(
            [
                f"--{boundary}\r\n".encode(),
                f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode(),
                value.encode(),
                b"\r\n",
            ]
        )
    parts.extend(
        [
            f"--{boundary}\r\n".encode(),
            b'Content-Disposition: form-data; name="photo"; filename="pet.png"\r\n',
            b"Content-Type: image/png\r\n\r\n",
            photo,
            b"\r\n",
            f"--{boundary}--\r\n".encode(),
        ]
    )
    return boundary, b"".join(parts)


class LostPetApiTests(unittest.TestCase):
    def setUp(self):
        self.storage = tempfile.TemporaryDirectory()
        pet_gallery.ROOT = self.storage.name
        pet_gallery.PHOTO_DIR = str(Path(self.storage.name) / "photos")
        pet_gallery.POSTS_PATH = str(Path(self.storage.name) / "posts.json")
        pet_gallery.DEVELOPER_KEY = "test-key"
        pet_gallery.uploads.clear()
        pet_gallery.save_posts([])
        self.server = ThreadingHTTPServer(("127.0.0.1", 0), pet_gallery.GalleryHandler)
        self.thread = threading.Thread(target=self.server.serve_forever)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.server.server_port}"

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join()
        self.storage.cleanup()

    def request_json(self, path, method="GET", fields=None, photo=None, payload=None, headers=None):
        request_headers = dict(headers or {})
        body = None
        if fields is not None:
            boundary, body = multipart(fields, photo)
            request_headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"
        elif payload is not None:
            body = json.dumps(payload).encode()
            request_headers["Content-Type"] = "application/json"
        request = Request(self.base_url + path, data=body, headers=request_headers, method=method)
        try:
            with urlopen(request) as response:
                return response.status, json.loads(response.read())
        except HTTPError as response:
            return response.code, json.loads(response.read())

    def test_lost_reports_are_reviewed_and_separate_from_circle_photos(self):
        image = b"\x89PNG\r\n\x1a\n" + b"test-image-content-padding"
        status, submission = self.request_json(
            "/lost",
            method="POST",
            fields={
                "petName": "Milo",
                "reporterName": "Ari Santos",
                "contactNumber": "+63 912-345-6789",
                "publicContactConsent": "yes",
            },
            photo=image,
        )
        self.assertEqual(status, 201)
        post_id = submission["post"]["id"]
        self.assertNotIn("contactNumber", submission["post"])
        self.assertEqual(self.request_json("/lost")[1]["posts"], [])
        self.assertEqual(self.request_json("/posts")[1]["posts"], [])
        _, queue = self.request_json("/review", headers={"X-Developer-Key": "test-key"})
        self.assertEqual(queue["posts"][0]["reporterName"], "Ari Santos")
        self.assertEqual(queue["posts"][0]["contactNumber"], "+63 912-345-6789")

        self.request_json(
            "/review",
            method="POST",
            payload={"id": post_id, "action": "approve"},
            headers={"X-Developer-Key": "test-key"},
        )
        lost_posts = self.request_json("/lost")[1]["posts"]
        self.assertEqual([post["petName"] for post in lost_posts], ["Milo"])
        self.assertEqual(lost_posts[0]["reporterName"], "Ari Santos")
        self.assertEqual(lost_posts[0]["contactNumber"], "+63 912-345-6789")
        self.assertEqual(self.request_json("/posts")[1]["posts"], [])

        _, circle = self.request_json(
            "/posts",
            method="POST",
            fields={"name": "Ari", "petName": "Luna"},
            photo=image,
        )
        self.request_json(
            "/review",
            method="POST",
            payload={"id": circle["post"]["id"], "action": "approve"},
            headers={"X-Developer-Key": "test-key"},
        )
        self.assertEqual([post["petName"] for post in self.request_json("/posts")[1]["posts"]], ["Luna"])
        self.assertEqual([post["petName"] for post in self.request_json("/lost")[1]["posts"]], ["Milo"])

    def test_lost_reports_require_valid_contact_and_publication_consent(self):
        image = b"\x89PNG\r\n\x1a\n" + b"test-image-content-padding"
        fields = {
            "petName": "Milo",
            "reporterName": "Ari Santos",
            "contactNumber": "123456789",
        }
        status, response = self.request_json("/lost", method="POST", fields=fields, photo=image)
        self.assertEqual(status, 400)
        self.assertIn("Consent", response["error"])

        fields["contactNumber"] = "not a phone"
        fields["publicContactConsent"] = "yes"
        status, response = self.request_json("/lost", method="POST", fields=fields, photo=image)
        self.assertEqual(status, 400)
        self.assertIn("contact number", response["error"])


if __name__ == "__main__":
    unittest.main()
