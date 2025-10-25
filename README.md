# Pengawasan & Izin API

API Node.js untuk mengelola data pengawasan dan izin menggunakan database MySQL.

## 📋 Prerequisites

- Node.js (versi 14 atau lebih baru)
- MySQL Server
- Database `db_pu_pengawasan` dengan tabel `pengawasan_dan_izin`

## 🗄️ Struktur Database

```sql
CREATE TABLE pengawasan_dan_izin (
    id_izin INT AUTO_INCREMENT PRIMARY KEY,
    id_pemohon VARCHAR(50),
    nama_pemohon VARCHAR(100),
    jenis_izin VARCHAR(50),
    tanggal_pengajuan DATE,
    status_izin VARCHAR(50)
);
```

## 🚀 Instalasi

1. Clone atau download project ini
2. Install dependencies:
```bash
npm install
```

3. Konfigurasi database dengan menyalin dan mengedit file konfigurasi:
```bash
cp config.example.js config.js
```

Edit file `config.js` dengan kredensial database Anda:
```javascript
const config = {
  database: {
    host: 'localhost',
    user: 'root',
    password: 'your_password', // Ganti dengan password MySQL Anda
    database: 'db_pu_pengawasan'
  },
  server: {
    port: 3000
  }
};

module.exports = config;
```

4. Jalankan server:
```bash
npm start
```

Untuk development dengan auto-reload:
```bash
npm run dev
```

## 📚 API Endpoints

### Base URL
```
http://localhost:3000/api/pengawasan-izin
```

### 1. Get All Records
- **URL**: `GET /api/pengawasan-izin`
- **Description**: Mengambil semua data pengawasan dan izin
- **Response**:
```json
{
  "success": true,
  "message": "Data retrieved successfully",
  "data": [...],
  "count": 10
}
```

### 2. Get Record by ID
- **URL**: `GET /api/pengawasan-izin/:id`
- **Description**: Mengambil data berdasarkan ID izin
- **Parameters**: `id` (integer)
- **Example**: `GET /api/pengawasan-izin/1`

### 3. Get Records by Status
- **URL**: `GET /api/pengawasan-izin/status/:status`
- **Description**: Mengambil data berdasarkan status izin
- **Parameters**: `status` (string)
- **Example**: `GET /api/pengawasan-izin/status/Disetujui`

### 4. Get Records by Jenis Izin
- **URL**: `GET /api/pengawasan-izin/jenis/:jenis`
- **Description**: Mengambil data berdasarkan jenis izin
- **Parameters**: `jenis` (string)
- **Example**: `GET /api/pengawasan-izin/jenis/IMB`

### 5. Get Records by Pemohon
- **URL**: `GET /api/pengawasan-izin/pemohon/:idPemohon`
- **Description**: Mengambil data berdasarkan ID pemohon
- **Parameters**: `idPemohon` (string)
- **Example**: `GET /api/pengawasan-izin/pemohon/PEM001`

### 6. Search by Nama Pemohon
- **URL**: `GET /api/pengawasan-izin/search/nama?nama=value`
- **Description**: Pencarian berdasarkan nama pemohon (partial match)
- **Query Parameters**: `nama` (string)
- **Example**: `GET /api/pengawasan-izin/search/nama?nama=john`

### 7. Filter by Date Range
- **URL**: `GET /api/pengawasan-izin/filter/date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
- **Description**: Mengambil data berdasarkan rentang tanggal pengajuan
- **Query Parameters**:
  - `startDate` (string, format: YYYY-MM-DD)
  - `endDate` (string, format: YYYY-MM-DD)
- **Example**: `GET /api/pengawasan-izin/filter/date?startDate=2024-01-01&endDate=2024-12-31`

### 8. Get Statistics
- **URL**: `GET /api/pengawasan-izin/stats/overview`
- **Description**: Mengambil statistik data pengawasan dan izin
- **Response**:
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
  "data": {
    "total": 150,
    "byStatus": [
      {"status_izin": "Disetujui", "count": 100},
      {"status_izin": "Ditolak", "count": 30},
      {"status_izin": "Diproses", "count": 20}
    ],
    "byJenis": [
      {"jenis_izin": "IMB", "count": 80},
      {"jenis_izin": "HO", "count": 45},
      {"jenis_izin": "SLF", "count": 25}
    ]
  }
}
```

## 🔧 Additional Endpoints

### Health Check
- **URL**: `GET /health`
- **Description**: Mengecek status server

### API Info
- **URL**: `GET /`
- **Description**: Informasi API dan daftar endpoint yang tersedia

## 📁 Project Structure

```
├── config/
│   └── database.js          # Database connection configuration
├── controllers/
│   └── pengawasanIzinController.js  # API controllers
├── models/
│   └── PengawasanIzin.js    # Database models
├── routes/
│   └── pengawasanIzin.js    # API routes
├── index.js                 # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🛠️ Dependencies

- **express**: Web framework untuk Node.js
- **mysql2**: MySQL client untuk Node.js
- **cors**: Middleware untuk Cross-Origin Resource Sharing
- **dotenv**: Environment variable management

## 📊 Response Format

Semua API response mengikuti format standar:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...},
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## 🔒 Error Codes

- `200`: Success
- `400`: Bad Request (missing parameters)
- `404`: Not Found
- `500`: Internal Server Error

## 📝 Notes

- Semua endpoint menggunakan metode GET
- Database connection menggunakan connection pooling untuk performa optimal
- API mendukung CORS untuk cross-origin requests
- Error handling yang komprehensif dengan logging

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
