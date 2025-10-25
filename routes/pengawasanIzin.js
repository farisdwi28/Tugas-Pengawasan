const express = require('express');
const router = express.Router();
const PengawasanIzinController = require('../controllers/pengawasanIzinController');

// GET /api/pengawasan-izin - Get all records
router.get('/', PengawasanIzinController.getAll);

// GET /api/pengawasan-izin/:id - Get record by ID
router.get('/:id', PengawasanIzinController.getById);

// GET /api/pengawasan-izin/status/:status - Get records by status
router.get('/status/:status', PengawasanIzinController.getByStatus);

// GET /api/pengawasan-izin/jenis/:jenis - Get records by jenis izin
router.get('/jenis/:jenis', PengawasanIzinController.getByJenisIzin);

// GET /api/pengawasan-izin/pemohon/:idPemohon - Get records by pemohon
router.get('/pemohon/:idPemohon', PengawasanIzinController.getByPemohon);

// GET /api/pengawasan-izin/search/nama - Search by nama pemohon
router.get('/search/nama', PengawasanIzinController.searchByNama);

// GET /api/pengawasan-izin/filter/date - Get records by date range
router.get('/filter/date', PengawasanIzinController.getByDateRange);

// GET /api/pengawasan-izin/stats - Get statistics
router.get('/stats/overview', PengawasanIzinController.getStatistics);

module.exports = router;
