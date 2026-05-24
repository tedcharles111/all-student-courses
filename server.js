const express = require('express');
const cors = require('cors');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Course Repository API is running.'));

app.use('/api/courses', coursesRouter);

// Secure seed endpoint (clears cache before running)
app.get('/api/seed', (req, res) => {
  const { secret } = req.query;
  if (secret !== 'tedforce2026') return res.status(403).json({ error: 'Forbidden' });

  const fs = require('fs');
  const path = require('path');
  const dataFile = path.join(__dirname, 'data.json');
  try { fs.unlinkSync(dataFile); } catch(e) { /* may not exist */ }

  // Clear module cache so the latest seed.js is used
  delete require.cache[require.resolve('./seed')];
  require('./seed');

  const db = require('./db');
  res.json({ status: 'seeded', courses: db.getCourses().length });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
