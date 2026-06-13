require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'ospar_db_api',
};

// module.exports = {
//   PORT: process.env.PORT || 5000,
//   NODE_ENV: process.env.NODE_ENV || 'development',
//   DB_HOST: process.env.DB_HOST || '192.168.5.1',
//   DB_USER: process.env.DB_USER || 'root',
//   DB_PASSWORD: process.env.DB_PASSWORD || 'R00t',
//   DB_NAME: process.env.DB_NAME || 'hospital_dbo',
// };
