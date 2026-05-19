const fs = require('fs');
const db = require('./db');

// Map of course title to { degree, fee }
const mapping = {
  "A – Advanced Algorithms": { degree: "PGD", fee: 500 },
  "A – Artificial Intelligence": { degree: "PGD", fee: 500 },
  // ... add all courses from the table above exactly as they appear in the DB
  "Human Rights Studies / Management": { degree: "PGFD", fee: 750 },
  // etc. (I'll give the full map below)
};

// Update all courses
const courses = db.getCourses();
courses.forEach(c => {
  const m = mapping[c.title];
  if (m) {
    c.degree = m.degree;
    c.fee = m.fee;
  }
});
db.save();
console.log('Prices and degrees updated!');
