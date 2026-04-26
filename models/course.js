const db = require('../db');

function listCourses({ page = 1, limit = 20, search, subject, level, sort = 'title' }) {
  const offset = (page - 1) * limit;
  let whereClause = [];
  let params = {};

  if (search) {
    whereClause.push(`(c.title LIKE @search OR c.subject LIKE @search)`);
    params.search = `%${search}%`;
  }
  if (subject) {
    whereClause.push(`c.subject = @subject`);
    params.subject = subject;
  }
  if (level) {
    whereClause.push(`c.level = @level`);
    params.level = level;
  }

  const whereSQL = whereClause.length > 0 ? `WHERE ${whereClause.join(' AND ')}` : '';

  // Count total matching
  const countRow = db.prepare(`SELECT COUNT(*) as total FROM courses c ${whereSQL}`).get(params);
  const total = countRow.total;

  // Fetch page
  const allowedSorts = { title: 'c.title', subject: 'c.subject', level: 'c.level' };
  const orderBy = allowedSorts[sort] || 'c.title';

  const rows = db.prepare(`
    SELECT c.id, c.title, c.subject, c.level, c.description, 
           c.language, c.total_lessons
    FROM courses c
    ${whereSQL}
    ORDER BY ${orderBy}
    LIMIT @limit OFFSET @offset
  `).all({ ...params, limit, offset });

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    courses: rows
  };
}

function getCourseById(id) {
  const course = db.prepare(`SELECT * FROM courses WHERE id = ?`).get(id);
  if (!course) return null;

  const lessons = db.prepare(`
    SELECT id, order_index, title, content, resource_url, resource_type
    FROM lessons
    WHERE course_id = ?
    ORDER BY order_index
  `).all(id);

  return { ...course, lessons };
}

function getLessonById(courseId, lessonId) {
  const lesson = db.prepare(`
    SELECT * FROM lessons WHERE id = ? AND course_id = ?
  `).get(lessonId, courseId);
  return lesson;
}

module.exports = { listCourses, getCourseById, getLessonById };
