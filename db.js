const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

let data = { courses: [], lessons: [] };

try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    data = JSON.parse(raw);
  }
} catch (e) {
  console.error('Error loading data.json, starting fresh', e.message);
}

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  getCourses: () => data.courses,
  getLessons: () => data.lessons,
  addCourse: (course) => {
    const id = data.courses.length + 1;
    const newCourse = { id, ...course };
    data.courses.push(newCourse);
    save();
    return newCourse;
  },
  addLesson: (lesson) => {
    const id = data.lessons.length + 1;
    const newLesson = { id, ...lesson };
    data.lessons.push(newLesson);
    save();
    return newLesson;
  },
  save,
};
