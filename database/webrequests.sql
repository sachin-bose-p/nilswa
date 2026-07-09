CREATE TABLE IF NOT EXISTS webrequests (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    company_email VARCHAR(255) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webrequests_email ON webrequests(company_email);
