const express = require('express');
const cors = require('cors');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Extract courses if missing
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'courses');
if (!fs.existsSync(DATA_DIR) || fs.readdirSync(DATA_DIR).length === 0) {
  console.log('Extracting courses archive...');
  execSync(`tar -xzf ${path.join(__dirname, 'courses.tar.gz')} -C ${__dirname}`, { stdio: 'inherit' });
}

const coursesRouter = require('./routes/courses');
app.use('/api/courses', coursesRouter);

// Seed endpoint (rarely needed)
app.get('/api/seed', (req, res) => {
  const { secret } = req.query;
  if (secret !== 'tedforce2026') return res.status(403).json({ error: 'Forbidden' });

  // Re-generate and re-pack
  execSync('node seed.js', { stdio: 'inherit' });
  execSync('tar -czf courses.tar.gz courses/', { stdio: 'inherit' });

  const db = require('./db');
  res.json({ status: 'seeded', courses: db.getCourses().length });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
