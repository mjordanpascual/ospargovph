import { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; // Mandatory styles

const InventoryAssets = () => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [form, setForm] = useState({ name: '', model: '', serial: '', location: '', department: '' });
  const [error, setError] = useState('');
  const [working, setWorking] = useState(false);
  

  const printAssetLabel = (item) => {
    const printHtml = `
      <html>
        <head>
          <title>Asset QR Label</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background: white; }
            .label { width: 210mm; height: 74mm; display: flex; align-items: center; justify-content: space-between; padding: 18px; border-bottom: 1px dashed #ccc; background: white; page-break-after: always; }
            .left { display: flex; flex-direction: column; justify-content: center; min-width: 0; }
            .asset-name { font-size: 22px; font-weight: bold; margin-bottom: 8px; }
            .asset-meta { font-size: 14px; margin-bottom: 4px; }
            .qr { width: 140px; height: 140px; object-fit: contain; margin-left: 16px; border: 1px solid #ddd; padding: 4px; }
            @media print { body { margin: 0; padding: 0; } }
          </style>
        </head>
        <body>
          <div class="label">
            <div class="left">
              <div class="asset-name">${item.name}</div>
              <div class="asset-name">${item.model}</div>
              <div class="asset-meta">Tag: ${item.asset_tag}</div>
              <div class="asset-meta">Serial: ${item.serial}</div>
              <div class="asset-meta">Location: ${item.location}</div>
              <div class="asset-meta">Department: ${item.department}</div>
            </div>
            <div>
              <img class="qr" src="${item.qr_code_url}" alt="QR code" style="display: block;" />
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
                setTimeout(() => window.close(), 100);
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    const w = window.open('', '_blank');
    if (!w) {
      setError('Unable to open print window; please allow popups.');
      return;
    }
    w.document.write(printHtml);
    w.document.close();
  };

  const printBulkAssetLabels = (selected) => {
    if (!selected.length) {
      setError('Please select at least one item to print');
      return;
    }

    const labelsHtml = selected
      .map((item) => `
        <div class="label">
          <div class="left">
            <div class="asset-name">${item.name}</div>
            <div class="asset-name">${item.model}</div>
            <div class="asset-meta">Tag: ${item.asset_tag}</div>
            <div class="asset-meta">Serial: ${item.serial}</div>
            <div class="asset-meta">Location: ${item.location}</div>
            <div class="asset-meta">Department: ${item.department}</div>
          </div>
          <div>
            <img class="qr" src="${item.qr_code_url}" alt="QR code" style="display: block;" />
          </div>
        </div>
      `)
      .join('\n');

    const printHtml = `
      <html>
        <head>
          <title>Bulk Asset QR Labels</title>
          <style>
            body { font-family: Arial, Helvetica, sans-serif; margin: 0; padding: 0; background: white; }
            .label { width: 210mm; height: 74mm; display: flex; align-items: center; justify-content: space-between; padding: 18px; border-bottom: 1px dashed #ccc; background: white; page-break-after: always; }
            .left { display: flex; flex-direction: column; justify-content: center; min-width: 0; }
            .asset-name { font-size: 22px; font-weight: bold; margin-bottom: 8px; }
            .asset-meta { font-size: 14px; margin-bottom: 4px; }
            .qr { width: 140px; height: 140px; object-fit: contain; margin-left: 16px; border: 1px solid #ddd; padding: 4px; }
            @media print { body { margin: 0; padding: 0; } .label { break-after: page; } }
          </style>
        </head>
        <body>
          ${labelsHtml}
          <script>
            var imageCount = 0;
            var imagesLoaded = 0;
            function checkAllLoaded() {
              if (imagesLoaded >= imageCount) {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 100);
                }, 300);
              }
            }
            window.onload = function() {
              var imgs = document.querySelectorAll('img');
              imageCount = imgs.length;
              if (imageCount === 0) {
                setTimeout(() => {
                  window.print();
                  setTimeout(() => window.close(), 100);
                }, 500);
              } else {
                imgs.forEach(function(img) {
                  img.onload = function() {
                    imagesLoaded++;
                    checkAllLoaded();
                  };
                  img.onerror = function() {
                    imagesLoaded++;
                    checkAllLoaded();
                  };
                });
              }
            };
          </script>
        </body>
      </html>
      `;

    const w = window.open('', '_blank');
    if (!w) {
      setError('Unable to open print window; please allow popups.');
      return;
    }
    w.document.write(printHtml);
    w.document.close();
  };

  const toggleItemSelection = (item) => {
    setSelectedItems((prev) => {
      const exists = prev.find((maybe) => maybe.id === item.id);
      if (exists) {
        return prev.filter((maybe) => maybe.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const loadItems = async () => {
    try {
      // const resp = await axios.get('http://localhost:5000/api/inventory');
      const resp = await axios.get('http://172.16.2.201:5000/api/inventory');
      setItems(resp.data.inventory || []);
    } catch (err) {
      setError('Could not load inventory items');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const generateAssetTag = (name, model, serial) => {
    const base = `${name}-${model}-${serial}`.toUpperCase().replace(/\s+/g, '-');
    return `ASSET-${Date.now()}-${base.slice(0, 20)}`;
  };

  const createQrUrl = (text) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(text)}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.model || !form.serial || !form.location || !form.department) {
      setError('All fields are required');
      return;
    }

    setWorking(true);
    try {
      const assetTag = generateAssetTag(form.name, form.model, form.serial);
      const qrData = JSON.stringify({ name: form.name, model: form.model, serial: form.serial, assetTag });
      const qrCodeUrl = createQrUrl(qrData);

      // const resp = await axios.post('http://localhost:5000/api/inventory', {
      const resp = await axios.post('http://172.16.2.201:5000/api/inventory', {
        ...form,
        assetTag,
        qrData,
        qrCodeUrl
      });
      setItems((prev) => [resp.data.item, ...prev]);
      setForm({ name: '', model: '', serial: '', location: '', department: '' });
    } catch (err) {
      setError(err.response?.data?.error || 'Add item failed');
    } finally {
      setWorking(false);
    }
  };


  const [category, setCategory] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/departments');
        const response = await axios.get('http://172.16.2.201:5000/api/categories');
        setCategory(response.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setCategory([]);
      }
    };
    fetchCategories();
  }, []);

  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/departments');
        const response = await axios.get('http://172.16.2.201:5000/api/departments');
        setDepartments(response.data);
      } catch (err) {
        console.error('Failed to fetch departments:', err);
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Inventory & Asset Tagging</h3>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <form className="grid md:grid-cols-2 gap-3 mb-6" onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Asset name" className="border p-2 rounded" required />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Asset model" className="border p-2 rounded" required />
        <input name="serial" value={form.serial} onChange={handleChange} placeholder="Serial number" className="border p-2 rounded" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="border p-2 rounded" required />
        {/* <input name="categories" value={form.categories} onChange={handleChange} placeholder="Categories" className="border p-2 rounded" required /> */}
        {/* <input name="department" value={form.department} onChange={handleChange} placeholder="Department" className="border p-2 rounded" required /> */}
        <select 
            id="category"
            name="category"
            //required
            className="border p-2 rounded"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
          >
            <option value="">Select Category</option>
              {category.map((cat) => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
        </select>
        <select 
            id="department"
            name="department"
            required
            className="border p-2 rounded"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
          >
            <option value="">Select Department</option>
              {departments.map((dept) => (
            <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
        </select>
        {/* <select
            id="department"
            name="department"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>{dept.name}</option>
            ))}
        </select> */}

        <button type="submit" disabled={working} className="col-span-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          {working ? 'Saving...' : 'Add Asset'}
        </button>
      </form>
      
      {items.length === 0 ? (
        <p className="text-gray-500">No inventory items yet.</p>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">{selectedItems.length} selected</p>
            <p><span className="font-bold">{items.length}</span> items in inventory</p>
            <button
              onClick={() => printBulkAssetLabels(selectedItems)}
              disabled={selectedItems.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white py-2 px-4 rounded transition"
            >
              Print Selected QR Labels
            </button>
          </div>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg p-4 grid grid-cols-1 md:grid-cols-[auto_1fr_220px] gap-4 items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedItems.some((selected) => selected.id === item.id)}
                    onChange={() => toggleItemSelection(item)}
                    className="mr-3"
                  />
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Model: {item.model}</p>
                  <p className="text-sm text-gray-600">Serial: {item.serial}</p>
                  <p className="text-sm text-gray-600">Location: {item.location}</p>
                  <p className="text-sm text-gray-600">Department: {item.department}</p>
                  <p className="text-sm text-gray-700 mt-1">Tag: {item.asset_tag}</p>
                  <button
                    onClick={() => printAssetLabel(item)}
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-1 px-3 rounded"
                  >
                    Print QR Label
                  </button>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <img src={item.qr_code_url} alt="QR code" className="w-36 h-36 object-contain" />
                  <div className="text-xs text-gray-500 text-center">Scan to open asset details</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default InventoryAssets;
