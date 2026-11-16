#!/bin/bash
set -euo pipefail
KEY=$(sed -n 's/^Environment=PET_DEVELOPER_KEY=//p' /etc/systemd/system/pet-gallery.service)
python3 -c 'import base64; open("/tmp/dot.png","wb").write(base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="))'
echo "--- public before ---"
curl -fsS https://38-9-96-112.sslip.io/pets/posts
echo
echo "--- submit ---"
curl -fsS -F "name=Review test" -F "petName=Dot" -F "photo=@/tmp/dot.png;type=image/png" https://38-9-96-112.sslip.io/pets/posts
echo
echo "--- public while pending ---"
curl -fsS https://38-9-96-112.sslip.io/pets/posts
echo
echo "--- review without key ---"
curl -sS -o /tmp/review-no-key.txt -w "%{http_code}" https://38-9-96-112.sslip.io/pets/review
echo
cat /tmp/review-no-key.txt
echo
ID=$(curl -fsS -H "X-Developer-Key: $KEY" https://38-9-96-112.sslip.io/pets/review | python3 -c 'import json,sys; print(json.load(sys.stdin)["posts"][0]["id"])')
echo "--- approve $ID ---"
curl -fsS -H "X-Developer-Key: $KEY" -H "Content-Type: application/json" -d "{\"id\":\"$ID\",\"action\":\"approve\"}" https://38-9-96-112.sslip.io/pets/review
echo
echo "--- public after approve ---"
curl -fsS https://38-9-96-112.sslip.io/pets/posts
echo
echo "--- remove ---"
curl -fsS -H "X-Developer-Key: $KEY" -H "Content-Type: application/json" -d "{\"id\":\"$ID\",\"action\":\"decline\"}" https://38-9-96-112.sslip.io/pets/review
echo
echo "--- public after remove ---"
curl -fsS https://38-9-96-112.sslip.io/pets/posts
echo
rm -f /tmp/dot.png /tmp/review-no-key.txt
