const pool = require('./src/config/database');

(async () => {
  try {
    console.log('🔄 Starting database migration...');

    // Drop old table if it exists (careful - this deletes data!)
    try {
      await pool.query('DROP TABLE IF EXISTS ihomis_web_users');
      console.log('⚠️  Old table removed (if it existed)');
    } catch (e) {
      console.log('ℹ️  No old table to remove');
    }

    // Create new table with updated schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ihomis_web_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        department VARCHAR(128),
        title VARCHAR(128),
        role ENUM('admin', 'doctor', 'nurse', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ ihomis_web_users table created');

    // Create index
    await pool.query(`
      CREATE INDEX idx_users_email ON ihomis_web_users(email);
    `);
    console.log('✅ Email index created');

    // Insert default admin
    await pool.query(`
      INSERT INTO ihomis_web_users (first_name, last_name, email, password, phone, department, title, role) 
      VALUES ('System', 'Admin', 'admin@ihomis.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1 (555) 000-0000', 'Administration', 'System Administrator', 'admin')
      ON DUPLICATE KEY UPDATE email=email;
    `);
    console.log('✅ Default admin user inserted');

    // Verify
    const [users] = await pool.query('SELECT COUNT(*) as count FROM ihomis_web_users');
    console.log(`✅ Total users: ${users[0].count}`);

    // Check asset_inventory table
    try {
      const [assets] = await pool.query('SELECT COUNT(*) as count FROM asset_inventory');
      console.log(`✅ Asset inventory table exists with ${assets[0].count} items`);
    } catch (e) {
      console.log('ℹ️  Creating asset_inventory table...');
      await pool.query(`
        CREATE TABLE IF NOT EXISTS asset_inventory (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          serial VARCHAR(255) NOT NULL,
          location VARCHAR(255) NOT NULL,
          department VARCHAR(255) NOT NULL,
          asset_tag VARCHAR(128) UNIQUE NOT NULL,
          qr_data TEXT NOT NULL,
          qr_code_url VARCHAR(1000) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('✅ Asset inventory table created');
    }

    console.log('\n🎉 Database migration completed successfully!');
    console.log('\n📝 Test login:');
    console.log('   Email: admin@ihomis.com');
    console.log('   Password: admin123\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
})();
