export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  video?: string;
  type?: "video";
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  date: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 0,
    title: "Heart Project",
    description: "A site for helping people cheer up.",
    image: "/Heart.avif",
    technologies: ["React", "Next.js", "TypeScript", "UI/UX Design", "Graphic Design"],
    category: "Web Application",
    liveUrl: "/work/heart",
    githubUrl: "/error",
    date: "2025-01-15",
    featured: true,
  },
  {
    id: 1,
    title: "Sunsoft",
    description: "A coding learning platform providing comprehensive programming education.",
    image: "/Work/sunsoft.avif",  
    technologies: ["React", "Node.js","Tailwind CSS","Framer Motion", "UI/UX Design", "Graphic Design"],
    category: "Web Application",
    liveUrl: "/work/sunsoft",
    githubUrl: "/error",
    date: "2024-12-20",
    featured: true,
  },
  {
    id: 2,
    title: "Transition Website",
    description: "Transition website is a website that is used to transition from one page to another.",
    image: "/powell.avif",
    video: "/Project1.webm",
    type: "video",
    technologies: ["React", "Node.js","Tailwind CSS","Framer Motion"],
    category: "Web Application",
    liveUrl: "/error",
    githubUrl: "/error",
    date: "2024-12-20",
    featured: true,
  },
  {
    id: 3,
    title: "Funky",
    description: "A mood chilling site designed for relaxation and entertainment.",
    image: "/Work/funo.avif",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion","MongoDB","Node.js", "UI/UX Design", "Graphic Design"],
    category: "Website",
    liveUrl: "/work/funky",
    githubUrl: "https://github.com/Hitesh-o7/JobSeek",
    date: "2023-07-05",
    featured: false,
  },
  {
    id: 4,
    title: "Immigration",
    description: "A website for immigration queries and information services.",
    image: "/Work/imi.avif",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "UI/UX Design", "Graphic Design"],
    category: "AI/ML",
    liveUrl: "/work/Imigration",
    githubUrl: "/error",
    date: "2024-03-12",
    featured: true,
  },
  {
    id: 5,
    title: "JobSeek",
    description: "JobSeek is a job portal website.",
    image: "/projects/JobSeek.avif",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion","MongoDB","Node.js"],
    category: "Website",
    liveUrl: "https://github.com/Hitesh-o7/JobSeek",
    githubUrl: "https://github.com/Hitesh-o7/JobSeek",
    date: "2023-07-05",
    featured: false,
  },
  {
    id: 6,
    title: "Readers",
    description: "Readers is site which extract the data from mutiple files extension like yaml, json, csv, xml, etc.",
    image: "/projects/Readers.avif",
    technologies: ["Solidity", "Web3.js", "React", "Ethereum","Tailwind CSS","Framer Motion"],
    category: "Blockchain",
    liveUrl: "https://readers-seven.vercel.app/",
    githubUrl: "https://github.com/Hitesh-o7/Readers",
    date: "2023-12-08",
    featured: false,
  },
  {
    id: 7,
    title: "Crimson Oath",
    description: "Crimson Oath is a 2D Souls-Like game.",
    image: "/Games/MainPage.png",
    technologies: ["Unity", "Blender", "Photoshop"],
    category: "Mobile App",
    liveUrl: "/games/crimson-oath",
    githubUrl: "https://github.com/username/project",
    date: "2025-04-10",
    featured: true,
  },
  {
    id: 8,
    title: "CVE",
    description: "CVE (Common Vulnerabilities and Exposures) is a list of publicly known cybersecurity vulnerabilities.",
    image: "/projects/CVE.avif",
    video: "/projects/CVE.webm",
    type: "video",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    category: "Web Application",
    liveUrl: "https://cve-hazel.vercel.app/",
    githubUrl: "https://github.com/Hitesh-o7/CVE.git",
    date: "2024-11-22",
    featured: true,
  },
];

export const categories = ["All", "Web Application", "Mobile App", "Website", "AI/ML", "Blockchain"] as const;
export const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "Solidity"] as const;

