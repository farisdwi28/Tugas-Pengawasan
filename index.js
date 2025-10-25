const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const pengawasanIzinRoutes = require('./routes/pengawasanIzin');

// Import configuration for port
let config;
try {
  config = require('./config');
} catch (error) {
  config = { server: { port: 3000 } };
}

const app = express();
const PORT = config.server.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/pengawasan-izin', pengawasanIzinRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Pengawasan & Izin API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      all_records: 'GET /api/pengawasan-izin',
      by_id: 'GET /api/pengawasan-izin/:id',
      by_status: 'GET /api/pengawasan-izin/status/:status',
      by_jenis: 'GET /api/pengawasan-izin/jenis/:jenis',
      by_pemohon: 'GET /api/pengawasan-izin/pemohon/:idPemohon',
      search_nama: 'GET /api/pengawasan-izin/search/nama?nama=value',
      filter_date: 'GET /api/pengawasan-izin/filter/date?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD',
      statistics: 'GET /api/pengawasan-izin/stats/overview'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    availableRoutes: [
      'GET /',
      'GET /health',
      'GET /api/pengawasan-izin',
      'GET /api/pengawasan-izin/:id',
      'GET /api/pengawasan-izin/status/:status',
      'GET /api/pengawasan-izin/jenis/:jenis',
      'GET /api/pengawasan-izin/pemohon/:idPemohon',
      'GET /api/pengawasan-izin/search/nama',
      'GET /api/pengawasan-izin/filter/date',
      'GET /api/pengawasan-izin/stats/overview'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Server will start but API calls may fail.');
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 API Documentation: http://localhost:${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
