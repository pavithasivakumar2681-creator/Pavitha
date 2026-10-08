import gardenCupImg from '../images/GardenCup.png';
import udaanMithraImg from '../images/UdaanMithra.png';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  liveLabel?: string;
  githubUrl: string;
  image: string;
  tint: 'pink' | 'blue';
}

export interface ExperienceInternship {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface HackathonEntry {
  title: string;
  project: string;
  details: string;
}

export interface SkillCategory {
  category: string;
  tint: 'pink' | 'blue';
  skills: string[];
}

export interface TechnicalSkillGroup {
  title: string;
  skills: string[];
}

export interface TechnicalSkillCard {
  id: string;
  groups: TechnicalSkillGroup[];
}

export const PROJECTS: Project[] = [
  {
    id: 'garden-cup',
    number: '01',
    title: 'Garden Cup',
    subtitle: 'Café Ordering Web Application',
    description:
      'Built a responsive, multi-section café website in React, recreating a real-world café design with reusable components for the header, hero carousel, menu, shop, events, blog and footer.Implemented a cart sidebar with separate order flows, item counters and unique item IDs using React state.',
    tags: ['React', 'JavaScript', 'CSS', 'HTML'],
    liveUrl: 'https://gardencup.netlify.app',
    liveLabel: 'Netlify Demo',
    githubUrl: 'https://github.com/pavithasivakumar2681-creator',
    image: gardenCupImg,
    tint: 'pink',
  },
  {
    id: 'udaanmithra',
    number: '02',
    title: 'UdaanMithra',
    subtitle: 'Offline-First Multilingual Learning Platform (Smart India Hackathon 2025)',
    description:
      'An offline-first, multilingual education platform designed to bridge the rural digital divide in low-connectivity regions. Built a highly responsive user experience using React and JavaScript, integrated with a lightweight Supabase sync layer to ensure offline data preservation. Features automated synchronization protocols that update student progress analytics the moment a network connection is re-established.',
    tags: ['React', 'Javascript', 'Supabase'],
    liveUrl: 'https://udaanmithrahome.demo.app',
    liveLabel: 'MVP Demo',
    githubUrl: 'https://github.com/pavithasivakumar2681-creator',
    image: udaanMithraImg,
    tint: 'blue',
  },
];

export const INTERNSHIP_EXPERIENCE: ExperienceInternship = {
  role: 'Junior Software Developer Intern',
  company: 'VIMIX Technologies',
  period: 'Aug 2026 - Sep 2026',
  bullets: [
    'Built and refined React-based user interfaces, implementing UI/UX designs and fixing bugs to improve workflows.',
    'Wrote, tested and debugged code for assigned modules; took part in code reviews and team discussions.',
    'Applied GSAP to create interactive, animated web experiences.',
  ],
};

export const CERTIFICATION_EXPERIENCE = {
  title: 'Cloud Computing',
  issuer: 'NPTEL (IIT Kharagpur)',
  credential: 'Elite + Topper (top 2%), 90% score',
  period: 'Jan–Apr 2026',
};

export const LANGUAGE_TRAINING = {
  title: 'Japanese language training',
  institution: 'iTokyo',
  status: 'In progress',
  target: 'JLPT N5 scheduled for Dec 2026',
};

export const HACKATHONS: HackathonEntry[] = [
  {
    title: 'Smart India Hackathon 2026',
    project: 'CrimeNet, Team Block Guard, PS 26189',
    details:
      'Engineered an AI-powered Criminal Network Analysis System within a 6-member team for the National Level finals. Developed algorithms to ingest, parse, and unify highly fragmented crime records (FIRs, CDRs, and financial data). Transformed unstructured data points into an interactive, dynamic network graph, allowing investigators to instantly map illicit connections and hidden node hubs.',
  },
  {
    title: 'Smart India Hackathon 2025',
    project: 'UdaanMithra',
    details: 'Qualified for the selection stage',
  },
];

export const EDUCATION_DEGREE = {
  degree: 'B.E. Computer Science and Engineering',
  institution: 'Hindusthan College of Engineering and Technology, Coimbatore',
  period: '2024 – 2028',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    tint: 'pink',
    skills: ['Java', 'Python', 'JavaScript'],
  },
  {
    category: 'Frontend',
    tint: 'blue',
    skills: ['HTML', 'CSS', 'React', 'Redux', 'Tailwind CSS'],
  },
  {
    category: 'Web & Animation',
    tint: 'pink',
    skills: ['DOM', 'GSAP'],
  },
  {
    category: 'Backend',
    tint: 'blue',
    skills: ['Spring Boot (Java)'],
  },
  {
    category: 'Databases',
    tint: 'pink',
    skills: ['MySQL', 'Firebase'],
  },
  {
    category: 'Tools & Deployment',
    tint: 'blue',
    skills: ['Git', 'GitHub', 'Netlify', 'Vercel'],
  },
];

export const TECHNICAL_SKILL_CARDS: TechnicalSkillCard[] = [
  {
    id: 'card-1',
    groups: [
      {
        title: 'LANGUAGES',
        skills: ['Java', 'Python', 'JavaScript'],
      },
      {
        title: 'DATABASES',
        skills: ['MySQL', 'Firebase'],
      },
    ],
  },
  {
    id: 'card-2',
    groups: [
      {
        title: 'FRONTEND',
        skills: ['HTML', 'CSS', 'React', 'Redux', 'Tailwind CSS'],
      },
      {
        title: 'BACKEND',
        skills: ['Spring Boot (Java)'],
      },
    ],
  },
  {
    id: 'card-3',
    groups: [
      {
        title: 'WEB & ANIMATION',
        skills: ['DOM', 'GSAP'],
      },
      {
        title: 'TOOLS & DEPLOYMENT',
        skills: ['Git', 'GitHub', 'Netlify', 'Vercel'],
      },
    ],
  },
  {
    id: 'card-4',
    groups: [
      {
        title: 'AI TOOLS',
        skills: ['Cursor', 'Antigravity', 'Claude', 'Lovable'],
      },
    ],
  },
];

export const ABOUT_HEADLINE =
  'From first idea to finished product. Real problems, clean code, and websites designed to be remembered.';

export const ABOUT_PARAGRAPH =
  "I'm a Computer Science and Engineering student focused on generative AI and AI engineering. I love building software from the ground up, and I'm especially drawn to visually rich websites that go beyond the standard template. I learn fastest by building, and I'm preparing for software roles in Japan and India.";

export const ABOUT_STATEMENT = ABOUT_HEADLINE;

export const ABOUT_TEXT = ABOUT_PARAGRAPH;

export const CONTACT_INFO = {
  email: 'pavithasivakumar2681@gmail.com',
  linkedin: ' https://www.linkedin.com/in/pavitha-sivakumar-0ab3a51ba/',
  github: 'https://github.com/pavithasivakumar2681-creator',
  status: 'Open to roles in Japan & India',
};
