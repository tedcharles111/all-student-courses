const db = require('./db');

// Clear all data
db.getCourses().length = 0;
db.getLessons().length = 0;

function addCourse({ title, subject, level, description, lessons }) {
  const course = db.addCourse({ title, subject, level, description, language: 'en', total_lessons: lessons.length });
  lessons.forEach((l, i) => {
    db.addLesson({
      course_id: course.id,
      order_index: i + 1,
      title: l.title,
      content: l.content,
      resource_url: l.resource_url || null,
      resource_type: l.resource_type || null
    });
  });
}

// Helper to create generic lessons
function genericLessons(n) {
  return Array.from({ length: n }, (_, i) => ({
    title: `Lesson ${i+1}`,
    content: `<p>Content for lesson ${i+1}.</p>`,
    resource_url: null,
    resource_type: null
  }));
}

const courses = [
  // ========== PRIMARY ==========
  { title: 'A – Alphabet & Animals (Primary)', subject: 'English', level: 'primary', description: 'Letters A‑Z with animals.', lessons: genericLessons(5) },
  { title: 'A – Adding Numbers (Primary Math)', subject: 'Mathematics', level: 'primary', description: 'Learn to add numbers up to 10.', lessons: genericLessons(4) },
  { title: 'B – Basic Reading (Primary)', subject: 'English', level: 'primary', description: 'Phonics and blending.', lessons: genericLessons(6) },
  { title: 'B – Big and Small (Primary Math)', subject: 'Mathematics', level: 'primary', description: 'Understanding sizes.', lessons: genericLessons(3) },
  { title: 'C – Colors and Shapes (Primary)', subject: 'Art', level: 'primary', description: 'Identify and name colors and shapes.', lessons: genericLessons(5) },
  { title: 'C – Counting to 20 (Primary Math)', subject: 'Mathematics', level: 'primary', description: 'Numbers 1‑20.', lessons: genericLessons(4) },
  { title: 'D – Days of the Week', subject: 'English', level: 'primary', description: 'Learn Monday through Sunday.', lessons: genericLessons(3) },
  { title: 'E – Everyday Science', subject: 'Science', level: 'primary', description: 'Plants, animals, weather.', lessons: genericLessons(5) },
  { title: 'F – Fun with Phonics', subject: 'English', level: 'primary', description: 'Advanced blending and segmenting.', lessons: genericLessons(6) },
  { title: 'G – Good Manners', subject: 'Social Studies', level: 'primary', description: 'Polite words and behavior.', lessons: genericLessons(2) },
  { title: 'H – Healthy Habits', subject: 'Health', level: 'primary', description: 'Brushing teeth, washing hands.', lessons: genericLessons(3) },
  { title: 'I – Introduction to Music', subject: 'Music', level: 'primary', description: 'Rhythm and singing.', lessons: genericLessons(4) },
  { title: 'J – Jumping into Math', subject: 'Mathematics', level: 'primary', description: 'Starters for addition/subtraction.', lessons: genericLessons(5) },
  { title: 'K – Knowing Your Body', subject: 'Science', level: 'primary', description: 'Parts of the body.', lessons: genericLessons(4) },
  { title: 'L – Letters and Words', subject: 'English', level: 'primary', description: 'Forming simple words.', lessons: genericLessons(6) },
  { title: 'M – My Family', subject: 'Social Studies', level: 'primary', description: 'Family members and roles.', lessons: genericLessons(3) },
  { title: 'N – Numbers and Patterns', subject: 'Mathematics', level: 'primary', description: 'Recognizing patterns.', lessons: genericLessons(4) },
  { title: 'O – Our World', subject: 'Geography', level: 'primary', description: 'Continents and oceans.', lessons: genericLessons(3) },
  { title: 'P – Phonics Fun', subject: 'English', level: 'primary', description: 'More blending.', lessons: genericLessons(5) },
  { title: 'Q – Question Words', subject: 'English', level: 'primary', description: 'Who, what, where, when, why.', lessons: genericLessons(3) },
  { title: 'R – Rhymes and Songs', subject: 'Music', level: 'primary', description: 'Nursery rhymes.', lessons: genericLessons(4) },
  { title: 'S – Seasons and Weather', subject: 'Science', level: 'primary', description: 'Four seasons.', lessons: genericLessons(4) },
  { title: 'T – Time and Clocks', subject: 'Mathematics', level: 'primary', description: 'Reading clocks.', lessons: genericLessons(5) },
  { title: 'U – Under the Sea', subject: 'Science', level: 'primary', description: 'Ocean animals.', lessons: genericLessons(3) },
  { title: 'V – Vehicles', subject: 'General Knowledge', level: 'primary', description: 'Cars, planes, trains.', lessons: genericLessons(3) },
  { title: 'W – Writing Practice', subject: 'English', level: 'primary', description: 'Letter formation.', lessons: genericLessons(6) },
  { title: 'X – eXploring Nature', subject: 'Science', level: 'primary', description: 'Insects and plants.', lessons: genericLessons(4) },
  { title: 'Y – Yummy Food', subject: 'Health', level: 'primary', description: 'Healthy eating.', lessons: genericLessons(3) },
  { title: 'Z – Zoo Animals', subject: 'Science', level: 'primary', description: 'Learn about zoo animals.', lessons: genericLessons(4) },

  // ========== SECONDARY ==========
  { title: 'A – Algebra I', subject: 'Mathematics', level: 'secondary', description: 'Linear equations.', lessons: genericLessons(5) },
  { title: 'B – Biology: Cells', subject: 'Biology', level: 'secondary', description: 'Cell structure and function.', lessons: genericLessons(4) },
  { title: 'C – Chemistry Basics', subject: 'Chemistry', level: 'secondary', description: 'Atoms and molecules.', lessons: genericLessons(5) },
  { title: 'D – Data Handling', subject: 'Mathematics', level: 'secondary', description: 'Statistics and graphs.', lessons: genericLessons(4) },
  { title: 'E – Earth Science', subject: 'Geography', level: 'secondary', description: 'Rocks, volcanoes, earthquakes.', lessons: genericLessons(5) },
  { title: 'F – French for Beginners', subject: 'Languages', level: 'secondary', description: 'Greetings and basic phrases.', lessons: genericLessons(6) },
  { title: 'G – Geometry', subject: 'Mathematics', level: 'secondary', description: 'Angles, triangles, circles.', lessons: genericLessons(5) },
  { title: 'H – History: Ancient Civilizations', subject: 'History', level: 'secondary', description: 'Egypt, Greece, Rome.', lessons: genericLessons(4) },
  { title: 'I – Information Technology', subject: 'Computer Science', level: 'secondary', description: 'Hardware and software.', lessons: genericLessons(4) },
  { title: 'J – Justice and Government', subject: 'Social Studies', level: 'secondary', description: 'Civics and law.', lessons: genericLessons(3) },
  { title: 'K – Kinematics', subject: 'Physics', level: 'secondary', description: 'Motion, velocity, acceleration.', lessons: genericLessons(5) },
  { title: 'L – Literature: Poetry', subject: 'English', level: 'secondary', description: 'Analyzing poems.', lessons: genericLessons(4) },
  { title: 'M – Music Theory', subject: 'Music', level: 'secondary', description: 'Notes, scales, chords.', lessons: genericLessons(5) },
  { title: 'N – Newtonian Mechanics', subject: 'Physics', level: 'secondary', description: 'Laws of motion.', lessons: genericLessons(5) },
  { title: 'O – Organic Chemistry Intro', subject: 'Chemistry', level: 'secondary', description: 'Hydrocarbons.', lessons: genericLessons(4) },
  { title: 'P – Probability', subject: 'Mathematics', level: 'secondary', description: 'Chance and odds.', lessons: genericLessons(4) },
  { title: 'Q – Quantum Physics (Intro)', subject: 'Physics', level: 'secondary', description: 'Wave‑particle duality.', lessons: genericLessons(3) },
  { title: 'R – Reproduction in Plants', subject: 'Biology', level: 'secondary', description: 'Flowers and pollination.', lessons: genericLessons(4) },
  { title: 'S – Spanish for Beginners', subject: 'Languages', level: 'secondary', description: 'Hola, ¿cómo estás?', lessons: genericLessons(5) },
  { title: 'T – Trigonometry', subject: 'Mathematics', level: 'secondary', description: 'Sine, cosine, tangent.', lessons: genericLessons(5) },
  { title: 'U – US History', subject: 'History', level: 'secondary', description: 'Revolution to Civil War.', lessons: genericLessons(4) },
  { title: 'V – Volcanoes and Earthquakes', subject: 'Geography', level: 'secondary', description: 'Plate tectonics.', lessons: genericLessons(4) },
  { title: 'W – World Religions', subject: 'Religious Studies', level: 'secondary', description: 'Major world religions.', lessons: genericLessons(3) },
  { title: 'X – eXploring Space', subject: 'Astronomy', level: 'secondary', description: 'Planets and stars.', lessons: genericLessons(4) },
  { title: 'Y – Youth and Society', subject: 'Social Studies', level: 'secondary', description: 'Peer pressure and media.', lessons: genericLessons(3) },
  { title: 'Z – Zoology Basics', subject: 'Biology', level: 'secondary', description: 'Animal classification.', lessons: genericLessons(4) },

  // ========== TERTIARY (University) ==========
  { title: 'A – Advanced Algorithms', subject: 'Computer Science', level: 'tertiary', description: 'Sorting, searching, dynamic programming.', lessons: genericLessons(5) },
  { title: 'A – Artificial Intelligence', subject: 'Computer Science', level: 'tertiary', description: 'Machine learning basics.', lessons: genericLessons(6) },
  { title: 'B – Biochemistry', subject: 'Biology', level: 'tertiary', description: 'Proteins, enzymes, metabolism.', lessons: genericLessons(5) },
  { title: 'C – Calculus I', subject: 'Mathematics', level: 'tertiary', description: 'Limits, derivatives, integrals.', lessons: genericLessons(6) },
  { title: 'C – Corporate Finance', subject: 'Business', level: 'tertiary', description: 'Capital budgeting, valuation.', lessons: genericLessons(4) },
  { title: 'D – Data Structures', subject: 'Computer Science', level: 'tertiary', description: 'Stacks, queues, trees, graphs.', lessons: genericLessons(5) },
  { title: 'E – Engineering Mechanics', subject: 'Engineering', level: 'tertiary', description: 'Statics and dynamics.', lessons: genericLessons(5) },
  { title: 'E – Electromagnetism', subject: 'Physics', level: 'tertiary', description: 'Maxwell’s equations.', lessons: genericLessons(5) },
  { title: 'F – Fluid Mechanics', subject: 'Engineering', level: 'tertiary', description: 'Bernoulli, Reynolds.', lessons: genericLessons(4) },
  { title: 'G – Game Theory', subject: 'Economics', level: 'tertiary', description: 'Nash equilibrium, auctions.', lessons: genericLessons(4) },
  { title: 'H – Human Anatomy', subject: 'Medicine', level: 'tertiary', description: 'Organs and systems.', lessons: genericLessons(5) },
  { title: 'I – International Law', subject: 'Law', level: 'tertiary', description: 'Treaties, UN, human rights.', lessons: genericLessons(4) },
  { title: 'J – Java Programming', subject: 'Computer Science', level: 'tertiary', description: 'OOP, Swing, JDBC.', lessons: genericLessons(5) },
  { title: 'K – Kinematics of Machinery', subject: 'Engineering', level: 'tertiary', description: 'Gears, linkages.', lessons: genericLessons(4) },
  { title: 'L – Linear Algebra', subject: 'Mathematics', level: 'tertiary', description: 'Matrices, vectors, eigenvalues.', lessons: genericLessons(5) },
  { title: 'M – Macroeconomics', subject: 'Economics', level: 'tertiary', description: 'GDP, inflation, fiscal policy.', lessons: genericLessons(5) },
  { title: 'M – Microeconomics', subject: 'Economics', level: 'tertiary', description: 'Supply, demand, elasticity.', lessons: genericLessons(5) },
  { title: 'N – Network Security', subject: 'Computer Science', level: 'tertiary', description: 'Firewalls, encryption, protocols.', lessons: genericLessons(4) },
  { title: 'O – Operating Systems', subject: 'Computer Science', level: 'tertiary', description: 'Processes, memory, file systems.', lessons: genericLessons(5) },
  { title: 'P – Philosophy of Science', subject: 'Philosophy', level: 'tertiary', description: 'Falsifiability, paradigms.', lessons: genericLessons(3) },
  { title: 'P – Probability Theory', subject: 'Mathematics', level: 'tertiary', description: 'Random variables, distributions.', lessons: genericLessons(5) },
  { title: 'Q – Quantum Computing', subject: 'Computer Science', level: 'tertiary', description: 'Qubits and superposition.', lessons: genericLessons(4) },
  { title: 'R – Robotics', subject: 'Engineering', level: 'tertiary', description: 'Kinematics, control, sensors.', lessons: genericLessons(4) },
  { title: 'S – Software Engineering', subject: 'Computer Science', level: 'tertiary', description: 'SDLC, testing, design patterns.', lessons: genericLessons(5) },
  { title: 'T – Thermodynamics', subject: 'Physics', level: 'tertiary', description: 'Laws of thermodynamics.', lessons: genericLessons(5) },
  { title: 'U – Unix/Linux Systems', subject: 'Computer Science', level: 'tertiary', description: 'Shell scripting, processes.', lessons: genericLessons(4) },
  { title: 'V – Vector Calculus', subject: 'Mathematics', level: 'tertiary', description: 'Gradient, divergence, curl.', lessons: genericLessons(5) },
  { title: 'W – Web Development', subject: 'Computer Science', level: 'tertiary', description: 'HTML, CSS, JavaScript, React.', lessons: genericLessons(6) },
  { title: 'X – XML and Web Services', subject: 'Computer Science', level: 'tertiary', description: 'SOAP, REST.', lessons: genericLessons(3) },
  { title: 'Y – Yoga and Wellness', subject: 'Health Sciences', level: 'tertiary', description: 'Mind‑body connection.', lessons: genericLessons(3) },
  { title: 'Z – Zoology: Vertebrate Biology', subject: 'Biology', level: 'tertiary', description: 'Fish, amphibians, reptiles.', lessons: genericLessons(4) },
];

courses.forEach(c => addCourse(c));

console.log('Database seeded with ' + courses.length + ' courses!');
