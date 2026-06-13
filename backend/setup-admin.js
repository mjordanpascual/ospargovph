import React from 'react';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ospar_db_api',
  port: Number(process.env.DB_PORT) || 3306,
});

async function setupAdmin() {
  const connection = await pool.getConnection();
  try {
    console.log('✅ Setting up superadmin user...');

    const email = 'superadmin@ihomis.com';
    const password = 'superadmin123';
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check if user exists
    const [existing] = await connection.execute(
      'SELECT id FROM ihomis_web_users WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      // Update existing
      await connection.execute(
        'UPDATE ihomis_web_users SET password = ?, role = "superadmin" WHERE email = ?',
        [hashedPassword, email]
      );
      console.log(`✅ Updated superadmin user: ${email}`);
    } else {
      // Create new
      await connection.execute(
        'INSERT INTO ihomis_web_users (first_name, last_name, email, password, phone, department, title, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        ['Super', 'Admin', email, hashedPassword, '+1 (555) 000-0001', 'Administration', 'System Administrator', 'superadmin']
      );
      console.log(`✅ Created superadmin user: ${email}`);
    }

    console.log(`\n📝 Admin Credentials:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: superadmin\n`);
    console.log('✅ Superadmin setup completed!');
  } catch (error) {
    console.error('❌ Setup error:', error.message);
    process.exit(1);
  } finally {
    connection.release();
    await pool.end();
  }
}

setupAdmin();

const getMenuItems = (userRole) => {
  const baseItems = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    { id: 'patients', label: 'Patients', icon: '🩺' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  if (userRole === 'superadmin') {
    baseItems.push({ id: 'admin', label: 'Admin Panel', icon: '👨‍💼' });
  }

  return baseItems;
};

const Sidebar = ({ user, activeItem, onSelect, onLogout }) => {
  const menuItems = getMenuItems(user.role);
  return (
    <aside className="w-72 min-h-screen bg-blue-900 text-white shadow-lg">
      <div className="p-6 border-b border-blue-800">
        <h1 className="text-2xl font-bold">IHOMIS</h1>
        {user.department && <p className="text-sm text-blue-100 mt-1 font-semibold">{user.department}</p>}
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs text-blue-300 uppercase tracking-wider">
            <span>Signed in as</span>
            <span className="ml-2">{user.role || 'User'}</span>
          </div>
          <p className="font-semibold text-white">{user.firstName ? `${user.firstName} ${user.lastName}` : user.name}</p>
          <p className="text-sm text-blue-200">{user.email}</p>
          {user.title && <p className="text-sm text-blue-300">{user.title}</p>}
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition hover:bg-blue-700 ${activeItem === item.id ? 'bg-blue-700' : 'bg-blue-800'}`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button
          onClick={onLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
