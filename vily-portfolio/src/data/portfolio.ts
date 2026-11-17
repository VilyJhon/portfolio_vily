export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  status: string;
  summary: string;
  objectives: string;
  solution: string;
  contribution: string;
  outcome: string;
  tools: string[];
  liveUrl: string;
  image: string;
  alt: string;
  featuredSpan?: boolean;
}

export interface TechItem {
  id: string;
  name: string;
  category: 'Web Foundations' | 'Browser & APIs' | 'Practice & Workflow';
  role: string;
  description: string;
  projectIds: string[];
}

export interface CapabilityItem {
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  proofProjectId: string;
}

export interface JourneyItem {
  id: string;
  stage: 'Education' | 'Self-Directed' | 'Milestones';
  period: string;
  title: string;
  place: string;
  description: string;
}

export const PROFILE = {
  brand: 'VJ Amen',
  fullName: 'Vily Jhon M. Amen',
  handle: '@fckingj4y',
  location: 'Manila, Philippines',
  university: 'University of Makati',
  email: 'vjamen16@gmail.com',
  portrait: '/assets/aistudio/3680d549-8746-48bf-bd50-d0d81e0ecca6_006979b6.jpg',
  lead: "I'm a student learning to code and build for the web, curious about how digital tools can make everyday life easier for people.",
  quote: 'Technology matters most when it helps people.',
  rotatingRoles: [
    'Student & Aspiring Developer',
    'Web Interface Builder',
    'Frontend Explorer',
    'Problem Solver',
  ],
  socials: [
    {
      label: 'Email',
      value: 'vjamen16@gmail.com',
      href: 'mailto:vjamen16@gmail.com',
    },
    {
      label: 'Facebook',
      value: 'Vily Jhon M Amen',
      href: 'https://www.facebook.com/search/top?q=Vily%20Jhon%20M%20Amen',
    },
    {
      label: 'Instagram',
      value: '@fckingj4y',
      href: 'https://www.instagram.com/fckingj4y/',
    },
  ],
};

export const HIGHLIGHTS = [
  {
    value: 'Student',
    label: 'Academic Path',
    detail: 'Building web foundations at University of Makati',
  },
  {
    value: '03',
    label: 'Live Web Projects',
    detail: 'Café Centígrado, Finora, and Grading Sheet',
  },
  {
    value: '100%',
    label: 'End-to-End Builds',
    detail: 'Designed, coded, and deployed independently',
  },
  {
    value: '03',
    label: 'Core Focus Areas',
    detail: 'HTML & CSS, JavaScript, and Utility Design',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'cafe-centigrado',
    index: '01',
    title: 'Café Centígrado',
    category: 'Hospitality & Ordering Web App',
    year: '2025',
    status: 'Live Site',
    summary:
      'A website for a late-night coffee shop in Sta. Ana, Manila, featuring a drink customizer, add-ons picker, and an interactive pickup order cart.',
    objectives:
      'Present the menu, operating hours (12 NN – 3 AM), and Tejeron Street location clearly while letting customers build a pickup order directly on the page.',
    solution:
      'Structured an atmospheric dark-and-warm landing experience paired with an interactive cart drawer, drink add-on controls, and an embedded Google Map for quick directions.',
    contribution:
      'Designed and built the complete site independently for both desktop and mobile viewports.',
    outcome:
      'A live responsive site with full menu browsing, add-on customization, pickup ordering, and a visit guide.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Google Maps Embed'],
    liveUrl: 'https://cafecentrigado.netlify.app',
    image: '/assets/aistudio/cafe_c661f3ae.webp',
    alt: 'Café Centígrado website preview across laptop and mobile screens',
    featuredSpan: true,
  },
  {
    id: 'finora',
    index: '02',
    title: 'Finora',
    category: 'Personal Finance Dashboard',
    year: '2025',
    status: 'Live App',
    summary:
      'A privacy-first personal finance tracker for logging income and expenses, monitoring budgets, and working toward savings goals directly in the browser.',
    objectives:
      'Make personal finance simple to try without forcing account registration. Every record runs locally in the browser and stays on the user’s device.',
    solution:
      'Crafted an intuitive overview dashboard with category breakdowns, transaction logs, goal progress bars, and bite-sized money lessons backed by localStorage.',
    contribution:
      'Designed and developed the interface layout, state persistence, and responsive views independently.',
    outcome:
      'A working browser-based finance tool with zero server dependencies—data never leaves the user’s device.',
    tools: ['HTML', 'CSS', 'JavaScript', 'localStorage'],
    liveUrl: 'https://jayfinance.netlify.app',
    image: '/assets/aistudio/finora_aa86221f.webp',
    alt: 'Finora personal finance dashboard preview on laptop and mobile',
  },
  {
    id: 'grading-sheet',
    index: '03',
    title: 'Grading Sheet',
    category: 'Academic Utility & GWA Calculator',
    year: '2025',
    status: 'Live App',
    summary:
      'A student grade tracker that computes General Weighted Average (GWA) live as grades are entered, complete with per-Student-ID saved records and a class schedule view.',
    objectives:
      'Replace manual GWA calculations with automatic weighted scoring, customizable midterm and finals weights, and a live "Now & Next" class schedule.',
    solution:
      'Built an interactive academic dashboard tailored to the University of Makati grading basis, integrating Tesseract.js OCR experiments and persistent student ID records.',
    contribution:
      'Designed and built the entire application on my own, including the GWA calculation logic, schedule tracking, and saved storage.',
    outcome:
      'A live academic companion with subject tracking, saved student records, and automated GWA feedback.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Tesseract.js (OCR)', 'localStorage'],
    liveUrl: 'https://jaygrade2.netlify.app/',
    image: '/assets/aistudio/grading_631a5c6a.webp',
    alt: 'Grading Sheet academic dashboard preview on laptop and mobile',
  },
];

