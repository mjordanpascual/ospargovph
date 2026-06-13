const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ospar_db_api',
  port: Number(process.env.DB_PORT) || 3306,
});

async function migrate() {
  const connection = await pool.getConnection();
  try {
    console.log('✅ Starting departments migration...');

    // Modify user role enum to include superadmin
    await connection.execute(`
      ALTER TABLE ihomis_web_users 
      MODIFY COLUMN role ENUM('superadmin', 'admin', 'doctor', 'nurse', 'user') DEFAULT 'user'
    `);
    console.log('✅ Updated user role enum');

    // Create departments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS departments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Departments table created');

    // Insert default departments
    const departments = [
      ['Cardiology', 'Heart and cardiovascular diseases'],
      ['Dermatology', 'Skin disorders and treatments'],
      ['Emergency Medicine', 'Emergency and trauma care'],
      ['Gastroenterology', 'Digestive system diseases'],
      ['General Surgery', 'General surgical procedures'],
      ['Neurology', 'Nervous system disorders'],
      ['Obstetrics & Gynecology', 'Women\'s health and pregnancy'],
      ['Orthopedics', 'Bone and joint disorders'],
      ['Pediatrics', 'Children\'s healthcare'],
      ['Psychiatry', 'Mental health disorders'],
      ['Radiology', 'Medical imaging services'],
      ['Urology', 'Urinary system disorders'],
      ['Oncology', 'Cancer treatment'],
      ['Pulmonology', 'Respiratory system diseases'],
      ['Nephrology', 'Kidney disease treatment'],
      ['Administration', 'Hospital administration'],
      ['Nursing', 'Nursing department'],
      ['Laboratory', 'Medical laboratory services'],
      ['Pharmacy', 'Pharmaceutical services']
    ];

    for (const [name, description] of departments) {
      try {
        await connection.execute(
          'INSERT INTO departments (name, description) VALUES (?, ?)',
          [name, description]
        );
      } catch (error) {
        // Ignore duplicate key errors
        if (error.code !== 'ER_DUP_ENTRY') {
          throw error;
        }
      }
    }
    console.log('✅ Default departments inserted/verified');

    // Update default admin user to superadmin
    await connection.execute(
      "UPDATE ihomis_web_users SET role = 'superadmin' WHERE email = 'admin@ihomis.com' LIMIT 1"
    );
    console.log('✅ Default admin user promoted to superadmin');

    // Verify
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM ihomis_web_users WHERE role = "superadmin"');
    const [depts] = await connection.execute('SELECT COUNT(*) as count FROM departments');
    console.log(`✅ Superadmin users: ${users[0].count}`);
    console.log(`✅ Departments: ${depts[0].count}`);

    console.log('\n🎉 Departments migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    process.exit(1);
  } finally {
    connection.release();
    await pool.end();
  }
}

migrate();
