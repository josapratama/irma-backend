# Irma Portfolio — Backend API

REST API untuk mengelola seluruh konten portofolio Irma Iryani.  
Dibangun dengan **Hono** + **MongoDB** (Mongoose) + **TypeScript**.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | [Hono](https://hono.dev) + [@hono/node-server](https://github.com/honojs/node-server) |
| Database | MongoDB via [Mongoose](https://mongoosejs.com) |
| Validasi | [Zod](https://zod.dev) |
| Auth | JWT ([jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)) + bcrypt |
| Email | [Nodemailer](https://nodemailer.com) |
| Runtime | Node.js + [tsx](https://github.com/privatenumber/tsx) |

---

## Struktur Folder

```
backend/
├── src/
│   ├── config/
│   │   ├── db.ts          # Koneksi MongoDB
│   │   └── env.ts         # Environment variables
│   ├── middleware/
│   │   ├── auth.ts        # JWT auth middleware
│   │   ├── cors.ts        # CORS middleware
│   │   └── logger.ts      # Request logger
│   ├── models/
│   │   ├── Admin.ts
│   │   ├── Certificate.ts
│   │   ├── Contact.ts
│   │   ├── Experience.ts
│   │   ├── Project.ts
│   │   ├── RecommendationLetter.ts
│   │   └── Skill.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── certificates.ts
│   │   ├── contact.ts
│   │   ├── experiences.ts
│   │   ├── projects.ts
│   │   ├── recommendationLetters.ts
│   │   └── skills.ts
│   ├── schemas/           # Zod validation schemas
│   ├── utils/
│   │   ├── mailer.ts      # Nodemailer helper
│   │   ├── response.ts    # Standar JSON response
│   │   └── validate.ts    # Zod + Hono validator
│   └── index.ts           # Entry point
├── .env.example
├── package.json
└── tsconfig.json
```

---

## Quick Start

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Setup environment
```bash
cp .env.example .env
# Edit .env sesuai konfigurasi
```

### 3. Buat admin pertama (one-time setup)
```bash
# Jalankan server dulu, lalu:
curl -X POST http://localhost:3001/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

### 4. Jalankan development server
```bash
npm run dev
```

### 5. Build production
```bash
npm run build
npm start
```

---

## API Reference

Base URL: `http://localhost:3001/api`

Semua endpoint admin memerlukan header:
```
Authorization: Bearer <token>
```

---

### 🔐 Auth

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| POST | `/auth/setup` | ✗ | Buat admin pertama (sekali pakai) |
| POST | `/auth/login` | ✗ | Login, dapat token JWT |
| GET | `/auth/me` | ✓ | Info admin yang sedang login |
| PATCH | `/auth/change-password` | ✓ | Ganti password admin |

**Login request:**
```json
{ "email": "admin@example.com", "password": "password123" }
```
**Login response:**
```json
{ "success": true, "data": { "token": "eyJ...", "email": "admin@example.com" } }
```

---

### 🏅 Certificates

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| GET | `/certificates` | ✗ | Semua sertifikat yang visible |
| GET | `/certificates?category=Technology` | ✗ | Filter by category |
| GET | `/certificates/:id` | ✗ | Detail sertifikat |
| GET | `/certificates/admin/all` | ✓ | Semua termasuk hidden |
| POST | `/certificates` | ✓ | Tambah sertifikat |
| PUT | `/certificates/:id` | ✓ | Update sertifikat |
| PATCH | `/certificates/:id/visibility` | ✓ | Toggle visible/hidden |
| PATCH | `/certificates/reorder` | ✓ | Update urutan massal |
| DELETE | `/certificates/:id` | ✓ | Hapus sertifikat |

**Category enum:** `Technology` | `Professional` | `Soft Skills` | `Data` | `Organization`

**Create/Update body:**
```json
{
  "title": { "id": "Nama Sertifikat", "en": "Certificate Name" },
  "issuer": "Nama Lembaga",
  "date": "17 Juli 2026",
  "score": "Nilai 95",
  "category": "Technology",
  "images": ["/certificates/cert-name.png"],
  "pdfPath": "/certificates/cert-name.pdf",
  "order": 1,
  "isVisible": true
}
```

---

### 📁 Projects

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| GET | `/projects` | ✗ | Semua project yang visible |
| GET | `/projects/:id` | ✗ | Detail project |
| GET | `/projects/admin/all` | ✓ | Semua termasuk hidden |
| POST | `/projects` | ✓ | Tambah project |
| PUT | `/projects/:id` | ✓ | Update project |
| PATCH | `/projects/:id/visibility` | ✓ | Toggle visible/hidden |
| PATCH | `/projects/reorder` | ✓ | Update urutan massal |
| DELETE | `/projects/:id` | ✓ | Hapus project |

**Create/Update body:**
```json
{
  "title": { "id": "Nama Proyek", "en": "Project Name" },
  "description": { "id": "Deskripsi", "en": "Description" },
  "tags": ["Excel", "Data Analysis"],
  "pdfPath": "/projects/portfolio.pdf",
  "fileName": "portfolio.pdf",
  "order": 1,
  "isVisible": true
}
```

---

### 🏫 Experiences

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| GET | `/experiences` | ✗ | Semua experience yang visible |
| GET | `/experiences?type=internship` | ✗ | Filter by type |
| GET | `/experiences/:id` | ✗ | Detail experience |
| GET | `/experiences/admin/all` | ✓ | Semua termasuk hidden |
| POST | `/experiences` | ✓ | Tambah experience |
| PUT | `/experiences/:id` | ✓ | Update experience |
| PATCH | `/experiences/:id/points` | ✓ | Update daftar points |
| PATCH | `/experiences/:id/visibility` | ✓ | Toggle visible/hidden |
| PATCH | `/experiences/reorder` | ✓ | Update urutan massal |
| DELETE | `/experiences/:id` | ✓ | Hapus experience |

**Type enum:** `internship` | `organization`

---

### 🛠 Skills

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| GET | `/skills` | ✗ | Semua skill group yang visible |
| GET | `/skills?category=hard` | ✗ | Filter by category |
| GET | `/skills/:id` | ✗ | Detail skill group |
| GET | `/skills/admin/all` | ✓ | Semua termasuk hidden |
| POST | `/skills` | ✓ | Buat skill group baru |
| PUT | `/skills/:id` | ✓ | Update seluruh skill group |
| POST | `/skills/:id/items` | ✓ | Tambah satu skill item |
| PUT | `/skills/:id/items/:index` | ✓ | Update skill item by index |
| DELETE | `/skills/:id/items/:index` | ✓ | Hapus skill item by index |
| PATCH | `/skills/:id/items/reorder` | ✓ | Susun ulang items |
| PATCH | `/skills/:id/visibility` | ✓ | Toggle visible/hidden |
| DELETE | `/skills/:id` | ✓ | Hapus skill group |

**Category enum:** `hard` | `soft`

---

### 📜 Recommendation Letters

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| GET | `/recommendation-letters` | ✗ | Semua surat yang visible |
| GET | `/recommendation-letters/:id` | ✗ | Detail surat |
| GET | `/recommendation-letters/admin/all` | ✓ | Semua termasuk hidden |
| POST | `/recommendation-letters` | ✓ | Tambah surat rekomendasi |
| PUT | `/recommendation-letters/:id` | ✓ | Update surat |
| PATCH | `/recommendation-letters/:id/pages` | ✓ | Update array halaman |
| PATCH | `/recommendation-letters/:id/visibility` | ✓ | Toggle visible/hidden |
| PATCH | `/recommendation-letters/reorder` | ✓ | Update urutan massal |
| DELETE | `/recommendation-letters/:id` | ✓ | Hapus surat |

---

### 📬 Contact

| Method | Endpoint | Auth | Deskripsi |
|---|---|---|---|
| POST | `/contact` | ✗ | Kirim pesan (+ email notifikasi) |
| GET | `/contact` | ✓ | Semua pesan dengan pagination |
| GET | `/contact?status=unread` | ✓ | Filter by status |
| GET | `/contact/stats` | ✓ | Ringkasan jumlah per status |
| GET | `/contact/:id` | ✓ | Detail pesan (auto-mark read) |
| PATCH | `/contact/:id/status` | ✓ | Update status pesan |
| DELETE | `/contact/:id` | ✓ | Hapus pesan |
| DELETE | `/contact/bulk` | ✓ | Hapus banyak pesan sekaligus |

**Send message body:**
```json
{
  "name": "Nama Pengirim",
  "email": "pengirim@email.com",
  "subject": "Kolaborasi",
  "message": "Halo Irma, saya ingin..."
}
```

**Status enum:** `unread` | `read` | `replied`

---

## Standard Response Format

**Success:**
```json
{
  "success": true,
  "message": "OK",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email address" }]
}
```

---

## Setup Gmail SMTP

1. Aktifkan **2-Factor Authentication** di akun Google
2. Buka [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Buat App Password baru → pilih "Mail"
4. Salin password 16 karakter ke `SMTP_PASS` di `.env`

---

## Deploy

### Railway / Render
1. Push folder `backend` ke repo terpisah atau gunakan monorepo
2. Set environment variables sesuai `.env.example`
3. Build command: `npm run build`
4. Start command: `npm start`

### MongoDB Atlas (Production)
1. Buat cluster gratis di [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Whitelist IP server di Network Access
3. Salin connection string ke `MONGODB_URI`
