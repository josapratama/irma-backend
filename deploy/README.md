# Deploy Guide — irma.josapratama.cloud

## Info VPS
- IP: 202.155.13.117
- OS: Ubuntu 24.04
- Subdomain: irma.josapratama.cloud

---

## Urutan Deploy (pertama kali)

### Step 1 — Tambah DNS Record
Di panel domain josapratama.cloud → DNS Management:
```
Type : A
Name : irma
Value: 202.155.13.117
TTL  : 300
```
Tunggu 5–30 menit untuk propagasi.

### Step 2 — SSH ke VPS
```bash
ssh root@202.155.13.117
# Password: Forum2024Abc!
```

### Step 3 — Upload dan jalankan scripts
```bash
# Download scripts langsung dari repo
curl -fsSL https://raw.githubusercontent.com/josapratama/irma-iryani/main/backend/deploy/setup-vps.sh -o setup-vps.sh
curl -fsSL https://raw.githubusercontent.com/josapratama/irma-iryani/main/backend/deploy/deploy-backend.sh -o deploy-backend.sh
curl -fsSL https://raw.githubusercontent.com/josapratama/irma-iryani/main/backend/deploy/setup-nginx.sh -o setup-nginx.sh

chmod +x *.sh

# Jalankan berurutan
bash setup-vps.sh       # ~5 menit
bash deploy-backend.sh  # ~2 menit
bash setup-nginx.sh     # ~1 menit (DNS harus sudah propagasi)
```

### Step 4 — Setup admin pertama
```bash
curl -X POST https://irma.josapratama.cloud/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@josapratama.cloud","password":"GantiPasswordIni123!"}'
```

---

## Update kode (setelah deploy pertama)
```bash
ssh root@202.155.13.117
bash /var/www/irma-backend/backend/deploy/update.sh
```

---

## Cek status
```bash
pm2 list                    # Status proses
pm2 logs irma-backend       # Lihat logs
pm2 monit                   # Monitor real-time
systemctl status mongod     # Status MongoDB
systemctl status nginx      # Status Nginx
```

---

## Lokasi file penting
```
/var/www/irma-backend/backend/   # Kode backend
/var/www/irma-backend/backend/.env  # Environment variables
/etc/nginx/sites-available/irma-backend  # Nginx config
/var/log/irma-backend/           # Log files
```
