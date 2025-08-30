import {
  SiAstro,
  SiAuth0,
  SiBootstrap,
  SiCss3,
  SiDart,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFirebase,
  SiFlutter,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiJupyter,
  SiKotlin,
  SiNextdotjs,
  SiNextui,
  SiNodedotjs,
  SiNotion,
  SiNpm,
  SiObsidian,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { GiPolarBear } from "react-icons/gi";
import { TbApi, TbSql } from "react-icons/tb";

type Skill = {
  label: string;
  type: "languages" | "frameworks" | "databases" | "tools";
};

const skills: Skill[] = [
  //languages
  { label: "Java", type: "languages" },
  { label: "Kotlin", type: "languages" },
  { label: "Dart", type: "languages" },
  { label: "Python", type: "languages" },
  { label: "Javascript", type: "languages" },
  { label: "Typescript", type: "languages" },

  //frameworks
  { label: "Flutter", type: "frameworks" },
  { label: "Jetpack Compose", type: "frameworks" },
  { label: "Spring boot", type: "frameworks" },
  { label: "NodeJS", type: "frameworks" },

  //databases
  { label: "SQL", type: "databases" },
  { label: "MongoDb", type: "databases" },
  { label: "Firebase", type: "databases" },

  //tools
  { label: "Git", type: "tools" },
  { label: "Swagger", type: "tools" },
  { label: "Postman", type: "tools" },
];

export default skills;

export const techStackCategiries = {
  "Programming Languages:": [
    "Java",
    "Kotlin",
    "Dart",
    "Python",
    "JavaScript",
    "TypeScript",
  ],
  "Frontend Frameworks and Libraries:": [
    "Next.js",
    "AstroJS",
    "React",
    "Flutter",
    "Zustand",
  ],
  "UI Libraries and Frameworks:": ["Next UI", "Shadcn-UI", "Framer Motion"],
  "Markup and Styling:": ["HTML", "CSS"],
  "CSS Frameworks:": ["Bootstrap", "Tailwind CSS"],
  "Backend Frameworks:": ["FastAPI", "Node.js"],
  "Databases and BaaS:": ["PostgreSQL", "MongoDb"],
  "Authentication:": ["Better-auth"],
  "Development and DevOps Tools:": ["Git", "GitHub", "npm", "Docker"],
  "CMS:": [],
  "Tools:": [],
  "Project Management:": ["Notion", "Obsidian"],
};
export const techStackIcons = [
  { label: "HTML", icon: SiHtml5 },
  { label: "CSS", icon: SiCss3 },
  { label: "Bootstrap", icon: SiBootstrap },
  { label: "Tailwind CSS", icon: SiTailwindcss },
  { label: "JavaScript", icon: SiJavascript },
  { label: "TypeScript", icon: SiTypescript },
  { label: "React", icon: SiReact },
  { label: "Zustand", icon: GiPolarBear },
  { label: "Next.js", icon: SiNextdotjs },
  { label: "Next UI", icon: SiNextui },
  { label: "Shadcn-UI", icon: SiShadcnui },
  { label: "Framer Motion", icon: SiFramer },
  { label: "Git", icon: SiGit },
  { label: "GitHub", icon: SiGithub },
  { label: "GitLab", icon: SiGitlab },
  { label: "npm", icon: SiNpm },
  { label: "Docker", icon: SiDocker },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "API", icon: TbApi },
  { label: "Firebase", icon: SiFirebase },
  { label: "Supabase", icon: SiSupabase },
  { label: "Next-Auth", icon: SiAuth0 },
  { label: "PHP", icon: SiPhp },
  { label: "MySQL", icon: TbSql },
  { label: "PostgreSQL", icon: SiPostgresql },
  { label: "Figma", icon: SiFigma },
  { label: "Notion", icon: SiNotion },
  { label: "Obsidian", icon: SiObsidian },
  { label: "FastAPI", icon: SiFastapi },
  { label: "Jupyter", icon: SiJupyter },
  { label: "Kotlin", icon: SiKotlin },
  { label: "Dart", icon: SiDart },
  { label: "Flutter", icon: SiFlutter },
  { label: "Python", icon: SiPython },
  { label: "AstroJS", icon: SiAstro },
];
