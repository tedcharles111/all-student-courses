const fs = require('fs');
const path = require('path');

const COURSES_DIR = path.join(__dirname, 'courses');
const INDEX_FILE = path.join(COURSES_DIR, 'index.json');
const LESSONS_DIR = path.join(__dirname, 'lessons');

// Ensure directories exist
[COURSES_DIR, LESSONS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function loadIndex() {
  if (!fs.existsSync(INDEX_FILE)) return { courses: [], nextId: 1 };
  return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
}

function saveIndex(index) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

// Add a course and its lessons to the database
function addCourse(courseData) {
  const index = loadIndex();
  const courseId = index.nextId;
  const course = {
    id: courseId,
    title: courseData.title,
    subject: courseData.subject,
    level: courseData.level,
    description: courseData.description,
    language: 'en',
    total_lessons: courseData.total_lessons
  };

  // Save course metadata in index
  index.courses.push(course);
  index.nextId = courseId + 1;
  saveIndex(index);

  // Save the full course object (with lessons) in its own file
  const courseFile = path.join(COURSES_DIR, `course_${courseId}.json`);
  const fullCourse = { ...course, lessons: courseData.lessons };
  fs.writeFileSync(courseFile, JSON.stringify(fullCourse));

  return courseId;
}

// Get list of courses (without lessons)
function getCourses() {
  return loadIndex().courses;
}

// Get full course by id
function getCourseById(id) {
  const courseFile = path.join(COURSES_DIR, `course_${id}.json`);
  if (!fs.existsSync(courseFile)) return null;
  return JSON.parse(fs.readFileSync(courseFile, 'utf-8'));
}

module.exports = { addCourse, getCourses, getCourseById };
