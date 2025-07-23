"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, Grid, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { artworkImages, getArtworkCategories, ArtworkImage } from "@/utils/imageLoader";

interface ArtCardProps {
  artwork: ArtworkImage;
  onClick: () => void;
}

function ArtCard({ artwork, onClick }: ArtCardProps) {
  return (
    <div 
      className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative">
        <Image
          src={artwork.src}
          alt={artwork.title}
          width={300}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ aspectRatio: 'auto' }}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-lg mb-1">{artwork.title}</h3>
            {artwork.description && (
              <p className="text-gray-200 text-sm mb-2 line-clamp-2">{artwork.description}</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {artwork.category && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    {artwork.category}
                  </span>
                )}
                {artwork.medium && (
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                    {artwork.medium}
                  </span>
                )}
              </div>
              {artwork.year && (
                <span className="text-white text-xs">{artwork.year}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ArtModalProps {
  artwork: ArtworkImage | null;
  onClose: () => void;
}

function ArtModal({ artwork, onClose }: ArtModalProps) {
  if (!artwork) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">
            <Image
              src={artwork.src}
              alt={artwork.title}
              width={800}
              height={600}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '80vh' }}
            />
          </div>
          
          <div className="lg:w-80 p-6 bg-gray-50">
            <h2 className="text-2xl font-light text-gray-900 mb-4">{artwork.title}</h2>
            
            {artwork.description && (
              <p className="text-gray-600 leading-relaxed mb-4">{artwork.description}</p>
            )}
            
            <div className="space-y-3">
              {artwork.category && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Category:</span>
                  <span className="ml-2 text-gray-900">{artwork.category}</span>
                </div>
              )}
              
              {artwork.medium && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Medium:</span>
                  <span className="ml-2 text-gray-900">{artwork.medium}</span>
                </div>
              )}
              
              {artwork.year && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Year:</span>
                  <span className="ml-2 text-gray-900">{artwork.year}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArtShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkImage | null>(null);

  const categories = ["All", ...getArtworkCategories()];

  const filteredArtwork = useMemo(() => {
    return artworkImages.filter((artwork) => {
      const matchesSearch =
        artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (artwork.description && artwork.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (artwork.category && artwork.category.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === "All" || artwork.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mt-[20vh] mb-12">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">2D Art Gallery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my collection of digital artwork, illustrations, and creative expressions
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search artwork..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-gray-900 transition-all duration-200 text-base"
              />
            </div>
          </div>

          {/* Category Filters */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Clear Filters */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="flex justify-center">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear Filters
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              {filteredArtwork.length} {filteredArtwork.length === 1 ? "artwork" : "artworks"}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {filteredArtwork.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredArtwork.map((artwork) => (
              <div key={artwork.id} className="break-inside-avoid">
                <ArtCard
                  artwork={artwork}
                  onClick={() => setSelectedArtwork(artwork)}
                />
              </div>
            ))}
          </div>
        ) : artworkImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">No artwork uploaded yet</h3>
            <p className="text-gray-500 mb-6">Upload your 2D artwork to the public/2d-art folder and add them to the imageLoader.ts file.</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto text-left">
              <h4 className="font-medium text-yellow-800 mb-2">How to add artwork:</h4>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Upload your images to <code className="bg-yellow-100 px-1 rounded">public/2d-art/</code></li>
                <li>2. Add image details to <code className="bg-yellow-100 px-1 rounded">src/utils/imageLoader.ts</code></li>
                <li>3. Your artwork will appear here automatically!</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">No artwork found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or filters.</p>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Love what you see?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Each piece represents my artistic journey and creative exploration. I&apos;m always experimenting with new styles and techniques.
          </p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full">Get In Touch</Button>
        </div>
      </div>

      {/* Modal */}
      <ArtModal artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </div>
  );
} 