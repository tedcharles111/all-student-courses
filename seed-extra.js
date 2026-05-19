const db = require('./db');

function addCourse({ title, subject, level, description, lessons }) {
  const c = db.addCourse({ title, subject, level, description, language:'en', total_lessons: lessons.length });
  lessons.forEach((l,i) => db.addLesson({ course_id: c.id, order_index: i+1, title: l.title, content: l.content }));
}

// Helper to generate generic but realistic lessons
function genLessons(courseName, sub) {
  return [
    {title: `Introduction to ${courseName}`, content: `<h2>Welcome to ${courseName}</h2><p>This course provides a comprehensive foundation in ${courseName}. You will explore the core concepts, historical development, and modern practices that shape this field. By the end of this course, you will be able to discuss key theories and apply them in real‑world scenarios.</p>`},
    {title: `Key Theories and Principles`, content: `<h2>Theoretical Frameworks</h2><p>Understanding the theoretical underpinnings is essential. In ${courseName}, we study models such as the ${sub} paradigm, stakeholder analysis, and systems theory. Each contributes unique insights into how organisations and individuals operate within the broader context of ${courseName}.</p>`},
    {title: `Practical Applications`, content: `<h2>Applying Knowledge</h2><p>This lesson bridges theory and practice. You will examine case studies, learn project planning techniques specific to ${courseName}, and work through exercises that simulate real challenges. Emphasis is placed on decision‑making, ethical considerations, and resource management.</p>`},
    {title: `Case Studies in ${courseName}`, content: `<h2>Learning from Experience</h2><p>We analyse several landmark cases that have shaped the discipline. Each case highlights common pitfalls and best practices. After reviewing a case, you will be asked to propose alternative strategies and justify your recommendations using the concepts covered earlier.</p>`},
    {title: `Current Trends and Future Outlook`, content: `<h2>Looking Ahead</h2><p>${courseName} is constantly evolving. Technological advancements, globalisation, and shifting societal values influence how ${sub} professionals work. This lesson explores recent developments and forecasts future directions, preparing you to adapt and lead change.</p>`},
    {title: `Revision and Final Assessment`, content: `<h2>Consolidating Your Learning</h2><p>This final lesson revisits the major themes of the course and provides a structured revision plan. You will complete a comprehensive quiz and a short written assignment to demonstrate mastery of the material. Good luck!</p>`}
  ];
}

