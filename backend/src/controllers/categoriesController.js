const pool = require('../config/database');

const categoriesController = {
  // Get all categories
  getAll: async (req, res) => {
    try {
      const [categories] = await pool.query('SELECT * FROM asset_categories ORDER BY name ASC');
      res.json(categories);
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },

  // Get single category
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const [categories] = await pool.query('SELECT * FROM asset_categories WHERE id = ?', [id]);
      
      if (!categories.length) {
        return res.status(404).json({ error: 'Category not found' });
      }
      
      res.json(categories[0]);
    } catch (error) {
      console.error('Get category error:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  },

  // Create new category
  create: async (req, res) => {
    try {
      const { name } = req.body;

      // Validation
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Category name is required' });
      }

      // Check if category already exists
      const [existing] = await pool.query('SELECT id FROM asset_categories WHERE name = ?', [name]);
      if (existing.length > 0) {
        return res.status(409).json({ error: 'Category already exists' });
      }

      // Insert category
      const [result] = await pool.query(
        'INSERT INTO asset_categories (name) VALUES (?)',
        [name]
      );

      res.status(201).json({
        message: 'Category created successfully',
        category: {
          id: result.insertId,
          name
        }
      });
    } catch (error) {
      console.error('Create category error:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  },

  // Update category
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      // Validation
      if (!name || name.trim() === '') {
        return res.status(400).json({ error: 'Category name is required' });
      }

      // Check if category exists
      const [existing] = await pool.query('SELECT * FROM asset_categories WHERE id = ?', [id]);
      if (!existing.length) {
        return res.status(404).json({ error: 'Category not found' });
      }

      // Check if new name already exists (and is not the same category)
      const [duplicate] = await pool.query('SELECT id FROM asset_categories WHERE name = ? AND id != ?', [name, id]);
      if (duplicate.length > 0) {
        return res.status(409).json({ error: 'Category name already exists' });
      }

      // Update category
      await pool.query(
        'UPDATE asset_categories SET name = ? WHERE id = ?',
        [name, id]
      );

      res.json({
        message: 'Category updated successfully',
        category: {
          id: parseInt(id),
          name
        }
      });
    } catch (error) {
      console.error('Update category error:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  },

  // Delete category
  delete: async (req, res) => {
    try {
      const { id } = req.params;

      // Check if category exists
      const [existing] = await pool.query('SELECT name FROM asset_categories WHERE id = ?', [id]);
      if (!existing.length) {
        return res.status(404).json({ error: 'Category not found' });
      }

      const categoryName = existing[0].name;

      // Check if category is in use by assets
      const [assets] = await pool.query('SELECT COUNT(*) as count FROM assets WHERE category_id = ?', [id]);
      if (assets[0].count > 0) {
        return res.status(409).json({ 
          error: `Cannot delete category. It is assigned to ${assets[0].count} asset(s)` 
        });
      }

      // Delete category
      await pool.query('DELETE FROM asset_categories WHERE id = ?', [id]);

      res.json({
        message: 'Category deleted successfully',
        id: parseInt(id)
      });
    } catch (error) {
      console.error('Delete category error:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
};

module.exports = categoriesController;