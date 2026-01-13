-- Sample data for The Procrastinators Podcast Database
-- Run this after initializing the database if you want some example data

-- Add 8 hosts
INSERT INTO hosts (name) VALUES 
  ('Ben'),
  ('Alice'),
  ('Charlie'),
  ('Dana'),
  ('Emma'),
  ('Frank'),
  ('Grace'),
  ('Henry')
ON CONFLICT (name) DO NOTHING;

-- Add sample episodes
INSERT INTO episodes (title, episode_number, description, release_date) VALUES 
  ('The Art of Putting Things Off', 1, 'We discuss our favorite procrastination techniques', '2024-01-01'),
  ('Last Minute Excellence', 2, 'Why we work best under pressure', '2024-01-08'),
  ('The To-Do List Debate', 3, 'Do to-do lists help or hurt?', '2024-01-15'),
  ('Procrastination and Creativity', 4, 'Is procrastination actually good for creative work?', '2024-01-22'),
  ('The Science of Delay', 5, 'A deep dive into the psychology of procrastination', '2024-01-29'),
  ('Time Management Myths', 6, 'Busting productivity myths', '2024-02-05'),
  ('The Early Bird Trap', 7, 'Why being early isnt always better', '2024-02-12'),
  ('Deadline Driven', 8, 'How deadlines shape our work', '2024-02-19')
ON CONFLICT DO NOTHING;

-- Link episodes with hosts
-- Episode 1: Ben, Alice, Charlie
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 1 AND h.name IN ('Ben', 'Alice', 'Charlie')
ON CONFLICT DO NOTHING;

-- Episode 2: Ben, Dana, Emma
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 2 AND h.name IN ('Ben', 'Dana', 'Emma')
ON CONFLICT DO NOTHING;

-- Episode 3: Alice, Charlie, Frank
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 3 AND h.name IN ('Alice', 'Charlie', 'Frank')
ON CONFLICT DO NOTHING;

-- Episode 4: Ben only (exclusive)
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 4 AND h.name IN ('Ben')
ON CONFLICT DO NOTHING;

-- Episode 5: Everyone!
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 5 AND h.name IN ('Ben', 'Alice', 'Charlie', 'Dana', 'Emma', 'Frank', 'Grace', 'Henry')
ON CONFLICT DO NOTHING;

-- Episode 6: Grace, Henry
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 6 AND h.name IN ('Grace', 'Henry')
ON CONFLICT DO NOTHING;

-- Episode 7: Ben, Alice
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 7 AND h.name IN ('Ben', 'Alice')
ON CONFLICT DO NOTHING;

-- Episode 8: Dana, Emma, Frank, Grace
INSERT INTO episode_hosts (episode_id, host_id) 
SELECT e.id, h.id FROM episodes e, hosts h 
WHERE e.episode_number = 8 AND h.name IN ('Dana', 'Emma', 'Frank', 'Grace')
ON CONFLICT DO NOTHING;

-- Verify the data
SELECT 
  e.episode_number,
  e.title,
  STRING_AGG(h.name, ', ' ORDER BY h.name) as hosts
FROM episodes e
LEFT JOIN episode_hosts eh ON e.id = eh.episode_id
LEFT JOIN hosts h ON eh.host_id = h.id
GROUP BY e.id, e.episode_number, e.title
ORDER BY e.episode_number;
