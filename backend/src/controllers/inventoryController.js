const pool = require('../config/database');

const inventoryController = {
  getAll: async (req, res) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM asset_inventory ORDER BY created_at DESC');
      res.json({ inventory: rows });
    } catch (error) {
      console.error('Inventory getAll error:', error);
      res.status(500).json({ error: 'Failed to fetch inventory' });
    }
  },

  create: async (req, res) => {
    try {
      const { name, model, serial, location, department, assetTag, qrData, qrCodeUrl } = req.body;

      if (!name || !model || !serial || !location || !department) {
        return res.status(400).json({ error: 'Missing required inventory fields' });
      }

      const [result] = await pool.execute(
        `INSERT INTO asset_inventory (name, model, serial, location, department, asset_tag, qr_data, qr_code_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, model, serial, location, department, assetTag, qrData, qrCodeUrl]
      );

      const [rows] = await pool.execute('SELECT * FROM asset_inventory WHERE id = ?', [result.insertId]);
      res.status(201).json({ item: rows[0] });
    } catch (error) {
      console.error('Inventory create error:', error);
      res.status(500).json({ error: 'Failed to create inventory item' });
    }
  }
};

module.exports = inventoryController;
