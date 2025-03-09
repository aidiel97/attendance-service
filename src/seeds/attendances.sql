CREATE TABLE attendances (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  clock_in TIMESTAMP NULL,
  clock_out TIMESTAMP NULL,
  status ENUM('IN', 'OUT') NOT NULL,
  is_deleted BOOLEAN NOT NULL,
  created_at INT,
  updated_at INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
