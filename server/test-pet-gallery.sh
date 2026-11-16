#!/bin/bash
set -euo pipefail
python3 -c 'import base64; open("/tmp/dot.png","wb").write(base64.b64decode("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="))'
echo hello > /tmp/not-image.txt
echo "--- post ---"
curl -sS -D - -o /tmp/post-body.json -F "name=Gallery test" -F "petName=Dot" -F "photo=@/tmp/dot.png;type=image/png" https://38-9-96-112.sslip.io/pets/posts
echo
echo "--- body ---"
cat /tmp/post-body.json
echo
echo "--- text reject ---"
curl -sS -F "name=Gallery test" -F "petName=Dot" -F "photo=@/tmp/not-image.txt;type=text/plain" https://38-9-96-112.sslip.io/pets/posts
echo
python3 - << 'PY'
import json
body = json.load(open("/tmp/post-body.json"))
src = body["post"]["src"]
print("src", src)
PY
src=$(python3 -c 'import json; print(json.load(open("/tmp/post-body.json"))["post"]["src"])')
echo "--- photo headers ---"
curl -sS -D - -o /dev/null "$src" | head -n 20
