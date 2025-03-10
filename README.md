# Attendance RESTful API

## 📌 Overview
Attendance RESTful API memungkinkan pengguna untuk melakukan **register**, **login-in**, **clock-in** dan **clock-out**, serta melihat laporan absensi dengan fitur pencarian dan filter. API ini menggunakan **TypeScript, Express.js, MySQL, Redis, dan Elasticsearch**, serta menggunakan **JWT** untuk autentikasi.

## 🚀 Tech Stack
- **Node.js** (Express.js, TypeScript)
- **MySQL** (Primary Database)
- **Redis** (Realtime attendance tracking, caching, reminders)
- **Docker** (Containerization)
- **Postman** (API Documentation)
- **JWT** (Authentication)

## 📦 Features
- 🔐 **User Authentication** (JWT)
- 🕒 **Clock-in & Clock-out**
- 📊 **Attendance Report** (Search & Filtering)
- ⚡ **Realtime Attendance Data** (Redis)
- 🔥 **Caching Frequently Accessed Data** (Redis)

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites
- **Docker & Docker Compose**
- **Node.js** (v16+)
- **MySQL**
- **Redis**

### 2️⃣ Clone Repository
```sh
git clone https://github.com/aidiel97/attendance-service.git
cd attendance-api
```

### 3️⃣ Setup Environment Variables
Buat file `.env` berdasarkan `.env.example` dan isi dengan konfigurasi yang sesuai.

### 4️⃣ Start Docker Services
```sh
docker-compose up -d
```

### 5️⃣ Install Dependencies & Run Migration
```sh
npm install
npm run migrate
```

### 6️⃣ Start the Server
```sh
npm run dev
```

Server akan berjalan di `http://localhost:3000` (secara default)

## 📖 API Documentation
API dapat diakses melalui **Postman**:
**Postman Collection**: Import `postman_collection.json`

## 🐳 Docker Commands
- **Start Services:** `docker-compose up -d`
- **Stop Services:** `docker-compose down`
- **Rebuild Containers:** `docker-compose up --build`

## 🔗 Contributing
1. Fork repository ini.
2. Buat branch baru (`git checkout -b feature-branch`).
3. Commit perubahan (`git commit -m 'Add new feature'`).
4. Push ke branch (`git push origin feature-branch`).
5. Buat Pull Request.

## 📜 License
MIT License