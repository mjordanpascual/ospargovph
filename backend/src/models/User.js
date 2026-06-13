const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  // Get user by email
  getByEmail: async (email) => {
    try {
      const [rows] = await pool.query('SELECT id, first_name, middle_name, last_name, email, password, phone, department, title, role, created_at FROM ihomis_web_users WHERE email = ?', [email]);
      const user = rows[0];
      if (user) {
        return {
          id: user.id,
          firstName: user.first_name,
          middleName: user.middle_name, // Added middle name
          lastName: user.last_name,
          email: user.email,
          password: user.password,
          phone: user.phone,
          department: user.department,
          title: user.title,
          role: user.role,
          created_at: user.created_at
        };
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Get user by ID
  getById: async (id) => {
    try {
      const [rows] = await pool.query('SELECT id, first_name, middle_name, last_name, email, phone, department, title, role, created_at FROM ihomis_web_users WHERE id = ?', [id]);
      const user = rows[0];
      if (user) {
        return {
          id: user.id,
          firstName: user.first_name,
          middleName: user.middle_name, // Added middle name
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          department: user.department,
          title: user.title,
          role: user.role,
          created_at: user.created_at
        };
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  // Create new user
  create: async (userData) => {
    try {
      const { firstName, middleName, lastName, email, password, phone, department, title, role = 'user' } = userData;

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await pool.query(
        'INSERT INTO ihomis_web_users (first_name, middle_name, last_name, email, password, phone, department, title, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [firstName, middleName || null, lastName, email, hashedPassword, phone || null, department || null, title || null, role]
      );

      return { id: result.insertId, firstName, middleName, lastName, email, phone, department, title, role };
    } catch (error) {
      throw error;
    }
  },

  // Verify password
  verifyPassword: async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
};

module.exports = User;