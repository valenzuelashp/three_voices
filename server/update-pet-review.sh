#!/bin/bash
set -euo pipefail
sed -i 's/\r$//' /tmp/pet-gallery.py
install -m 644 /tmp/pet-gallery.py /opt/pet-gallery/server.py
python3 -m py_compile /opt/pet-gallery/server.py
UNIT=/etc/systemd/system/pet-gallery.service
if grep -q '^Environment=PET_DEVELOPER_KEY=.\+' "$UNIT"; then
  echo "KEY_EXISTS"
else
  KEY="pets-$(python3 -c 'import secrets; print(secrets.token_hex(4))')"
  sed -i "/^Environment=PET_PUBLIC_PREFIX/a Environment=PET_DEVELOPER_KEY=$KEY" "$UNIT"
  echo "NEW_KEY=$KEY"
fi
systemctl daemon-reload
systemctl restart pet-gallery.service
sleep 1
systemctl is-active pet-gallery.service
curl -fsS http://127.0.0.1:8791/posts
echo
