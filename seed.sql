INSERT INTO todos (title, description, completed, createdAt, updatedAt) 
VALUES 
('Todo Title 1', 'Description for Todo 1', 0, strftime('%s','now'), strftime('%s','now')),
('Todo Title 2', 'Description for Todo 2', 0, strftime('%s','now'), strftime('%s','now')),
('Todo Title 3', 'Description for Todo 3', 1, strftime('%s','now'), strftime('%s','now'));
