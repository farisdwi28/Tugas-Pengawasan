const PengawasanIzin = require('../models/PengawasanIzin');

class PengawasanIzinController {
  // Get all records
  static async getAll(req, res) {
    try {
      const records = await PengawasanIzin.getAll();
      res.status(200).json({
        success: true,
        message: 'Data retrieved successfully',
        data: records,
        count: records.length
      });
    } catch (error) {
      console.error('Error in getAll:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get record by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const record = await PengawasanIzin.getById(id);

      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Record not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Record retrieved successfully',
        data: record
      });
    } catch (error) {
      console.error('Error in getById:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get records by status
  static async getByStatus(req, res) {
    try {
      const { status } = req.params;
      const records = await PengawasanIzin.getByStatus(status);

      res.status(200).json({
        success: true,
        message: `Records with status '${status}' retrieved successfully`,
        data: records,
        count: records.length
      });
    } catch (error) {
      console.error('Error in getByStatus:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get records by jenis izin
  static async getByJenisIzin(req, res) {
    try {
      const { jenis } = req.params;
      const records = await PengawasanIzin.getByJenisIzin(jenis);

      res.status(200).json({
        success: true,
        message: `Records with jenis izin '${jenis}' retrieved successfully`,
        data: records,
        count: records.length
      });
    } catch (error) {
      console.error('Error in getByJenisIzin:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get records by pemohon
  static async getByPemohon(req, res) {
    try {
      const { idPemohon } = req.params;
      const records = await PengawasanIzin.getByPemohon(idPemohon);

      res.status(200).json({
        success: true,
        message: `Records for pemohon '${idPemohon}' retrieved successfully`,
        data: records,
        count: records.length
      });
    } catch (error) {
      console.error('Error in getByPemohon:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Search by nama pemohon
  static async searchByNama(req, res) {
    try {
      const { nama } = req.query;

      if (!nama) {
        return res.status(400).json({
          success: false,
          message: 'Parameter nama is required'
        });
      }

      const records = await PengawasanIzin.searchByNama(nama);

      res.status(200).json({
        success: true,
        message: `Search results for '${nama}'`,
        data: records,
        count: records.length
      });
    } catch (error) {
      console.error('Error in searchByNama:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get records by date range
  static async getByDateRange(req, res) {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: 'Both startDate and endDate parameters are required'
        });
      }

      const records = await PengawasanIzin.getByDateRange(startDate, endDate);

      res.status(200).json({
        success: true,
        message: `Records between ${startDate} and ${endDate} retrieved successfully`,
        data: records,
        count: records.length
      });
    } catch (error) {
      console.error('Error in getByDateRange:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }

  // Get statistics
  static async getStatistics(req, res) {
    try {
      const stats = await PengawasanIzin.getStatistics();

      res.status(200).json({
        success: true,
        message: 'Statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      console.error('Error in getStatistics:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error.message
      });
    }
  }
}

module.exports = PengawasanIzinController;
