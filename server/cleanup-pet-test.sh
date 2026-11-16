#!/bin/bash
set -euo pipefail
python3 -c 'open("/tmp/fake.txt","w").write("x"*80)'
echo "--- type reject ---"
curl -sS -F "name=Gallery test" -F "petName=Dot" -F "photo=@/tmp/fake.txt;type=text/plain" https://38-9-96-112.sslip.io/pets/posts
echo
rm -f /var/lib/pet-gallery/photos/89ba0d8cf05740dc.png /tmp/dot.png /tmp/fake.txt /tmp/not-image.txt /tmp/post-body.json
printf '[]\n' > /var/lib/pet-gallery/posts.json
chown petgallery:petgallery /var/lib/pet-gallery/posts.json
systemctl restart pet-gallery.service
sleep 1
echo "--- empty ---"
curl -fsS https://38-9-96-112.sslip.io/pets/posts
echo
