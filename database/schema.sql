-- 
-- NILSWA Enterprise Cloud 
-- Database Schema Definition
-- 

CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    ack_number VARCHAR(50) UNIQUE NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    company_size VARCHAR(50) NOT NULL,
    annual_revenue VARCHAR(100),
    admin_name VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    admin_title VARCHAR(150) NOT NULL,
    admin_phone VARCHAR(50) NOT NULL,
    status VARCHAR(100) DEFAULT 'Application Submitted',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_registrations_ack ON registrations(ack_number);
CREATE INDEX IF NOT EXISTS idx_registrations_company ON registrations(company_name);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(admin_email);
