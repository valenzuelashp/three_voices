#!/bin/bash
set -euo pipefail

if ! id petgallery >/dev/null 2>&1; then
  useradd --system --home-dir /var/lib/pet-gallery --create-home --shell /usr/sbin/nologin petgallery
fi

mkdir -p /opt/pet-gallery /var/lib/pet-gallery/photos
sed -i 's/\r$//' /tmp/pet-gallery.py /tmp/pet-gallery.service /tmp/pet-gallery.nginx.conf
install -m 644 /tmp/pet-gallery.py /opt/pet-gallery/server.py
install -m 644 /tmp/pet-gallery.service /etc/systemd/system/pet-gallery.service
install -m 644 /tmp/pet-gallery.nginx.conf /etc/nginx/snippets/pet-gallery.conf
chown -R petgallery:petgallery /var/lib/pet-gallery
cp -a /etc/nginx/sites-enabled/genesis-messenger /root/genesis-messenger.bak-pet-gallery

python3 - << 'PY'
from pathlib import Path
path = Path("/etc/nginx/sites-enabled/genesis-messenger")
text = path.read_text()
if "pet-gallery.conf" not in text:
    needle = "    include /etc/nginx/snippets/rizal.conf;\n"
    if needle not in text:
        raise SystemExit("anchor missing")
    path.write_text(text.replace(needle, needle + "    include /etc/nginx/snippets/pet-gallery.conf;\n", 1))
PY

if ! nginx -t; then
  cp -a /root/genesis-messenger.bak-pet-gallery /etc/nginx/sites-enabled/genesis-messenger
  exit 1
fi

systemctl daemon-reload
systemctl enable --now pet-gallery.service
systemctl reload nginx
systemctl is-active pet-gallery.service
curl -fsS http://127.0.0.1:8791/posts
echo