export const TECH_STACK: TechItem[] = [
  {
    id: 'html-css',
    name: 'HTML5 & CSS3',
    category: 'Web Foundations',
    role: 'Structure & Responsive Layout',
    description:
      'Semantic document structure, Flexbox and CSS Grid architectures, custom properties, and responsive mobile-first styling.',
    projectIds: ['cafe-centigrado', 'finora', 'grading-sheet'],
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'Web Foundations',
    role: 'Interactive Logic & DOM State',
    description:
      'Client-side cart state, live GWA calculations, form validation, interactive modals, and dynamic filtering without bloat.',
    projectIds: ['cafe-centigrado', 'finora', 'grading-sheet'],
  },
  {
    id: 'local-storage',
    name: 'Web localStorage',
    category: 'Browser & APIs',
    role: 'Local-First Persistence',
    description:
      'Keeping user transactions, goals, student ID records, and theme preferences saved safely on-device without requiring logins.',
    projectIds: ['finora', 'grading-sheet'],
  },
  {
    id: 'tesseract-ocr',
    name: 'Tesseract.js (OCR)',
    category: 'Browser & APIs',
    role: 'In-Browser Text Recognition',
    description:
      'Exploring client-side optical character recognition to read and import grade sheet entries straight from images.',
    projectIds: ['grading-sheet'],
  },
  {
    id: 'google-maps',
    name: 'Google Maps Embed',
    category: 'Browser & APIs',
    role: 'Location & Directions',
    description:
      'Integrating interactive storefront maps and street directions so visitors can locate physical venues effortlessly.',
    projectIds: ['cafe-centigrado'],
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving & Curiosity',
    category: 'Practice & Workflow',
    role: 'Learning by Shipping',
    description:
      'Breaking real student and small-business problems into clear steps, asking questions until concepts click, and shipping live sites.',
    projectIds: ['cafe-centigrado', 'finora', 'grading-sheet'],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    index: '01',
    title: 'Responsive Web Interfaces',
    summary:
      'Structuring clean, accessible HTML and CSS layouts that adapt gracefully from wide desktop monitors down to mobile screens.',
    deliverables: ['Semantic HTML5', 'CSS Grid & Flexbox', 'Mobile-First Breakpoints', 'Dark & Light Themes'],
    proofProjectId: 'cafe-centigrado',
  },
  {
    index: '02',
    title: 'Interactive Browser Logic',
    summary:
      'Writing straightforward JavaScript to power pickup carts, form validation, dynamic filtering, and real-time mathematical calculations.',
    deliverables: ['Cart & Add-On State', 'Live GWA Formulas', 'Modal & Dialog Flows', 'Accessible Validation'],
    proofProjectId: 'grading-sheet',
  },
  {
    index: '03',
    title: 'Local-First Utility Tools',
    summary:
      'Building fast browser utilities with localStorage so users can track budgets or grades immediately with full device privacy.',
    deliverables: ['On-Device Persistence', 'Zero-Account Onboarding', 'Saved Student Profiles', 'Instant Feedback'],
    proofProjectId: 'finora',
  },
  {
    index: '04',
    title: 'Self-Directed Iteration & Teamwork',
    summary:
      'Learning actively through hands-on builds, asking thoughtful questions when exploring new tools, and collaborating clearly.',
    deliverables: ['Clear Communication', 'Active Listening', 'Iterative Polish', 'Netlify Deployment'],
    proofProjectId: 'cafe-centigrado',
  },
];

export const JOURNEY: JourneyItem[] = [
  {
    id: 'umak-student',
    stage: 'Education',
    period: 'Present',
    title: 'Student — University of Makati',
    place: 'Makati / Manila, Philippines',
    description:
      'Currently studying while building a solid foundation in programming fundamentals, web structure, styling, and practical software problem-solving.',
  },
  {
    id: 'self-directed-web',
    stage: 'Self-Directed',
    period: 'Ongoing',
    title: 'Self-Directed Web Development',
    place: 'Independent Practice & Live Builds',
    description:
      'Moving beyond tutorials by designing, coding, and shipping complete projects—from neighborhood coffee shop ordering to personal finance and academic trackers.',
  },
  {
    id: 'three-live-apps',
    stage: 'Milestones',
    period: '2025',
    title: 'Three Live Web Applications Deployed',
    place: 'Café Centígrado · Finora · Grading Sheet',
    description:
      'Published three working web applications on Netlify, each focused on solving a concrete everyday need for local customers, budgeters, and fellow students.',
  },
  {
    id: 'future-certifications',
    stage: 'Milestones',
    period: 'Next',
    title: 'Upcoming Certifications & Collaborations',
    place: 'Open for Learning & Projects',
    description:
      'Actively expanding skills in modern frontend frameworks, clean UI engineering, and collaborative team projects. Real awards and certifications will be added here as they are earned.',
  },
];
