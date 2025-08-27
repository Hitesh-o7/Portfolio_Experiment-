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
  // Example entries - replace these with your actual artwork
  // Upload your images to public/2dArt/ folder and update the paths below
  
  {
    id: "my-artwork-1",
    src: "/2dArt/2B.JPG",
    title: "2B",
    description: "Description of your artwork and creative process.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  },
  {
    id: "my-artwork-2", 
    src: "/2dArt/CamGirl.JPG",
    title: "CamGirl",
    description: "Your character design description and inspiration.",
    category: "Character Design",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-3", 
    src: "/2dArt/CyberGirl.PNG",
    title: "CyberGirl",
    description: "Your character design description and inspiration.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-4", 
    src: "/2dArt/Makima.JPG",
    title: "Makima",
    description: "Your character design description and inspiration.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-5", 
    src: "/2dArt/MakimaPoster.JPG",
    title: "Makima Poster",
    description: "Your character design description and inspiration.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-6", 
    src: "/2dArt/StuntDude.JPG",
    title: "Stunt Dude",
    description: "Your character design description and inspiration.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-7", 
    src: "/2dArt/Cute.PNG",
    title: "Cutei",
    description: "Your character design description and inspiration.",
    category: "Digital Painting",
    year: "2024",
    medium: "Digital"
  }, 
  {
    id: "my-artwork-8", 
    src: "/2dArt/Stunt.PNG",
    title: "Stunt",
    description: "Your character design description and inspiration.",
    category: "Digital Painting",
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
