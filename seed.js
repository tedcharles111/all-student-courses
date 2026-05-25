const db = require('./db');
db.getCourses().length = 0;
db.getLessons().length = 0;

function addCourse({ title, subject, level, description }) {
  const c = db.addCourse({ title, subject, level, description, language:'en', total_lessons: 13 });
  for (let i = 1; i <= 13; i++) {
    db.addLesson({
      course_id: c.id,
      order_index: i,
      title: `Chapter ${i}: ${topicTemplates[i-1] || 'Advanced Topics'}`,
      content: generateContent(title, subject, i)
    });
  }
}

const topicTemplates = [
  'Introduction and Historical Background',
  'Fundamental Theories and Principles',
  'Core Concepts – Part I',
  'Core Concepts – Part II',
  'Analytical Frameworks and Models',
  'Research Methodologies',
  'Case Studies and Real‑World Applications',
  'Contemporary Issues and Debates',
  'Policy, Regulation and Ethics',
  'Technological Impact and Innovation',
  'Leadership and Strategic Management',
  'Future Trends and Global Perspectives',
  'Integrative Review and Capstone Project'
];

const hugeParagraphPool = [
  "This section provides an exhaustive exploration of {topic}, drawing on multidisciplinary research and decades of practical experience. We begin by defining key terms and establishing the historical context that shaped current thinking. Early pioneers in {subject} laid the groundwork for the sophisticated models we use today. Their contributions, though sometimes overlooked, remain relevant.",
  "A deep dive into the theoretical foundations reveals several competing paradigms. The positivist approach emphasises measurable outcomes, while the interpretivist perspective values contextual understanding. Both have merit, and contemporary {subject} practitioners often blend the two. The choice of paradigm significantly influences methodology and the types of conclusions that can be drawn.",
  "Empirical evidence supporting the principles of {topic} is robust. A meta‑analysis of 150 studies published in the last decade found a strong positive correlation between structured {topic} implementation and organisational performance. The effect size (d = 0.72) indicates a substantial practical significance, meaning that improvements are not just statistical artefacts.",
  "Case study: In 2018, a multinational corporation faced a critical challenge that required immediate application of {topic}. The CEO assembled a cross‑functional task force that worked around the clock for three months. By applying the frameworks discussed in this chapter, they not only resolved the crisis but also increased market share by 12%. This example illustrates the power of theoretical knowledge when combined with decisive action.",
  "From a critical perspective, {topic} is not without its detractors. Some scholars argue that the traditional models are overly simplistic and fail to account for cultural nuances. Others point out that rapid technological change renders certain best practices obsolete within a few years. This chapter addresses these criticisms head‑on and proposes a more adaptive, agile approach.",
  "Practical exercise: Conduct a force‑field analysis on a {topic}‑related problem you are currently facing. Identify driving forces and restraining forces, then assign a score to each based on their impact. Develop an action plan to strengthen the drivers and mitigate the restraints. This tool is widely used in change management and provides a structured way to think about complex challenges.",
  "The regulatory landscape surrounding {topic} is complex and varies by jurisdiction. In the European Union, the General Data Protection Regulation (GDPR) has had a profound impact on how {subject} data is collected and processed. Similarly, the United States has a patchwork of federal and state laws that often create confusion. Staying compliant requires continuous monitoring and a proactive compliance strategy.",
  "Technological disruption is reshaping {topic} at an unprecedented pace. Artificial intelligence, blockchain, and the Internet of Things are no longer futuristic concepts; they are practical tools that can streamline operations and create new value streams. However, adoption requires significant investment and a willingness to experiment. This chapter provides a roadmap for technology integration.",
  "Effective communication is a cornerstone of successful {topic} management. Stakeholders need to be kept informed at every stage, from initial planning through to final evaluation. Transparency builds trust and reduces resistance to change. We will examine proven communication frameworks and provide templates that you can adapt for your own projects.",
  "Looking ahead, the future of {topic} will be shaped by global megatrends such as climate change, demographic shifts, and economic uncertainty. Professionals who can anticipate these changes and pivot quickly will be in high demand. This final section of the chapter invites you to reflect on your own career path and consider how you can contribute to the evolution of {subject}."
];

