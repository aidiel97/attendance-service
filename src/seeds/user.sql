CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  is_deleted BOOLEAN NOT NULL,
  created_at INT,
  updated_at INT
);