// Specific courses with tailored content (some examples)
const specificCourses = [
  { title:'Human Rights Studies / Management', sub:'Human Rights', level:'tertiary', desc:'In‑depth study of human rights law and management.' },
  { title:'Professional Photography Management', sub:'Photography', level:'tertiary', desc:'Managing photography studios and freelance operations.' },
  { title:'Press Laws / Management', sub:'Media Law', level:'tertiary', desc:'Legal frameworks governing the press.' },
  { title:'Hospital/Health Services / Management', sub:'Health', level:'tertiary', desc:'Management of healthcare organisations.' },
  { title:'Agri Business Management', sub:'Agriculture', level:'tertiary', desc:'Business principles applied to agriculture.' },
  { title:'Social Research / Tourism Management', sub:'Tourism', level:'tertiary', desc:'Research methods and tourism industry management.' },
  { title:'Horticulture Management', sub:'Horticulture', level:'tertiary', desc:'Management of horticultural enterprises.' },
  { title:'Social Media / Digital Marketing Management', sub:'Marketing', level:'tertiary', desc:'Strategies for social media and digital campaigns.' },
  { title:'Business Laws / Management', sub:'Business Law', level:'tertiary', desc:'Legal aspects of business operations.' },
  { title:'Constitutional and Administrative Law', sub:'Law', level:'tertiary', desc:'Principles of constitutional and administrative law.' },
  { title:'International Law / Management', sub:'International Law', level:'tertiary', desc:'Public international law and management.' },
  { title:'Project Management', sub:'Project Management', level:'tertiary', desc:'Methodologies for successful project delivery.' },
  { title:'Marine Resources Management', sub:'Marine', level:'tertiary', desc:'Sustainable management of marine resources.' },
  { title:'Criminal Services/Law and Management', sub:'Criminal Justice', level:'tertiary', desc:'Management in criminal justice systems.' },
  { title:'Management Research and Consulting', sub:'Management', level:'tertiary', desc:'Research methods and consulting skills.' },
  { title:'Management Psychology', sub:'Psychology', level:'tertiary', desc:'Psychological principles in management.' },
  { title:'Public Administration', sub:'Public Admin', level:'tertiary', desc:'Government and public sector management.' },
  { title:'Homicide Investigation Management', sub:'Criminal Investigation', level:'tertiary', desc:'Managing homicide investigations.' },
  { title:'Business Studies', sub:'Business', level:'secondary', desc:'Foundation of business concepts.' },
  { title:'Business English / Communication', sub:'English', level:'secondary', desc:'Professional communication skills.' },
  { title:'Systematic Theory / Management', sub:'Management', level:'tertiary', desc:'Systems theory applied to organisations.' },
  { title:'General Management', sub:'Management', level:'tertiary', desc:'Core management principles.' },
  { title:'Media Management', sub:'Media', level:'tertiary', desc:'Managing media organisations.' },
  { title:'Development Journalism', sub:'Journalism', level:'tertiary', desc:'Journalism focused on development issues.' },
  { title:'Public Relations Management', sub:'PR', level:'tertiary', desc:'Strategic public relations.' },
  { title:'Advertising Management', sub:'Advertising', level:'tertiary', desc:'Managing advertising campaigns.' },
  { title:'Marketing Management', sub:'Marketing', level:'tertiary', desc:'Advanced marketing strategies.' },
  { title:'Banking and Financial Services Management', sub:'Finance', level:'tertiary', desc:'Banking operations and management.' },
  { title:'Insurance Marketing / Management', sub:'Insurance', level:'tertiary', desc:'Insurance industry marketing and management.' },
  { title:'Strategic Management', sub:'Management', level:'tertiary', desc:'Long‑term strategic planning.' },
  { title:'International Management', sub:'International Business', level:'tertiary', desc:'Managing across cultures and borders.' },
  { title:'Police Service Management', sub:'Criminal Justice', level:'tertiary', desc:'Administration of police services.' },
  { title:'Hotel Operations Management', sub:'Hospitality', level:'tertiary', desc:'Management of hotel and hospitality services.' },
  { title:'Global Marketing Management', sub:'Marketing', level:'tertiary', desc:'Marketing on a global scale.' },
  { title:'Small Business Management', sub:'Entrepreneurship', level:'secondary', desc:'Running and growing a small business.' },
  { title:'Business Administration', sub:'Business', level:'secondary', desc:'Fundamentals of business administration.' },
  { title:'Movie Making / TV Broadcasting Management', sub:'Film & TV', level:'tertiary', desc:'Production and broadcast management.' },
  { title:'Human Resources Management', sub:'HR', level:'tertiary', desc:'Strategic HR practices.' },
  { title:'Christian Church Management', sub:'Religious Studies', level:'tertiary', desc:'Management principles for churches.' },
  { title:'Dispute Resolution and Conflict Management', sub:'Law', level:'tertiary', desc:'Alternative dispute resolution.' },
  { title:'Educational Administration', sub:'Education', level:'tertiary', desc:'Leadership in educational institutions.' },
  { title:'Distance Educational Administration', sub:'Education', level:'tertiary', desc:'Managing online and distance learning.' },
  { title:'Physical Education / Sports Management', sub:'Sports', level:'tertiary', desc:'Management of sports programmes and facilities.' },
  { title:'Security Management', sub:'Security', level:'tertiary', desc:'Organisational and physical security management.' },
  { title:'International Development / Management', sub:'Development', level:'tertiary', desc:'Development theory and practice.' },
  { title:'Human Development Management', sub:'Human Development', level:'tertiary', desc:'Managing human development programmes.' },
  { title:'Diplomatic Studies/Management', sub:'Diplomacy', level:'tertiary', desc:'Diplomatic theory and practice.' },
  { title:'Economic Development / Management', sub:'Economics', level:'tertiary', desc:'Economics of development.' },
  { title:'African History/Management', sub:'History', level:'tertiary', desc:'Major themes in African history.' },
  { title:'African American History/ Management', sub:'History', level:'tertiary', desc:'History of African Americans.' },
  { title:'American History / Management', sub:'History', level:'tertiary', desc:'Survey of American history.' },
  { title:'American Government /Management', sub:'Political Science', level:'tertiary', desc:'Structure and function of US government.' },
  { title:'Show Business Management (Music/Films)', sub:'Entertainment', level:'tertiary', desc:'Managing careers and projects in entertainment.' }
];

specificCourses.forEach(c => {
  addCourse({
    title: c.title,
    subject: c.sub,
    level: c.level,
    description: c.desc,
    lessons: genLessons(c.title, c.sub)
  });
});

console.log('Extra courses added successfully – total courses now:', db.getCourses().length);
