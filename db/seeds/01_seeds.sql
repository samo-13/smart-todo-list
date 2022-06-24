INSERT INTO users (name, email, password, avatar_url) VALUES 
  ('Caitlin Croteau', 'caitlin-croteau@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', null),
  ('Sarah Moss', 'sarah.moss@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', null),
  ('Billy Wong', 'billywong@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', null);

INSERT INTO categories (name) VALUES 
  ('Film / Series'),
  ('Restaurants, cafes, etc.'),
  ('Books'),
  ('Products');

INSERT INTO lists (user_id, name, icon_url) VALUES 
  (3, 'Todos in Canada', null),
  (1, 'Summer Plan', null),
  (2, 'My Todos List', null);