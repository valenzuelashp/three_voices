#!/usr/bin/env python3
"""Small pet-photo gallery. Images only, stored outside the web root."""

import json
import os
import re
import secrets
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = "127.0.0.1"
PORT = 8791
ROOT = os.environ.get("PET_GALLERY_ROOT", "/var/lib/pet-gallery")
PHOTO_DIR = os.path.join(ROOT, "photos")
POSTS_PATH = os.path.join(ROOT, "posts.json")
PUBLIC_PREFIX = os.environ.get("PET_PUBLIC_PREFIX", "/pets")
DEVELOPER_KEY = os.environ.get("PET_DEVELOPER_KEY", "")
MAX_BYTES = 4 * 1024 * 1024
MAX_POSTS = 60
MAX_TEXT = 40
RATE_LIMIT = 6
RATE_WINDOW = 60 * 60

TYPES = {
    "jpg": "image/jpeg",
    "png": "image/png",
    "webp": "image/webp",
}
PHOTO_NAME = re.compile(r"^[a-f0-9]{16}\.(jpg|png|webp)$")

lock = threading.Lock()
uploads = {}


def clean(value):
    text = " ".join(str(value or "").split())
    text = "".join(ch for ch in text if ch.isprintable())
    return text[:MAX_TEXT]


def detect_image(data):
    if data.startswith(b"\xff\xd8\xff"):
        return "jpg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "png"
    if len(data) > 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "webp"
    return None


def load_posts():
    if not os.path.exists(POSTS_PATH):
        return []
    with open(POSTS_PATH, "r", encoding="utf-8") as handle:
        data = json.load(handle)
    return data if isinstance(data, list) else []


def save_posts(posts):
    temporary = POSTS_PATH + ".tmp"
    with open(temporary, "w", encoding="utf-8") as handle:
        json.dump(posts, handle)
    os.replace(temporary, POSTS_PATH)


def public_view(post):
    return {key: post[key] for key in ("id", "name", "petName", "caption", "src", "alt") if key in post}


def allow_upload(ip):
    now = time.time()
    recent = [stamp for stamp in uploads.get(ip, []) if now - stamp < RATE_WINDOW]
    if len(recent) >= RATE_LIMIT:
        uploads[ip] = recent
        return False
    recent.append(now)
    uploads[ip] = recent
    return True


def parse_multipart(body, content_type):
    match = re.search(r'boundary=(?:"([^"]+)"|([^;]+))', content_type or "")
    if not match:
        raise ValueError("Choose a photo and try again.")
    boundary = (match.group(1) or match.group(2)).strip().encode("utf-8", "replace")
    fields = {}
    for part in body.split(b"--" + boundary):
        part = part.strip(b"\r\n")
        if not part or part == b"--":
            continue
        if part.endswith(b"--"):
            part = part[:-2].rstrip(b"\r\n")
        header_blob, separator, data = part.partition(b"\r\n\r\n")
        if separator == b"":
            continue
        headers = header_blob.decode("utf-8", "replace")
        name_match = re.search(r'name="([^"]+)"', headers)
        if not name_match:
            continue
        data = data.removesuffix(b"\r\n")
        filename_match = re.search(r'filename="([^"]*)"', headers)
        if filename_match:
            fields[name_match.group(1)] = data
        else:
            fields[name_match.group(1)] = data.decode("utf-8", "replace")
    return fields


