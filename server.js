const express = require('express');
const cors = require('cors');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('Course Repository API is running.'));

// Courses routes
app.use('/api/courses', coursesRouter);

// Force reseed endpoint (protected by secret)
app.get('/api/seed', (req, res) => {
  const { secret } = req.query;
  if (secret !== 'tedforce2026') return res.status(403).json({ error: 'Forbidden' });

  const fs = require('fs');
  const path = require('path');
  const dataFile = path.join(__dirname, 'data.json');

  // Remove old database
  try { fs.unlinkSync(dataFile); } catch(e) { /* file may not exist */ }

  // Run the seed (creates data.json with long lessons)
  delete require.cache[require.resolve('./seed')];
  require('./seed');

  res.json({ status: 'seeded', courses: db.getCourses().length });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));

// Auto‑seed if database is empty (on fresh deploy)
const db = require('./db');
if (db.getCourses().length === 0) {
  console.log('Empty DB, running seed...');
  delete require.cache[require.resolve('./seed')];
  require('./seed');
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
