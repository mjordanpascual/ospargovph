const pool = require('./src/config/database');

(async () => {
  try {
    const [users] = await pool.query('SELECT * FROM ihomis_web_users');
    console.log('✅ Users in database:');
    users.forEach(user => {
      console.log(`  ID: ${user.id}, Name: ${user.first_name} ${user.last_name}, Email: ${user.email}, Role: ${user.role}`);
    });
    
    if (users.length === 0) {
      console.log('\n⚠️  No users found!');
    }
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
