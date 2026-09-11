// Everything on this page is safe to edit. Change a value here and it updates
// everywhere on the site. You should not need to touch any other file to
// correct a name, an email address, or a class listing.

export const site = {
  name: 'Helping Hands',
  tagline: 'Academic Outreach for the Younger Generations',
  // One or two sentences. Used on the home page and in search results.
  blurb:
    'A volunteer-run nonprofit offering free math and science classes over Zoom. ' +
    'We have taught more than 300 students since 2020.',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story/' },
  { label: 'The Team', href: '/team/' },
  { label: 'Our Classes', href: '/classes/' },
  { label: 'Practice', href: '/practice/' },
  { label: 'Support Us', href: '/support/' },
  { label: 'Contact', href: '/contact/' },
];

// ---------------------------------------------------------------------------
// Home page copy. This is the text carried over from the old WordPress site.
// Edit it here; the page itself has no hard-coded words in it.
// ---------------------------------------------------------------------------
export const home = {
  // Background photo behind the hero heading.
  heroImage: '/hero.png',
  heroAlt: 'A chalkboard covered in maths formulas',

  // Photo shown beside the Welcome text. Drop a file in public/ and
  // point this at it, e.g. '/welcome.jpg'.
  welcomeImage: '/welcome.jpg',
  welcomeAlt: 'Handwritten statistics notes and a scientific calculator on a lined notepad',

  heading: 'We Are Helping Hands',
  subheading:
    'Offering free math and science classes for the youngest generation of students.',
  ctaLabel: 'Learn More',
  ctaHref: '/classes/',

  welcomeHeading: 'Welcome!',
  welcome: [
    'Our organization is dedicated to imparting knowledge in the vast field of mathematics and science to younger students. We recognize that not all students have access to equal educational opportunities, and therefore remain committed to offering free math classes to all students, regardless of experience, educational level, or background. We have designed a strong curriculum which allows our students to learn at an individualized pace while still making progress from class session to session.',
    'We offer classes for different grade levels, from 6th grade to 12th grade. Our program is designed to reach middle and high school students. We encourage those who want reinforcement to their school\u2019s math and science curriculum, as well as students who would like to go beyond what their school\u2019s syllabus confines them to.',
  ],
  emphasis:
    'Helping Hands seeks to provide education that is accessible to all, with the growing importance of STEM in our everyday lives and society.',
  signature:
    'An introductory message from Kushal Chatterjee and Anurag Chatterjee, the founders of Helping Hands',
};

// Support Us page
export const support = {
  // Photo beside "Volunteer as an instructor"
  image: '/support.png',
  imageAlt: 'TODO: describe this photo for people using a screen reader',

  // Photo beside "Spread the word" — drop a file in public/ and point at it
  spreadImage: '/spread.png',
  spreadAlt: 'A megaphone with the words spread the word',
};

// Turns a first name into the anchor used to link a class to its teacher,
// e.g. 'Anurag' becomes /team/#anurag. Used on both the classes and team pages.
export function personId(firstName) {
  return String(firstName).trim().toLowerCase();
}

// Shared curriculum folder, linked as a button on the Classes page.
export const curriculum = {
  label: 'Helping Hands Curriculum',
  href: 'https://drive.google.com/drive/folders/1FA9d_Mnipe5kvC3GBwYMkovJaY8ejiep?usp=drive_link',
};

// Classes currently offered. Add, remove, or reorder freely.
// `level` groups them on the classes page and the home timetable.
export const classes = [
  { name: 'Pre-Algebra',  level: 'Middle school', instructor: 'Anurag' },
  { name: 'Algebra 1',    level: 'Middle school', instructor: 'Anurag' },
  { name: 'Physics',      level: 'High school',   instructor: 'Anurag' },
  { name: 'Biology',      level: 'High school',   instructor: 'Kushal' },
  { name: 'Chemistry',    level: 'High school',   instructor: 'Kushal' },
  { name: 'Calculus',     level: 'High school',   instructor: 'Kushal' },
  // TODO: confirm this list and add elementary classes if you run them.
];

export const team = [
  {
    name: 'Anurag Chatterjee',
    role: 'Founder',
    detail: 'Math and computer science program founder. Lead instructor for computer science, pre-algebra, algebra 1, and physics.',
    bio:
      'Anurag Chatterjee is a first-year undergraduate student at the University of ' +
      'California, Santa Cruz, where he studies computer science. Anurag enjoys ' +
      'teaching children math, computer science, and physics.',
    email: 'anurag.chatterjee2026@gmail.com',
    photo: '/team-anurag.jpg',
  },
  {
    name: 'Kushal Chatterjee',
    role: 'Co-Founder',
    detail: 'Science program founder. Lead instructor for biology, chemistry, and calculus.',
    bio:
      'Kushal Chatterjee is a first-year medical student at the Northwestern University ' +
      'Feinberg School of Medicine in Chicago. Kushal graduated from the University of ' +
      'California, Los Angeles in 2025, where he received a B.S. degree in Neuroscience. ' +
      'Kushal enjoys teaching younger children about the subjects of chemistry, biology, ' +
      'physics, and math.',
    email: 'kushal.chatterjee2022@gmail.com',
    photo: '/team-kushal.jpg',
  }
];

// Numbers shown on the home page. Update them when they change, and only
// claim what you can back up.
export const stats = [
  { value: '300+', label: 'students taught' },
  { value: '6',    label: 'years running' },
  { value: 'Free', label: 'every class, always' },
];

export const contact = {
  email: 'anurag.chatterjee2026@gmail.com',

  // Photo beside the form
  image: '/contact.jpg',
  imageAlt: 'Scrabble tiles arranged to spell the word contact',

  // Paste your Formspree endpoint here to make the contact form send mail.
  // Sign up free at formspree.io, create a form, copy its URL.
  formEndpoint: 'https://formspree.io/f/xrpgjkvo',
};

// ---------------------------------------------------------------------------
// Our Story page
// ---------------------------------------------------------------------------
export const story = {
  bannerImage: '/story.jpg',
  bannerAlt: 'Two hands reaching toward each other against a sunset sky',

  // Photo beside the "Why we keep teaching" section.
  // Drop a file in public/ and point this at it, e.g. '/teaching.jpg'.
  teachingImage: '/teaching.png',
  teachingAlt: 'Students in a classroom raising their hands as a teacher speaks',
};

// Real words from real people. Only add a quote you actually received, and
// ask permission before publishing someone's name.
export const testimonials = [
  {
    quote:
      'Kudos to Kushal and Anurag for this initiative to prep kids for the upcoming school year. ' +
      'Kushal and Anurag have all the traits to be a great educator \u2014 patience, knowledge, ' +
      'creative ways of teaching. My kids really enjoyed the program and we will look forward to ' +
      'keeping in touch.',
    attribution: 'Manjit Singh',
    role: 'Parent',
  },
  {
    quote:
      'In this course, I got a better understanding of Math. Some material covered was what I have ' +
      'already learned but I got to revisit it and get more information on it. I thought the class ' +
      'was very beneficial and inspirational. I hope to come to more Helping Hands\u2019 organization ' +
      'courses.',
    attribution: 'Student',
    role: '',
  },
];