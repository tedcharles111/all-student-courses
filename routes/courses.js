const express = require('express');
const router = express.Router();
const model = require('../models/course');

// GET /api/courses – list with pagination, search, filters
router.get('/', (req, res) => {
  try {
    const { page, limit, search, subject, level, sort } = req.query;
    const result = model.listCourses({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 20,
      search: search || '',
      subject: subject || null,
      level: level || null,
      sort: sort || 'title'
    });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/courses/:id – full course with all lessons
router.get('/:id', (req, res) => {
  try {
    const course = model.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/courses/:courseId/lessons/:lessonId – single lesson
router.get('/:courseId/lessons/:lessonId', (req, res) => {
  try {
    const lesson = model.getLessonById(req.params.courseId, req.params.lessonId);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
