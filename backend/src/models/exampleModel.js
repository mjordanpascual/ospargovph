// Example model structure
// Models represent database tables and contain query logic

const pool = require('../config/database');

const exampleModel = {
  // Get all records
  getAll: async () => {
    try {
      const [rows] = await pool.query('SELECT * FROM example_table');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Get by ID
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT * FROM example_table WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create
  create: async (data) => {
    try {
      const [result] = await pool.query('INSERT INTO example_table SET ?', data);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Update
  update: async (id, data) => {
    try {
      const [result] = await pool.query('UPDATE example_table SET ? WHERE id = ?', [data, id]);
      return result;
    } catch (error) {
      throw error;
    }
  },

  // Delete
  delete: async (id) => {
    try {
      const [result] = await pool.query('DELETE FROM example_table WHERE id = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = exampleModel;
