import { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Mandatory styles


const AdminDashboard = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('departments');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [viewMode, setViewMode] = useState('list');
  const [totalDepartments, setTotalDepartments] = useState(0);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (activeTab === 'departments') {
      fetchDepartments();
    }
  }, [activeTab]);

  const fetchDepartments = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/api/departments');
      const response = await axios.get('http://172.16.2.201:5000/api/departments');
      setDepartments(response.data);
      setTotalDepartments(response.data.length);
    } catch (err) {
      setError('Failed to fetch departments');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    try {
      if (editingId) {
        await axios.put(
          // `http://localhost:5000/api/departments/${editingId}`,
          `http://172.16.2.201:5000/api/departments/${editingId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // setSuccess('Entry updated successfully');
        toast.success('Entry updated successfully!');
      } else {
        await axios.post(
          // 'http://localhost:5000/api/departments',
          'http://172.16.2.201:5000/api/departments',
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // setSuccess('Entry created successfully');
        toast.success('Entry created successfully!');
      }

      setFormData({ name: '', description: '' });
      setEditingId(null);
      setShowAddForm(false);
      fetchDepartments();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save entry');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, description: item.description || '' });
    setEditingId(item.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await axios.delete(
        // `http://localhost:5000/api/departments/${id}`,
        `http://172.16.2.201:5000/api/departments/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // setSuccess('Entry deleted successfully');
      toast.error('Deleted successfully!');
      fetchDepartments();
    } catch (err) {
      setError('Failed to delete entry');
      toast.error('Failed to delete entry');
    }
  };

    const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
    setShowAddForm(false);
    setError('');
    setSuccess('');
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <ToastContainer position="top-right" autoClose={5000} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage hospital library entries and configurations</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'departments'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🏥 Departments
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-3 font-semibold transition ${
              activeTab === 'about'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ℹ️ About
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {/* Departments Tab */}
        {activeTab === 'departments' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Departments</p>
                    <p className="text-3xl font-bold text-gray-900">{totalDepartments}</p>
                  </div>
                  <div className="text-4xl">🏥</div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Library Status</p>
                    <p className="text-2xl font-bold text-green-600">Active</p>
                  </div>
                  <div className="text-4xl">✅</div>
                </div>
              </div>
            </div>

            {/* Add Department Button */}
            {!showAddForm && (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
              >
                + Add New Department
              </button>
            )}

            {/* Add/Edit Form Card */}
            {showAddForm && (
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {editingId ? '✏️ Edit Department' : '➕ Add New Department'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Department Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Cardiology"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the department"
                      rows="3"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50 transition"
                    >
                      {loading ? '⏳ Saving...' : editingId ? '💾 Update' : '✅ Create'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Departments Grid */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Department Library</h3>
              {departments.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-500 text-lg">No departments found. Add one to get started!</p>
                </div>
              ) : (
                <div>
                  {viewMode === 'list' ? (
                    <ul>
                      {departments.map((dept) => (
                        <li key={dept.id} className="border p-4 mb-2">
                          <h3 className="font-bold">{dept.name}</h3>
                          <p>{dept.description}</p>
                          <button className="px-2 py-1 text-xs mr-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleEdit(dept)}>
                            Edit
                          </button>
                          <button className="px-2 py-1 text-xs bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDelete(dept.id)}>
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {departments.map((dept) => (
                        <div
                          key={dept.id}
                          className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white"
                        >
                          <h3 className="font-bold text-lg mb-2">{dept.name}</h3>
                          <p className="text-gray-600 mb-4">{dept.description}</p>
                          <div className="flex justify-between">
                            <button
                              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                              onClick={() => handleEdit(dept)}
                            >
                              Edit
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                              onClick={() => handleDelete(dept.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Library Management System</h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  The Admin Dashboard allows superadmin users to manage the hospital's library of entries including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li><strong>Departments:</strong> Hospital departments used in user registration and asset tagging</li>
                  <li><strong>System Configuration:</strong> Core settings for the IHOMIS system</li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow p-6">
                <h4 className="text-lg font-bold text-blue-900 mb-2">🔐 Superadmin Role</h4>
                <p className="text-blue-800 text-sm">
                  Only superadmin users can create, edit, or delete library entries. Regular users can view the departments
                  during registration.
                </p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-600 rounded-lg shadow p-6">
                <h4 className="text-lg font-bold text-green-900 mb-2">✨ Features</h4>
                <p className="text-green-800 text-sm">
                  Create standardized hospital departments, manage descriptions, and maintain consistency across the system.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    
    </div>
  );
};

export default AdminDashboard;
