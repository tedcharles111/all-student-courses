const express = require('express');
const cors = require('cors');
const coursesRouter = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 10000;   // Render uses PORT env var

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('Course Repository API is running.'));

// Courses routes
app.use('/api/courses', coursesRouter);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Endpoint not found' }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
