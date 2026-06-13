const pool = require('../config/database');

const departmentsController = {
  // Get all departments
  getAll: async (req, res) => {
    try {
      const [departments] = await pool.query('SELECT * FROM departments ORDER BY name ASC');
      res.json(departments);
    } catch (error) {
      console.error('Get departments error:', error);
      res.status(500).json({ error: 'Failed to fetch departments' });
    }
  },

  // Get single department
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [departments] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
      
      if (!departments.length) {
        return res.status(404).json({ error: 'Department not found' });
      }
      
      res.json(departments[0]);
    } catch (error) {
      console.error('Get department error:', error);
      res.status(500).json({ error: 'Failed to fetch department' });
    }
  },

  // Create new department
  create: async (req, res) => {
    try {
      const { name, description } = req.body;

      // Validation
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Department name is required' });
      }

      // Check if department already exists
      const [existing] = await pool.query('SELECT id FROM departments WHERE name = ?', [name]);
      if (existing.length > 0) {
        return res.status(409).json({ error: 'Department already exists' });
      }

      // Insert department
      const [result] = await pool.query(
        'INSERT INTO departments (name, description) VALUES (?, ?)',
        [name, description || null]
      );

      res.status(201).json({
        message: 'Department created successfully',
        department: {
          id: result.insertId,
          name,
          description: description || null
        }
      });
    } catch (error) {
      console.error('Create department error:', error);
      res.status(500).json({ error: 'Failed to create department' });
    }
  },

  // Update department
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      // Validation
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Department name is required' });
      }

      // Check if department exists
      const [existing] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
      if (!existing.length) {
        return res.status(404).json({ error: 'Department not found' });
      }

      // Check if new name already exists (and is not the same department)
      const [duplicate] = await pool.query('SELECT id FROM departments WHERE name = ? AND id != ?', [name, id]);
      if (duplicate.length > 0) {
        return res.status(409).json({ error: 'Department name already exists' });
      }

      // Update department
      await pool.query(
        'UPDATE departments SET name = ?, description = ? WHERE id = ?',
        [name, description || null, id]
      );

      res.json({
        message: 'Department updated successfully',
        department: {
          id: parseInt(id),
          name,
          description: description || null
        }
      });
    } catch (error) {
      console.error('Update department error:', error);
      res.status(500).json({ error: 'Failed to update department' });
    }
  },

  // Delete department
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if department exists
      const [existing] = await pool.query('SELECT name FROM departments WHERE id = ?', [id]);
      if (!existing.length) {
        return res.status(404).json({ error: 'Department not found' });
      }

      const deptName = existing[0].name;

      // Check if department is in use by users
      const [users] = await pool.query('SELECT COUNT(*) as count FROM ihomis_web_users WHERE department = ?', [deptName]);
      if (users[0].count > 0) {
        return res.status(409).json({ 
          error: `Cannot delete department. It is assigned to ${users[0].count} user(s)` 
        });
      }

      // Delete department
      await pool.query('DELETE FROM departments WHERE id = ?', [id]);

      res.json({
        message: 'Department deleted successfully',
        id: parseInt(id)
      });
    } catch (error) {
      console.error('Delete department error:', error);
      res.status(500).json({ error: 'Failed to delete department' });
    }
  }
};

module.exports = departmentsController;