function random(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateContent(courseTitle, subject, chapterNum) {
  const topic = topicTemplates[chapterNum-1] || `Chapter ${chapterNum}`;
  let html = `<h2>${topic}</h2>`;
  for (let i = 0; i < 80; i++) {
    const p = random(hugeParagraphPool).replace(/\{topic\}/g, topic).replace(/\{subject\}/g, subject);
    html += `<p>${p}</p>`;
  }
  html += '<h3>Chapter Summary</h3><ul><li>Main insight one</li><li>Main insight two</li><li>Main insight three</li></ul>';
  html += '<p><em>End of Chapter.</em></p>';
  return html;
}

// All 139 courses (same list)
const allCourses = [
  {title:'A – Advanced Algorithms', sub:'Computer Science', lev:'tertiary'},
  {title:'A – Artificial Intelligence', sub:'Computer Science', lev:'tertiary'},
  {title:'B – Biochemistry', sub:'Biology', lev:'tertiary'},
  {title:'C – Calculus I', sub:'Mathematics', lev:'tertiary'},
  {title:'C – Corporate Finance', sub:'Business', lev:'tertiary'},
  {title:'D – Data Structures', sub:'Computer Science', lev:'tertiary'},
  {title:'E – Electromagnetism', sub:'Physics', lev:'tertiary'},
  {title:'E – Engineering Mechanics', sub:'Engineering', lev:'tertiary'},
  {title:'F – Fluid Mechanics', sub:'Engineering', lev:'tertiary'},
  {title:'G – Game Theory', sub:'Economics', lev:'tertiary'},
  {title:'H – Human Anatomy', sub:'Medicine', lev:'tertiary'},
  {title:'I – International Law', sub:'Law', lev:'tertiary'},
  {title:'J – Java Programming', sub:'Computer Science', lev:'tertiary'},
  {title:'K – Kinematics of Machinery', sub:'Engineering', lev:'tertiary'},
  {title:'L – Linear Algebra', sub:'Mathematics', lev:'tertiary'},
  {title:'M – Macroeconomics', sub:'Economics', lev:'tertiary'},
  {title:'M – Microeconomics', sub:'Economics', lev:'tertiary'},
  {title:'N – Network Security', sub:'Computer Science', lev:'tertiary'},
  {title:'O – Operating Systems', sub:'Computer Science', lev:'tertiary'},
  {title:'P – Philosophy of Science', sub:'Philosophy', lev:'tertiary'},
  {title:'P – Probability Theory', sub:'Mathematics', lev:'tertiary'},
  {title:'Q – Quantum Computing', sub:'Computer Science', lev:'tertiary'},
  {title:'R – Robotics', sub:'Engineering', lev:'tertiary'},
  {title:'S – Software Engineering', sub:'Computer Science', lev:'tertiary'},
  {title:'T – Thermodynamics', sub:'Physics', lev:'tertiary'},
  {title:'U – Unix/Linux Systems', sub:'Computer Science', lev:'tertiary'},
  {title:'V – Vector Calculus', sub:'Mathematics', lev:'tertiary'},
  {title:'W – Web Development', sub:'Computer Science', lev:'tertiary'},
  {title:'X – XML and Web Services', sub:'Computer Science', lev:'tertiary'},
  {title:'Y – Yoga and Wellness', sub:'Health Sciences', lev:'tertiary'},
  {title:'Z – Zoology: Vertebrate Biology', sub:'Biology', lev:'tertiary'},
  {title:'Human Rights Studies / Management', sub:'Human Rights', lev:'tertiary'},
  {title:'Professional Photography Management', sub:'Photography', lev:'tertiary'},
  {title:'Press Laws / Management', sub:'Media Law', lev:'tertiary'},
  {title:'Hospital/Health Services / Management', sub:'Health', lev:'tertiary'},
  {title:'Agri Business Management', sub:'Agriculture', lev:'tertiary'},
  {title:'Social Research / Tourism Management', sub:'Tourism', lev:'tertiary'},
  {title:'Horticulture Management', sub:'Horticulture', lev:'tertiary'},
  {title:'Social Media / Digital Marketing Management', sub:'Marketing', lev:'tertiary'},
  {title:'Business Laws / Management', sub:'Business Law', lev:'tertiary'},
  {title:'Constitutional and Administrative Law', sub:'Law', lev:'tertiary'},
  {title:'International Law / Management', sub:'International Law', lev:'tertiary'},
  {title:'Project Management', sub:'Project Management', lev:'tertiary'},
  {title:'Marine Resources Management', sub:'Marine', lev:'tertiary'},
  {title:'Criminal Services/Law and Management', sub:'Criminal Justice', lev:'tertiary'},
  {title:'Management Research and Consulting', sub:'Management', lev:'tertiary'},
  {title:'Management Psychology', sub:'Psychology', lev:'tertiary'},
  {title:'Public Administration', sub:'Public Admin', lev:'tertiary'},
  {title:'Homicide Investigation Management', sub:'Criminal Investigation', lev:'tertiary'},
  {title:'Business Studies', sub:'Business', lev:'secondary'},
  {title:'Business English / Communication', sub:'English', lev:'secondary'},
  {title:'Systematic Theory / Management', sub:'Management', lev:'tertiary'},
  {title:'General Management', sub:'Management', lev:'tertiary'},
  {title:'Media Management', sub:'Media', lev:'tertiary'},
  {title:'Development Journalism', sub:'Journalism', lev:'tertiary'},
  {title:'Public Relations Management', sub:'PR', lev:'tertiary'},
  {title:'Advertising Management', sub:'Advertising', lev:'tertiary'},
  {title:'Marketing Management', sub:'Marketing', lev:'tertiary'},
  {title:'Banking and Financial Services Management', sub:'Finance', lev:'tertiary'},
  {title:'Insurance Marketing / Management', sub:'Insurance', lev:'tertiary'},
  {title:'Strategic Management', sub:'Management', lev:'tertiary'},
  {title:'International Management', sub:'International Business', lev:'tertiary'},
  {title:'Police Service Management', sub:'Criminal Justice', lev:'tertiary'},
  {title:'Hotel Operations Management', sub:'Hospitality', lev:'tertiary'},
  {title:'Global Marketing Management', sub:'Marketing', lev:'tertiary'},
  {title:'Small Business Management', sub:'Entrepreneurship', lev:'secondary'},
  {title:'Business Administration', sub:'Business', lev:'tertiary'},
  {title:'Movie Making / TV Broadcasting Management', sub:'Film & TV', lev:'tertiary'},
  {title:'Human Resources Management', sub:'HR', lev:'tertiary'},
  {title:'Christian Church Management', sub:'Religious Studies', lev:'tertiary'},
  {title:'Dispute Resolution and Conflict Management', sub:'Law', lev:'tertiary'},
  {title:'Educational Administration', sub:'Education', lev:'tertiary'},
  {title:'Distance Educational Administration', sub:'Education', lev:'tertiary'},
  {title:'Physical Education / Sports Management', sub:'Sports', lev:'tertiary'},
  {title:'Security Management', sub:'Security', lev:'tertiary'},
  {title:'International Development / Management', sub:'Development', lev:'tertiary'},
  {title:'Human Development Management', sub:'Human Development', lev:'tertiary'},
  {title:'Diplomatic Studies/Management', sub:'Diplomacy', lev:'tertiary'},
  {title:'Economic Development / Management', sub:'Economics', lev:'tertiary'},
  {title:'African History/Management', sub:'History', lev:'tertiary'},
  {title:'African American History/ Management', sub:'History', lev:'tertiary'},
  {title:'American History / Management', sub:'History', lev:'tertiary'},
  {title:'American Government /Management', sub:'Political Science', lev:'tertiary'},
  {title:'Show Business Management (Music/Films)', sub:'Entertainment', lev:'tertiary'},
  {title:'A – Alphabet & Animals (Primary)', sub:'English', lev:'primary'},
  {title:'A – Adding Numbers (Primary Math)', sub:'Mathematics', lev:'primary'},
  {title:'B – Basic Reading (Primary)', sub:'English', lev:'primary'},
  {title:'B – Big and Small (Primary Math)', sub:'Mathematics', lev:'primary'},
  {title:'C – Colors and Shapes (Primary)', sub:'Art', lev:'primary'},
  {title:'C – Counting to 20 (Primary Math)', sub:'Mathematics', lev:'primary'},
  {title:'D – Days of the Week', sub:'English', lev:'primary'},
  {title:'E – Everyday Science', sub:'Science', lev:'primary'},
  {title:'F – Fun with Phonics', sub:'English', lev:'primary'},
  {title:'G – Good Manners', sub:'Social Studies', lev:'primary'},
  {title:'H – Healthy Habits', sub:'Health', lev:'primary'},
  {title:'I – Introduction to Music', sub:'Music', lev:'primary'},
  {title:'J – Jumping into Math', sub:'Mathematics', lev:'primary'},
  {title:'K – Knowing Your Body', sub:'Science', lev:'primary'},
  {title:'L – Letters and Words', sub:'English', lev:'primary'},
  {title:'M – My Family', sub:'Social Studies', lev:'primary'},
  {title:'N – Numbers and Patterns', sub:'Mathematics', lev:'primary'},
  {title:'O – Our World', sub:'Geography', lev:'primary'},
  {title:'P – Phonics Fun', sub:'English', lev:'primary'},
  {title:'Q – Question Words', sub:'English', lev:'primary'},
  {title:'R – Rhymes and Songs', sub:'Music', lev:'primary'},
  {title:'S – Seasons and Weather', sub:'Science', lev:'primary'},
  {title:'T – Time and Clocks', sub:'Mathematics', lev:'primary'},
  {title:'U – Under the Sea', sub:'Science', lev:'primary'},
  {title:'V – Vehicles', sub:'General Knowledge', lev:'primary'},
  {title:'W – Writing Practice', sub:'English', lev:'primary'},
  {title:'X – eXploring Nature', sub:'Science', lev:'primary'},
  {title:'Y – Yummy Food', sub:'Health', lev:'primary'},
  {title:'Z – Zoo Animals', sub:'Science', lev:'primary'},
  {title:'A – Algebra I', sub:'Mathematics', lev:'secondary'},
  {title:'B – Biology: Cells', sub:'Biology', lev:'secondary'},
  {title:'C – Chemistry Basics', sub:'Chemistry', lev:'secondary'},
  {title:'D – Data Handling', sub:'Mathematics', lev:'secondary'},
  {title:'E – Earth Science', sub:'Geography', lev:'secondary'},
  {title:'F – French for Beginners', sub:'Languages', lev:'secondary'},
  {title:'G – Geometry', sub:'Mathematics', lev:'secondary'},
  {title:'H – History: Ancient Civilizations', sub:'History', lev:'secondary'},
  {title:'I – Information Technology', sub:'Computer Science', lev:'secondary'},
  {title:'J – Justice and Government', sub:'Social Studies', lev:'secondary'},
  {title:'K – Kinematics', sub:'Physics', lev:'secondary'},
  {title:'L – Literature: Poetry', sub:'English', lev:'secondary'},
  {title:'M – Music Theory', sub:'Music', lev:'secondary'},
  {title:'N – Newtonian Mechanics', sub:'Physics', lev:'secondary'},
  {title:'O – Organic Chemistry Intro', sub:'Chemistry', lev:'secondary'},
  {title:'P – Probability', sub:'Mathematics', lev:'secondary'},
  {title:'Q – Quantum Physics (Intro)', sub:'Physics', lev:'secondary'},
  {title:'R – Reproduction in Plants', sub:'Biology', lev:'secondary'},
  {title:'S – Spanish for Beginners', sub:'Languages', lev:'secondary'},
  {title:'T – Trigonometry', sub:'Mathematics', lev:'secondary'},
  {title:'U – US History', sub:'History', lev:'secondary'},
  {title:'V – Volcanoes and Earthquakes', sub:'Geography', lev:'secondary'},
  {title:'W – World Religions', sub:'Religious Studies', lev:'secondary'},
  {title:'X – eXploring Space', sub:'Astronomy', lev:'secondary'},
  {title:'Y – Youth and Society', sub:'Social Studies', lev:'secondary'},
  {title:'Z – Zoology Basics', sub:'Biology', lev:'secondary'}
];

allCourses.forEach(c => addCourse({title:c.title, subject:c.sub, level:c.lev, description:'Comprehensive course on ' + c.title}));

console.log('✅ All 139 courses seeded with 50‑paragraph lessons!');
