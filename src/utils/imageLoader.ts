// This function will be used to get image paths for 2D art
// Since we can't dynamically read directories in the browser, 
// we'll maintain a list of images that gets updated when new images are added

export interface ArtworkImage {
  id: string;
  src: string;
  title: string;
  description?: string;
  category?: string;
  year?: string;
  medium?: string;
}

// Add your own images to this array when you upload them to public/2dArt/
export const artworkImages: ArtworkImage[] = [
  {
    id: "my-artwork-1",
    src: "/2dArt/2B.JPG",
    title: "2B",
    description: "A digital fanart of 2B, focusing on lighting, costume details, and rendering inspired by NieR: Automata’s aesthetic.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  },
  {
    id: "my-artwork-2", 
    src: "/2dArt/CamGirl.JPG",
    title: "CamGirl",
    description: "Original cyberpunk-inspired character design exploring futuristic street fashion, layered accessories, and attitude.",
    category: "Character Design",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-3", 
    src: "/2dArt/CyberGirl.PNG",
    title: "CyberGirl",
    description: "A character concept blending sci-fi and modern streetwear, emphasizing neon color palettes and clean rendering.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-4", 
    src: "/2dArt/Makima.JPG",
    title: "Makima",
    description: "Pencil sketch of Makima from Chainsaw Man, focusing on facial expression, posture, and accurate manga-style line work.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-5", 
    src: "/2dArt/MakimaPoster.JPG",
    title: "Makima Poster",
    description: "Poster-style illustration of Makima with bold contrasts and clean composition inspired by official manga covers.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-6", 
    src: "/2dArt/StuntDude.JPG",
    title: "Stunt Dude",
    description: "Energetic character artwork capturing dynamic motion, casual attire, and expressive proportions.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-7", 
    src: "/2dArt/Cute.PNG",
    title: "Cutei",
    description: "A soft-shaded character illustration exploring pastel tones, stylized anatomy, and a warm, inviting vibe.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-8", 
    src: "/2dArt/Stunt.PNG",
    title: "Stunt",
    description: "Stylized character sketch with an emphasis on exaggerated proportions, confident stance, and urban clothing design.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-9", 
    src: "/2dArt/Archer.png",
    title: "Archer",
    description: "A fantasy archer concept inspired by Genshin Impact and World of Warcraft, with ornate armor and layered clothing for storytelling.",
    category: "Character Design",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-10", 
    src: "/2dArt/Smith.jpg",
    title: "Smith",
    description: "Dwarf blacksmith character illustration featuring a strong silhouette, detailed props, and stylization inspired by fantasy RPGs.",
    category: "Character Design",
    year: "2024",
    medium: "Digital"
  }, 
];

export const getArtworkImages = (): ArtworkImage[] => {
  return artworkImages;
};

export const getArtworkByCategory = (category: string): ArtworkImage[] => {
  return artworkImages.filter(img => img.category === category);
};

export const getArtworkCategories = (): string[] => {
  const categories = artworkImages.map(img => img.category).filter(Boolean) as string[];
  return Array.from(new Set(categories));
};
