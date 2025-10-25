const mysql = require('mysql2/promise');

// Import configuration - copy config.example.js to config.js and update credentials
let config;
try {
  config = require('./config');
} catch (error) {
  console.warn('⚠️  config.js not found. Using default configuration. Copy config.example.js to config.js and update your database credentials.');
  config = {
    database: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'db_pu_pengawasan'
    }
  };
}

const dbConfig = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection
};
