const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ospar_db_api',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Ensure middle_name column exists in the ihomis_web_users table
(async () => {
  try {
    const [rows] = await pool.query(`
      ALTER TABLE ihomis_web_users
      ADD COLUMN IF NOT EXISTS middle_name VARCHAR(255) NULL AFTER first_name;
    `);
    console.log('Database schema updated successfully.');
  } catch (error) {
    console.error('Error updating database schema:', error.message);
  }
})();

module.exports = pool;
