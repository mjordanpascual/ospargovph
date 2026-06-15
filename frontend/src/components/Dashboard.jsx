import React from 'react';
import { useState, useEffect } from 'react';
import InventoryAssets from './InventoryAssets';

// const [items, setItems] = useState([]);
// const [error, setError] = useState('');

const stateCards = [
  { title: 'Total Products', value: 128, color: 'bg-green-500' },
  { title: 'Upcoming Products', value: 18, color: 'bg-indigo-500' },
  { title: 'Pending Product Repairs', value: 8, color: 'bg-yellow-500' },
  { title: 'Messages', value: 4, color: 'bg-blue-500' },
];


  // const loadItems = async () => {
  //   try {
  //     // const resp = await axios.get('http://localhost:5000/api/inventory');
  //     const resp = await axios.get('http://172.16.2.201:5000/api/inventory');
  //     setItems(resp.data.inventory || []);
  //   } catch (err) {
  //     setError('Could not load inventory items');
  //   }
  // };

  // useEffect(() => {
  //   loadItems();
  // }, []);

const Dashboard = ({ activeView, user }) => {
  const renderContent = () => {
    switch (activeView) {
      case 'products':
        return <p>Patients list and management will be here.</p>;
      case 'appointments':
        return <p>Appointment scheduling and history will be here.</p>;
      case 'inventory':
        return <InventoryAssets />;
      case 'reports':
        return <p>Reports and analytics will be here.</p>;
      case 'settings':
        return <p>Profile and system settings will be here.</p>;
      default:
        return (
          <div className="space-y-6">
            {/* Department Info Card */}
            {user && user.department && (
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">🏥 Your Department</h3>
                    <p className="text-xl font-bold">{user.department}</p>
                    {user.title && <p className="text-sm opacity-90">{user.title}</p>}
                  </div>
                  <div className="text-4xl opacity-80">🏥</div>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stateCards.map((card) => (
                <div key={card.title} className={`p-4 rounded-lg text-white ${card.color}`}>
                  <p className="text-sm">{card.title}</p>
                  <p className="text-3xl font-bold">{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <div className="pb-4 border-b border-gray-200 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Welcome back{user && user.firstName ? `, ${user.firstName}` : ''}! Here is an overview of your hospital operations.
        </p>
        {user && user.department && (
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
            <span className="mr-2">🏥</span>
            {user.department}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        {renderContent()}
      </div>
    </section>
  );
};

export default Dashboard;
