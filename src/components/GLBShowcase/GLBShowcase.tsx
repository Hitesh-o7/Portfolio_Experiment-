"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import TransitionLink from "@/components/Transition/TransitionLink";
import Image from "next/image";
import { Search, ExternalLink, Github, X, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GLBViewer from "@/components/GLBViewer/GLBViewer";
import { glbProjects, GLBProject } from "@/data/glbProjects";

// Get unique categories and techniques from projects
const categories = ["All", ...Array.from(new Set(glbProjects.map(p => p.category)))];
const techniques = Array.from(new Set(glbProjects.flatMap(p => p.techniques)));

export default function GLBShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [selectedTechniques, setSelectedTechniques] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [centeredProjectId, setCenteredProjectId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredProjects = useMemo(() => {
    return glbProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techniques.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategories.includes("All") || selectedCategories.includes(project.category);
      const matchesTechnique =
        selectedTechniques.length === 0 || selectedTechniques.some((tech) => project.techniques.includes(tech));
      const matchesFeatured = !showFeaturedOnly || project.featured;

      return matchesSearch && matchesCategory && matchesTechnique && matchesFeatured;
    });
  }, [searchTerm, selectedCategories, selectedTechniques, showFeaturedOnly]);

  // Set up Intersection Observer for mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const projectId = entry.target.getAttribute("data-project-id") || "";

            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
              setCenteredProjectId(projectId);
            } else if (centeredProjectId === projectId && !entry.isIntersecting) {
              setCenteredProjectId(null);
            }
          })
        },
        {
          threshold: [0.6, 0.8],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      // Observe all project cards
      const projectCards = document.querySelectorAll("[data-project-id]");
      projectCards.forEach((card) => {
        if (observerRef.current) {
          observerRef.current.observe(card);
        }
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredProjects, centeredProjectId]);

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev.filter((c) => c !== "All"), category];
        
        return newCategories.length === 0 ? ["All"] : newCategories;
      });
    }
  };

  const toggleTechnique = (technique: string) => {
    setSelectedTechniques((prev) =>
      prev.includes(technique) ? prev.filter((t) => t !== technique) : [...prev, technique]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories(["All"]);
    setSelectedTechniques([]);
    setShowFeaturedOnly(false);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mt-[20vh] mb-12">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">3D Showcase</h1>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search 3D projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-gray-900 transition-all duration-200 text-base"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  selectedCategories.includes(category)
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Technique Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {techniques.map((tech) => (
              <button
                key={tech}
                onClick={() => toggleTechnique(tech)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  selectedTechniques.includes(tech)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Featured Filter and Clear Button */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                showFeaturedOnly ? "bg-yellow-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              ★ Featured Only
            </button>

            {(selectedCategories.length > 1 ||
              !selectedCategories.includes("All") ||
              selectedTechniques.length > 0 ||
              showFeaturedOnly ||
              searchTerm) && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-sm font-medium rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {filteredProjects.length > 0 ? (
          <div className="space-y-20">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group flex items-end gap-8 md:gap-8">
                {/* Project Preview Card */}
                <div
                  className="flex-1 relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500"
                  data-project-id={project.id}
                >
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={project.previewImage}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                      priority={project.featured}
                    />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                          ★ Featured
                        </div>
                      </div>
                    )}

                    {/* Desktop Hover Overlay */}
                    <div className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-3">
                        <TransitionLink
                          href={`/3d-showcase/${project.id}`}
                          className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
                        >
                          <Eye className="w-5 h-5 text-gray-700" />
                        </TransitionLink>
                      </div>
                    </div>

                    {/* Mobile Auto-Reveal Overlay */}
                    <div
                      className={`md:hidden absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent transition-all duration-500 ${
                        centeredProjectId === project.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="p-4 text-right text-white">
                        <h3 className="text-xl font-light mb-2 leading-tight">{project.name}</h3>
                        <p className="text-sm text-gray-200 mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                        <div className="flex flex-wrap justify-end gap-1 mb-2">
                          {project.techniques.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded backdrop-blur-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <TransitionLink
                              href={`/3d-showcase/${project.id}`}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                              <Eye className="w-4 h-4 text-white" />
                            </TransitionLink>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-300">{project.year}</p>
                            <p className="text-xs text-gray-400">{project.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop Project Details - Hidden on Mobile */}
                <div className="hidden md:block w-60 lg:w-80 text-right pb-8">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-2 lg:mb-3 group-hover:text-gray-600 transition-colors duration-200 leading-tight">
                    {project.name}
                  </h3>
                  <p className="text-sm md:text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-end gap-1 mb-2 lg:mb-3">
                    {project.techniques.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap justify-end gap-1 mb-2 lg:mb-3">
                    {project.materialsUsed.slice(0, 3).map((material) => (
                      <span key={material} className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        {material}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs md:text-xs lg:text-sm text-gray-400">
                    {project.year} • {project.category} • Blender {project.blenderVersion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">No 3D projects found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search terms or filters.</p>
            <Button
              onClick={clearAllFilters}
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
          <h2 className="text-3xl font-light text-gray-900 mb-4">Like what you see?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Each 3D model represents hours of creative work in Blender. I'm always exploring new techniques and styles.
          </p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full">Get In Touch</Button>
        </div>
      </div>
    </div>
  );
} 