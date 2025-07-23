export interface GLBProject {
  id: string;
  name: string;
  glbFile: string;
  previewImage: string; // Add preview image field
  description: string;
  inspiration: string;
  creationProcess: string;
  materialsUsed: string[];
  blenderVersion: string;
  renderTime?: string;
  techniques: string[];
  category: string;
  year: string;
  featured: boolean;
}

export const glbProjects: GLBProject[] = [
  {
    id: "card-main",
    name: "Card Main Design",
    glbFile: "/cardmain.glb",
    previewImage: "/previews/cardmain-preview.svg",
    description: "A sophisticated 3D card design showcasing modern visual aesthetics with clean lines and premium materials.",
    inspiration: "Inspired by modern minimalist design principles and premium credit card aesthetics. The goal was to create something that feels both digital and tangible.",
    creationProcess: "Started with basic geometric shapes in Blender, refined the proportions, added bevels for realism, and applied material properties for the final render.",
    materialsUsed: ["Metallic Surface", "Matte Plastic", "Glass Elements", "Emission Materials"],
    blenderVersion: "4.0",
    renderTime: "45 minutes",
    techniques: ["Subdivision Modeling", "Material Blending", "UV Mapping", "Lighting Setup"],
    category: "Product Design",
    year: "2024",
    featured: true
  },
  {
    id: "card-simple",
    name: "Simple Card",
    glbFile: "/card.glb",
    previewImage: "/previews/card-preview.svg",
    description: "A clean and minimalist card design focusing on simplicity and functionality.",
    inspiration: "Drawn from Scandinavian design philosophy - less is more. Focused on essential elements without unnecessary complexity.",
    creationProcess: "Used basic extrusion and edge loops to create the card shape, then focused on clean topology and optimized geometry for web display.",
    materialsUsed: ["Matte Finish", "Subtle Metallic Accents"],
    blenderVersion: "4.0",
    renderTime: "20 minutes", 
    techniques: ["Basic Modeling", "Clean Topology", "Web Optimization"],
    category: "UI/UX Design",
    year: "2024",
    featured: false
  },
  {
    id: "bobxx-character",
    name: "Bobxx Character",
    glbFile: "/bobxx.glb",
    previewImage: "/previews/bobxx-preview.svg",
    description: "A stylized character model featuring modern design principles with clean geometry and expressive features.",
    inspiration: "Inspired by contemporary character design and stylized animation. Aimed to create a character that feels both approachable and memorable with distinct personality traits.",
    creationProcess: "Started with basic human proportions as reference, then stylized the features to create a unique character. Used subdivision modeling for smooth surfaces and careful attention to edge flow for potential animation.",
    materialsUsed: ["Skin Shader", "Fabric Materials", "Hair Strands", "Eye Reflections"],
    blenderVersion: "4.0",
    renderTime: "2 hours 30 minutes",
    techniques: ["Character Modeling", "Retopology", "UV Unwrapping", "Facial Features", "Proportional Editing"],
    category: "Character Design",
    year: "2024",
    featured: true
  },
  {
    id: "fishermans-hut",
    name: "Low Poly Fisherman's Hut",
    glbFile: "/low_poly_fishermans_hut.glb",
    previewImage: "/previews/fishermans-hut-preview.svg",
    description: "A charming low-poly coastal dwelling that captures the essence of seaside living with optimized geometry for game environments.",
    inspiration: "Drawn from coastal architecture and the peaceful life of fishermen. Wanted to evoke a sense of rustic charm and maritime heritage while keeping the polygon count game-ready.",
    creationProcess: "Focused on efficient modeling techniques to maintain the low-poly aesthetic. Every edge serves a purpose - created the basic structure first, then added details like weathering and coastal elements.",
    materialsUsed: ["Wood Textures", "Stone Foundation", "Weathered Metal", "Coastal Elements"],
    blenderVersion: "4.0", 
    renderTime: "1 hour 45 minutes",
    techniques: ["Low Poly Modeling", "Efficient Topology", "Game Optimization", "Texture Baking", "Environmental Design"],
    category: "Environment Design",
    year: "2024",
    featured: false
  },
  {
    id: "snowy-hut",
    name: "Snowy Wooden Hut",
    glbFile: "/snowy_wooden_hut.glb",
    previewImage: "/previews/snowy-hut-preview.svg",
    description: "A cozy winter cabin nestled in snow, showcasing atmospheric lighting and seasonal environmental storytelling.",
    inspiration: "Inspired by Scandinavian winter cabins and the peaceful solitude of snowy landscapes. Wanted to create a sense of warmth and comfort contrasted against the cold environment.",
    creationProcess: "Built the cabin structure with attention to realistic wood construction details. Added snow accumulation using particle systems and displacement. Carefully balanced the lighting to create that warm, inviting glow.",
    materialsUsed: ["Aged Wood", "Snow Particles", "Warm Interior Lighting", "Ice Formations", "Cabin Materials"],
    blenderVersion: "4.0",
    renderTime: "3 hours 15 minutes", 
    techniques: ["Architectural Modeling", "Particle Systems", "Atmospheric Lighting", "Winter Effects", "Scene Composition"],
    category: "Environment Design", 
    year: "2024",
    featured: true
  }
];

export const getProjectById = (id: string): GLBProject | undefined => {
  return glbProjects.find(project => project.id === id);
};

export const getFeaturedProjects = (): GLBProject[] => {
  return glbProjects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string): GLBProject[] => {
  return glbProjects.filter(project => project.category === category);
}; 