class GalleryHandler(BaseHTTPRequestHandler):
    server_version = "PetGallery/1.0"

    def log_message(self, fmt, *args):
        print("%s - %s" % (self.address_string(), fmt % args))

    def client_ip(self):
        forwarded = self.headers.get("X-Real-IP", "")
        return forwarded.split(",")[0].strip() or self.client_address[0]

    def public_base(self):
        proto = self.headers.get("X-Forwarded-Proto", "http")
        host = self.headers.get("Host", f"{HOST}:{PORT}")
        return f"{proto}://{host}{PUBLIC_PREFIX}"

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_cors()
        self.end_headers()
        self.wfile.write(body)

    def send_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, X-Developer-Key")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_cors()
        self.send_header("Access-Control-Max-Age", "86400")
        self.end_headers()

    def authorized(self):
        provided = self.headers.get("X-Developer-Key", "")
        if not DEVELOPER_KEY or not provided:
            return False
        return secrets.compare_digest(provided, DEVELOPER_KEY)

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/posts":
            with lock:
                posts = load_posts()
            visible = [public_view(post) for post in posts if post.get("status", "approved") == "approved"]
            self.send_json(200, {"posts": visible})
            return
        if path == "/review":
            if not self.authorized():
                self.send_json(401, {"error": "Enter the developer key."})
                return
            with lock:
                posts = load_posts()
            self.send_json(200, {"posts": posts})
            return
        if path.startswith("/photos/"):
            self.send_photo(path.removeprefix("/photos/"))
            return
        self.send_json(404, {"error": "Not found."})

    def send_photo(self, name):
        if not PHOTO_NAME.match(name):
            self.send_json(404, {"error": "Not found."})
            return
        file_path = os.path.join(PHOTO_DIR, name)
        if not os.path.isfile(file_path):
            self.send_json(404, {"error": "Not found."})
            return
        ext = name.rsplit(".", 1)[1]
        with open(file_path, "rb") as handle:
            data = handle.read()
        self.send_response(200)
        self.send_header("Content-Type", TYPES[ext])
        self.send_header("Content-Length", str(len(data)))
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Cache-Control", "public, max-age=86400")
        self.send_cors()
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        if path == "/review":
            self.review_action()
            return
        if path != "/posts":
            self.send_json(404, {"error": "Not found."})
            return
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0 or length > MAX_BYTES + 200_000:
            self.send_json(413, {"error": "Use a photo smaller than 4 MB."})
            return
        body = self.rfile.read(length)
        try:
            fields = parse_multipart(body, self.headers.get("Content-Type", ""))
        except ValueError as error:
            self.send_json(400, {"error": str(error)})
            return

        name = clean(fields.get("name", ""))
        pet_name = clean(fields.get("petName", ""))
        photo = fields.get("photo")
        if len(name) < 2:
            self.send_json(400, {"error": "Enter your name."})
            return
        if len(pet_name) < 1:
            self.send_json(400, {"error": "Enter your pet's name."})
            return
        if not isinstance(photo, bytes) or len(photo) < 32:
            self.send_json(400, {"error": "Choose a photo to share."})
            return
        if len(photo) > MAX_BYTES:
            self.send_json(413, {"error": "Use a photo smaller than 4 MB."})
            return
        kind = detect_image(photo)
        if not kind:
            self.send_json(415, {"error": "Use a JPG, PNG, or WEBP photo."})
            return
        if not allow_upload(self.client_ip()):
            self.send_json(429, {"error": "Too many photos from this connection. Try again in a little while."})
            return

        token = os.urandom(8).hex()
        filename = f"{token}.{kind}"
        with lock:
            posts = load_posts()
            if len(posts) >= MAX_POSTS:
                self.send_json(507, {"error": "The circle is full for now."})
                return
            os.makedirs(PHOTO_DIR, exist_ok=True)
            with open(os.path.join(PHOTO_DIR, filename), "wb") as handle:
                handle.write(photo)
            post = {
                "id": token,
                "name": name,
                "petName": pet_name,
                "caption": pet_name,
                "src": f"{self.public_base()}/photos/{filename}",
                "alt": f"{pet_name} with {name}",
                "file": filename,
                "status": "pending",
            }
            posts.append(post)
            save_posts(posts)
        self.send_json(201, {"post": public_view(post), "status": "pending"})

    def review_action(self):
        if not self.authorized():
            self.send_json(401, {"error": "Enter the developer key."})
            return
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length <= 0 or length > 4000:
            self.send_json(400, {"error": "Choose a photo to review."})
            return
        try:
            data = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeError, json.JSONDecodeError):
            self.send_json(400, {"error": "Choose a photo to review."})
            return
        action = data.get("action")
        post_id = str(data.get("id") or "")
        if action not in ("approve", "decline") or not re.fullmatch(r"[a-f0-9]{16}", post_id):
            self.send_json(400, {"error": "Choose a photo to review."})
            return
        with lock:
            posts = load_posts()
            match = next((post for post in posts if post.get("id") == post_id), None)
            if not match:
                self.send_json(404, {"error": "That photo is no longer waiting."})
                return
            if action == "approve":
                match["status"] = "approved"
            else:
                filename = match.get("file", "")
                if PHOTO_NAME.match(filename):
                    try:
                        os.remove(os.path.join(PHOTO_DIR, filename))
                    except FileNotFoundError:
                        pass
                posts = [post for post in posts if post.get("id") != post_id]
            save_posts(posts)
        self.send_json(200, {"ok": True})


def main():
    os.makedirs(PHOTO_DIR, exist_ok=True)
    if not os.path.exists(POSTS_PATH):
        save_posts([])
    server = ThreadingHTTPServer((HOST, PORT), GalleryHandler)
    print(f"pet gallery listening on {HOST}:{PORT}")
    server.serve_forever()


if __name__ == "__main__":
    main()
