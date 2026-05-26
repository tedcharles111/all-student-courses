const db = require('../db');

function listCourses({ page = 1, limit = 20, search, starts_with, subject, level, sort = 'title' }) {
  let courses = db.getCourses();
  if (search) {
    const s = search.toLowerCase();
    courses = courses.filter(c => c.title.toLowerCase().includes(s) || c.subject.toLowerCase().includes(s));
  }
  if (starts_with) {
    courses = courses.filter(c => c.title.toLowerCase().startsWith(starts_with.toLowerCase()));
  }
  if (subject) courses = courses.filter(c => c.subject === subject);
  if (level) courses = courses.filter(c => c.level === level);

  courses.sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'subject') return a.subject.localeCompare(b.subject);
    return a.level.localeCompare(b.level);
  });

  const total = courses.length;
  const start = (page - 1) * limit;
  const paged = courses.slice(start, start + limit);
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    courses: paged.map(c => ({ ...c }))
  };
}

function getCourseById(id) {
  return db.getCourseById(id);
}

function getLessonById(courseId, lessonId) {
  const course = db.getCourseById(courseId);
  if (!course) return null;
  return course.lessons.find(l => l.id == lessonId) || null;
}

module.exports = { listCourses, getCourseById, getLessonById };
