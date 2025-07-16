import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Harshal",
  lastName: "Patil",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full Stack Developer",
  avatar: "/images/avatar.jpg",
  email: "harshalpatilself@gmail.com",
  location: "India/Maharashtra/Nashik", // Updated location
  languages: ["English", "Hindi", "Marathi"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Want to work together or collab on a project?</>,
  description: (
    <>
      I'm always open to new opportunities, collaborations, or interesting
      projects. If you'd like to connect, discuss an idea, or work together,
      feel free to reach out!
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/harshalself",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/harshal-patil-534502259/",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/harshal_patil.mp4?igsh=MTRtZXk1NGRhdDNqMQ%3D%3D&utm_source=qr",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Bridging Code, Creativity & Intelligence</>,
  subline: (
    <>
      I'm Harshal, building web experiences and
      <br />
      automations powered by AI.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm Harshal Patil, a B.Tech AI & Data Science student at KKWIEER,
        passionate about building smart, user-focused web applications. I blend
        full-stack development, AI, and automation to create impactful
        solutions. A hackathon winner and student leader, I thrive where
        innovation meets creativity.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Avhad Enterprises",
        timeframe: "June 2025 - Present",
        role: "Software Developer Intern",
        achievements: [
          <>
            Had hands-on experience with React.js, Node.js, Express.js, Git and
            PostgreSQL for building full-stack web applications.
          </>,
          <>Creating AI Chatbot using Vecrel AI SDK and Nextjs</>,
        ],
        images: [
          // optional: leave the array empty if you don't want to display images
        ],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "K.K.W.I.E.E.R, Nashik",
        description: <>Btech in Artificial Intelligence and Data Science.</>,
      },
      {
        name: "K.T.H.M, Nashik",
        description: <>Higher Secondary Education.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    languagesAndFrameworks: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "React.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Next.js",
      "Vercel AI SDK",
    ],
    databases: ["MongoDB", "PostgreSQL", "Firebase", "Supabase"],
    toolsAndPlatforms: [
      "Git",
      "GitHub",
      "Vercel",
      "Render",
      "Google Cloud",
      "Google Colab",
      "Visual Studio Code (VS Code)",
      "Postman",
      "Cursor AI Editor",
      "Lovable Dev",
      "PowerBI",
      "n8n",
    ],
    designAndMedia: ["Canva", "Lightroom", "CapCut", "Figma"],
  },
  softSkills: {
    coreSkills: [
      "Communication",
      "Teamwork",
      "Leadership",
      "Adaptability",
      "Problem Solving",
      "Time Management",
      "Creativity",
      "Ideation",
      "Decision Making",
      "Quick Learner",
    ],
    projectAndPeopleSkills: [
      "Project Management",
      "Team Collaboration",
      "Public Speaking",
      "Content Creation & Video Editing",
    ],
    passionAndInterests: [
      "Photography",
      "Videography",
      "Lightroom (editing)",
      "CapCut (video editing)",
      "Canva (design)",
    ],
  },
};

const coCurricular = {
  path: "/co-curricular",
  label: "Co-curricular",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new co-curricular posts by adding a new .mdx file to app/co-curricular/posts
  // All posts will be listed on the /co-curricular route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const extraCurricular = {
  path: "/extra-curricular",
  label: "Extra-curricular",
  title: `Photo extra-curricular – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/extra-curricular/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/extra-curricular/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/extra-curricular/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/extra-curricular/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/extra-curricular/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/extra-curricular/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/extra-curricular/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/extra-curricular/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export {
  person,
  social,
  newsletter,
  home,
  about,
  coCurricular,
  work,
  extraCurricular,
};
