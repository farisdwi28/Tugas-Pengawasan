const { pool } = require('../config/database');

class PengawasanIzin {
  // Get all records
  static async getAll() {
    try {
      const [rows] = await pool.execute('SELECT * FROM pengawasan_dan_izin ORDER BY id_izin DESC');
      return rows;
    } catch (error) {
      throw new Error(`Error fetching all records: ${error.message}`);
    }
  }

  // Get record by ID
  static async getById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM pengawasan_dan_izin WHERE id_izin = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error fetching record by ID: ${error.message}`);
    }
  }

  // Get records by status
  static async getByStatus(status) {
    try {
      const [rows] = await pool.execute('SELECT * FROM pengawasan_dan_izin WHERE status_izin = ? ORDER BY id_izin DESC', [status]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching records by status: ${error.message}`);
    }
  }

  // Get records by jenis izin
  static async getByJenisIzin(jenisIzin) {
    try {
      const [rows] = await pool.execute('SELECT * FROM pengawasan_dan_izin WHERE jenis_izin = ? ORDER BY id_izin DESC', [jenisIzin]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching records by jenis izin: ${error.message}`);
    }
  }

  // Get records by pemohon
  static async getByPemohon(idPemohon) {
    try {
      const [rows] = await pool.execute('SELECT * FROM pengawasan_dan_izin WHERE id_pemohon = ? ORDER BY id_izin DESC', [idPemohon]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching records by pemohon: ${error.message}`);
    }
  }

  // Search records by nama pemohon
  static async searchByNama(nama) {
    try {
      const [rows] = await pool.execute('SELECT * FROM pengawasan_dan_izin WHERE nama_pemohon LIKE ? ORDER BY id_izin DESC', [`%${nama}%`]);
      return rows;
    } catch (error) {
      throw new Error(`Error searching records by nama: ${error.message}`);
    }
  }

  // Get records by date range
  static async getByDateRange(startDate, endDate) {
    try {
      const [rows] = await pool.execute('SELECT * FROM pengawasan_dan_izin WHERE tanggal_pengajuan BETWEEN ? AND ? ORDER BY tanggal_pengajuan DESC', [startDate, endDate]);
      return rows;
    } catch (error) {
      throw new Error(`Error fetching records by date range: ${error.message}`);
    }
  }

  // Get statistics
  static async getStatistics() {
    try {
      const [totalRows] = await pool.execute('SELECT COUNT(*) as total FROM pengawasan_dan_izin');
      const [statusRows] = await pool.execute('SELECT status_izin, COUNT(*) as count FROM pengawasan_dan_izin GROUP BY status_izin');
      const [jenisRows] = await pool.execute('SELECT jenis_izin, COUNT(*) as count FROM pengawasan_dan_izin GROUP BY jenis_izin');

      return {
        total: totalRows[0].total,
        byStatus: statusRows,
        byJenis: jenisRows
      };
    } catch (error) {
      throw new Error(`Error fetching statistics: ${error.message}`);
    }
  }
}

module.exports = PengawasanIzin;
