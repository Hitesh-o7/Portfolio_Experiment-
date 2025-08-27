export interface GameProject {
  id: string;
  name: string;
  coverImage: string;
  description: string;
  technologies: string[];
  category: string;
  year: string;
  featured: boolean;
  platforms?: string[];
  playUrl?: string;
  repoUrl?: string;
}

export const gameProjects: GameProject[] = [
  {
    id: "crimson-oath",
    name: "Crimson Oath",
    coverImage: "/Games/MainPage.png",
    description:
      "A dark, atmospheric action-adventure where swift combat and haunting exploration shape your fate in a cursed realm.",
    technologies: ["Unity", "Blender", "Photoshop"],
    category: "Souls-Like",
    year: "2025",
    featured: true,
    platforms: ["HTML5"],
    playUrl: "https://crazzy-o7.itch.io/crimson-oath",
    repoUrl: "#",
  }, 
];


