CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role VARCHAR(25) NOT NULL CHECK (ROLE IN ('admin', 'user')),
    hash VARCHAR(255) NOT NULL
);