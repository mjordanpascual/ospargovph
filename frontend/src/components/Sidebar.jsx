import React from 'react';

const getMenuItems = (userRole) => {
  const baseItems = [
    { id: 'home', label: 'Dashboard', icon: '🏠' },
    // { id: 'patients', label: 'Patients', icon: '🩺' },
    { id: 'products', label: 'Products', icon: '📦' },
    // { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'inventory', label: 'Inventory', icon: '📦' },
    { id: 'reports', label: 'Reports', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  // Add admin menu for superadmin users
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
          {/* {user.department && <p className="text-sm text-blue-100 mt-1 font-semibold">{user.department}</p>} */}
          {user.department && <p className="text-sm text-blue-100 mt-1 font-semibold">{user.department.toUpperCase()}</p>}
          <p className="text-xs bg-green-300 max-w-20.5 rounded-full flex p-1 items-center justify-center text-blue-800 mt-1">{user.role || 'User'}</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-xs text-blue-300 uppercase tracking-wider">Signed in as</p>
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
