CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price REAL NOT NULL,
    category VARCHAR(100),
    quantity  INTEGER NOT NUll
);