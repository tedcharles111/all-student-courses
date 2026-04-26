const db = require('./db');

// Clear existing data (optional, for fresh seed)
db.exec('DELETE FROM lessons');
db.exec('DELETE FROM courses');
db.exec("DELETE FROM sqlite_sequence WHERE name='courses'");
db.exec("DELETE FROM sqlite_sequence WHERE name='lessons'");

// ========= Helper to insert course + lessons =========
function insertCourse({ title, subject, level, description, lessons }) {
  const stmtCourse = db.prepare(`
    INSERT INTO courses (title, subject, level, description, total_lessons) 
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmtCourse.run(title, subject, level, description, lessons.length);
  const courseId = result.lastInsertRowid;

  const stmtLesson = db.prepare(`
    INSERT INTO lessons (course_id, order_index, title, content, resource_url, resource_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const insertLessons = db.transaction((lessons) => {
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i];
      stmtLesson.run(courseId, i + 1, l.title, l.content, l.resource_url || null, l.resource_type || null);
    }
  });
  insertLessons(lessons);
}

// ========= PRIMARY SCHOOL COURSES =========
insertCourse({
  title: 'Basic Mathematics (Primary 1)',
  subject: 'Mathematics',
  level: 'primary',
  description: 'Introduction to numbers, addition, and subtraction for young learners.',
  lessons: [
    { title: 'Counting Numbers 1 to 10',
      content: '<p>Learn to count from 1 to 10. This lesson includes fun examples with apples and balls.</p><p><strong>Exercise:</strong> Count the objects and write the number.</p>',
      resource_url: '/files/primary-math-1-counting.pdf',
      resource_type: 'pdf' },
    { title: 'Addition with Pictures',
      content: '<p>Understanding addition using pictures. You will see how combining two groups gives a total.</p>',
      resource_url: null,
      resource_type: null },
    { title: 'Subtraction – Taking Away',
      content: '<p>What happens when we take away items? This lesson teaches basic subtraction with real-life examples.</p>',
      resource_url: '/files/primary-math-1-subtraction.mp4',
      resource_type: 'video' }
  ]
});

insertCourse({
  title: 'English Phonics & Reading (Primary 2)',
  subject: 'English',
  level: 'primary',
  description: 'Phonics sounds, blending, and reading simple sentences.',
  lessons: [
    { title: 'Alphabet Sounds',
      content: '<p>Each letter has a special sound. Listen and repeat: A, B, C...</p>',
      resource_url: '/files/phonics-alphabet.mp3',
      resource_type: 'audio' },
    { title: 'Blending Sounds into Words',
      content: '<p>Blend sounds to read words like "cat", "dog", "sun". Practice with interactive exercises.</p>',
      resource_url: null,
      resource_type: null },
    { title: 'Reading Short Stories',
      content: '<p>Read and understand a short story about a day at the park.</p>',
      resource_url: '/files/primary-english-story.pdf',
      resource_type: 'pdf' }
  ]
});

// ========= SECONDARY SCHOOL COURSES =========
insertCourse({
  title: 'Secondary Biology – Human Body Systems',
  subject: 'Biology',
  level: 'secondary',
  description: 'Detailed study of the digestive, circulatory, and respiratory systems.',
  lessons: [
    { title: 'The Digestive System',
      content: '<p>Organs involved and how food is broken down and absorbed. Includes diagrams and quizzes.</p>',
      resource_url: '/files/digestive-system-diagram.png',
      resource_type: 'image' },
    { title: 'Circulatory System',
      content: '<p>The heart, blood vessels, and how blood circulates oxygen and nutrients.</p>',
      resource_url: '/files/circulatory-system.mp4',
      resource_type: 'video' },
    { title: 'Respiratory System',
      content: '<p>Breathing mechanics and gas exchange in the lungs.</p>',
      resource_url: null,
      resource_type: null },
    { title: 'Quiz – Body Systems',
      content: '<p>Test your knowledge with this interactive quiz.</p>',
      resource_url: '/files/body-systems-quiz.pdf',
      resource_type: 'pdf' }
  ]
});

insertCourse({
  title: 'Physics – Introduction to Mechanics',
  subject: 'Physics',
  level: 'secondary',
  description: 'Newton’s laws, motion, forces, and energy.',
  lessons: [
    { title: 'Newton’s First Law of Motion',
      content: '<p>An object at rest stays at rest unless acted upon. Examples and applications.</p>',
      resource_url: null,
      resource_type: null },
    { title: 'Newton’s Second Law – F = ma',
      content: '<p>Force equals mass times acceleration. Solve practice problems.</p>',
      resource_url: '/files/mechanics-problems.pdf',
      resource_type: 'pdf' },
    { title: 'Energy and Work',
      content: '<p>Kinetic and potential energy, conservation of energy.</p>',
      resource_url: '/files/energy-simulation.html',
      resource_type: 'html' }
  ]
});

// ========= TERTIARY / UNIVERSITY COURSES =========
insertCourse({
  title: 'Introduction to Computer Science (CS101)',
  subject: 'Computer Science',
  level: 'tertiary',
  description: 'Algorithms, data structures, and Python programming.',
  lessons: [
    { title: 'What is an Algorithm?',
      content: '<p>Algorithms are step-by-step procedures. We look at sorting and searching examples.</p>',
      resource_url: null,
      resource_type: null },
    { title: 'Variables and Data Types in Python',
      content: '<p>Learn about integers, floats, strings, and lists. Code examples included.</p>',
      resource_url: '/files/python-syntax-cheatsheet.pdf',
      resource_type: 'pdf' },
    { title: 'Loops and Functions',
      content: '<p>for and while loops, defining functions. Practice exercises.</p>',
      resource_url: '/files/cs101-loops-lab.zip',
      resource_type: 'zip' },
    { title: 'Introduction to Big O Notation',
      content: '<p>Understanding time complexity with real-world examples.</p>',
      resource_url: '/files/big-o-explanation.mp4',
      resource_type: 'video' }
  ]
});

insertCourse({
  title: 'Principles of Economics (ECON 101)',
  subject: 'Economics',
  level: 'tertiary',
  description: 'Supply and demand, market structures, and macroeconomic indicators.',
  lessons: [
    { title: 'Supply and Demand',
      content: '<p>The core model of economics. Shifts vs movements along the curves.</p>',
      resource_url: '/files/supply-demand-graph.png',
      resource_type: 'image' },
    { title: 'Market Equilibrium',
      content: '<p>How prices are determined in competitive markets.</p>',
      resource_url: null,
      resource_type: null },
    { title: 'Gross Domestic Product (GDP)',
      content: '<p>Measuring a country’s economic output.</p>',
      resource_url: '/files/gdp-data-2023.xlsx',
      resource_type: 'file' }
  ]
});

// Add more courses as needed (you can easily extend)

console.log('Database seeded successfully!');
