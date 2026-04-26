const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'courses.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    level TEXT NOT NULL CHECK(level IN ('primary','secondary','tertiary')),
    description TEXT,
    language TEXT DEFAULT 'en',
    total_lessons INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    order_index INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,           -- Full lesson notes / HTML content
    resource_url TEXT,              -- Optional link to a file (PDF, image, etc.)
    resource_type TEXT,             -- e.g., 'pdf','video','image','zip'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);
  CREATE INDEX IF NOT EXISTS idx_courses_subject ON courses(subject);
  CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
`);

module.exports = db;
