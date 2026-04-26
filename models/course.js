const db = require('../db');

function listCourses({ page = 1, limit = 20, search, starts_with, subject, level, sort = 'title' }) {
  let courses = db.getCourses();

  if (search) {
    const s = search.toLowerCase();
    courses = courses.filter(c => c.title.toLowerCase().includes(s) || c.subject.toLowerCase().includes(s));
  }
  if (starts_with) {
    const letter = starts_with.toLowerCase();
    courses = courses.filter(c => c.title.toLowerCase().startsWith(letter));
  }
  if (subject) {
    courses = courses.filter(c => c.subject === subject);
  }
  if (level) {
    courses = courses.filter(c => c.level === level);
  }

  courses.sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'subject') return a.subject.localeCompare(b.subject);
    if (sort === 'level') return a.level.localeCompare(b.level);
    return 0;
  });

  const total = courses.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const paged = courses.slice(start, start + limit);

  return {
    page,
    limit,
    total,
    totalPages,
    courses: paged.map(c => ({ ...c, lessons: undefined }))
  };
}

function getCourseById(id) {
  const course = db.getCourses().find(c => c.id == id);
  if (!course) return null;
  const lessons = db.getLessons().filter(l => l.course_id == id).sort((a, b) => a.order_index - b.order_index);
  return { ...course, lessons };
}

function getLessonById(courseId, lessonId) {
  return db.getLessons().find(l => l.id == lessonId && l.course_id == courseId) || null;
}

module.exports = { listCourses, getCourseById, getLessonById };
