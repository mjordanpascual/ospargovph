import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import heroImg from './assets/hero.png';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Mandatory styles


function App() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentView('login');
  };

  const [dashboardView, setDashboardView] = useState('home');

  if (user) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        <div className="hidden lg:block">
          <Sidebar
            user={user}
            activeItem={dashboardView}
            onSelect={setDashboardView}
            onLogout={handleLogout}
          />
        </div>

        <div className="flex-1">
          <div className="lg:hidden flex items-center justify-between p-4 bg-blue-800 text-white">
            <div>
              <h1 className="text-lg font-bold">IHOMIS Dashboard</h1>
              <p className="text-sm">{user.firstName ? `${user.firstName} ${user.lastName}` : user.name}</p>
            </div>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </div>
          {dashboardView === 'admin' ? (
            <AdminDashboard />
          ) : (
            <Dashboard activeView={dashboardView} user={user} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="min-h-screen bg-blue-900 bg-opacity-70">
        {currentView === 'login' ? (
          <Login
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentView('register')}
          />
        ) : (
          <Register
            onRegister={handleRegister}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </div>
    </div>
  );
}

export default App;
