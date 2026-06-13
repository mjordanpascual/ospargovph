-- IHOMIS Database Initialization
-- Create users table for authentication

CREATE TABLE IF NOT EXISTS ihomis_web_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  department VARCHAR(128),
  title VARCHAR(128),
  role ENUM('superadmin', 'admin', 'doctor', 'nurse', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX idx_users_email ON ihomis_web_users(email);

-- Insert a default admin user (password: admin123)
-- Password hash for 'admin123' using bcrypt with salt rounds 10
INSERT INTO ihomis_web_users (first_name, last_name, email, password, phone, department, title, role) VALUES
('System', 'Admin', 'admin@ihomis.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1 (555) 000-0000', 'Administration', 'System Administrator', 'admin')
ON DUPLICATE KEY UPDATE email=email;

-- Asset inventory table for property management + QR tagging
CREATE TABLE IF NOT EXISTS asset_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  serial VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  asset_tag VARCHAR(128) UNIQUE NOT NULL,
  qr_data TEXT NOT NULL,
  qr_code_url VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments management table for library entries
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(128) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default departments
INSERT INTO departments (name, description) VALUES
('Cardiology', 'Heart and cardiovascular diseases'),
('Dermatology', 'Skin disorders and treatments'),
('Emergency Medicine', 'Emergency and trauma care'),
('Gastroenterology', 'Digestive system diseases'),
('General Surgery', 'General surgical procedures'),
('Neurology', 'Nervous system disorders'),
('Obstetrics & Gynecology', 'Women''s health and pregnancy'),
('Orthopedics', 'Bone and joint disorders'),
('Pediatrics', 'Children''s healthcare'),
('Psychiatry', 'Mental health disorders'),
('Radiology', 'Medical imaging services'),
('Urology', 'Urinary system disorders'),
('Oncology', 'Cancer treatment'),
('Pulmonology', 'Respiratory system diseases'),
('Nephrology', 'Kidney disease treatment'),
('Administration', 'Hospital administration'),
('Nursing', 'Nursing department'),
('Laboratory', 'Medical laboratory services'),
('Pharmacy', 'Pharmaceutical services')
ON DUPLICATE KEY UPDATE name=name;