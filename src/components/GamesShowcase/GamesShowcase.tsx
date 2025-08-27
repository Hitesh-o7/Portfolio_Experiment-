"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import TransitionLink from "@/components/Transition/TransitionLink";
import { Search, X, Eye, ExternalLink, Github } from "lucide-react";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StarBorder } from "@/components/ui/star-border";
import Contact from "@/components/Contact/Contact";
import { gameProjects } from "@/data/gameProjects";

const categories = ["All", ...Array.from(new Set(gameProjects.map((p) => p.category)))];
const technologies = Array.from(new Set(gameProjects.flatMap((p) => p.technologies)));

export default function GamesShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [centeredProjectId, setCenteredProjectId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const filteredProjects = useMemo(() => {
    return gameProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategories.includes("All") || selectedCategories.includes(project.category);
      const matchesTech =
        selectedTechnologies.length === 0 || selectedTechnologies.some((tech) => project.technologies.includes(tech));
      const matchesFeatured = !showFeaturedOnly || project.featured;

      return matchesSearch && matchesCategory && matchesTech && matchesFeatured;
    });
  }, [searchTerm, selectedCategories, selectedTechnologies, showFeaturedOnly]);

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
          });
        },
        { threshold: [0.6, 0.8], rootMargin: "-20% 0px -20% 0px" }
      );

      const projectCards = document.querySelectorAll("[data-project-id]");
      projectCards.forEach((card) => {
        observerRef.current?.observe(card);
      });
    }

    return () => observerRef.current?.disconnect();
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

  const toggleTechnology = (tech: string) => {
    setSelectedTechnologies((prev) => (prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]));
  };

  const clearAllFilters = () => {
    setSelectedCategories(["All"]);
    setSelectedTechnologies([]);
    setShowFeaturedOnly(false);
    setSearchTerm("");
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <SmoothCursor />
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mt-[20vh] mb-12">
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">Games</h1>
            </div>

            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-gray-900 transition-all duration-200 text-base"
                />
              </div>
            </div>

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

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTechnology(tech)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    selectedTechnologies.includes(tech)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>

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
                selectedTechnologies.length > 0 ||
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

            <div className="text-center mt-6">
              <p className="text-gray-500 text-sm">
                {filteredProjects.length} {filteredProjects.length === 1 ? "game" : "games"}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {filteredProjects.length > 0 ? (
            <div className="space-y-20">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group flex items-end gap-8 md:gap-8">
                  <div
                    className="flex-1 relative overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500"
                    data-project-id={project.id}
                  >
                    <div className="aspect-[16/9] relative">
                      <Image
                        src={project.coverImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                        priority={project.featured}
                      />

                      {project.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                            ★ Featured
                          </div>
                        </div>
                      )}

                      <div className="hidden md:flex  absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-3">
                          <StarBorder
                            as={TransitionLink}
                            href={`/games/${project.id}`}
                            className="transition-all duration-300 hover:scale-105"
                            color="rgba(59, 130, 246, 0.8)"
                            speed="4s"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </StarBorder>
                          {project.playUrl && (
                            <StarBorder
                              as="a"
                              href={project.playUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-all duration-300 hover:scale-105"
                              color="rgba(34, 197, 94, 0.8)"
                              speed="5s"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Play
                            </StarBorder>
                          )}
                          {project.repoUrl && (
                            <StarBorder
                              as="a"
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="transition-all duration-300 hover:scale-105"
                              color="rgba(156, 163, 175, 0.8)"
                              speed="6s"
                            >
                              <Github className="w-4 h-4 mr-2" />
                              Code
                            </StarBorder>
                          )}
                        </div>
                      </div>

                      <div
                        className={`md:hidden absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent transition-all duration-500 ${
                          centeredProjectId === project.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                      >
                        <div className="p-4 text-right text-white">
                          <h3 className="text-xl font-light mb-2 leading-tight">{project.name}</h3>
                          <p className="text-sm text-gray-200 mb-3 leading-relaxed line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap justify-end gap-1 mb-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded backdrop-blur-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <StarBorder
                                as={TransitionLink}
                                href={`/games/${project.id}`}
                                className="text-xs py-2 px-3 transition-all duration-300 hover:scale-105"
                                color="rgba(255, 255, 255, 0.6)"
                                speed="4s"
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </StarBorder>
                              {project.playUrl && (
                                <StarBorder
                                  as="a"
                                  href={project.playUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs py-2 px-3 transition-all duration-300 hover:scale-105"
                                  color="rgba(34, 197, 94, 0.6)"
                                  speed="5s"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Play
                                </StarBorder>
                              )}
                              {project.repoUrl && (
                                <StarBorder
                                  as="a"
                                  href={project.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs py-2 px-3 transition-all duration-300 hover:scale-105"
                                  color="rgba(156, 163, 175, 0.6)"
                                  speed="6s"
                                >
                                  <Github className="w-3 h-3 mr-1" />
                                  Code
                                </StarBorder>
                              )}
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

                  <div className="hidden md:block w-60 lg:w-80 text-right pb-8">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-2 lg:mb-3 group-hover:text-gray-600 transition-colors duration-200 leading-tight">
                      {project.name}
                    </h3>
                    <p className="text-sm md:text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap justify-end gap-1 mb-2 lg:mb-3">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-end gap-1 mb-2 lg:mb-3">
                      {(project.platforms ?? []).slice(0, 3).map((platform) => (
                        <span key={platform} className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                          {platform}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs md:text-xs lg:text-sm text-gray-400">
                      {project.year} • {project.category}
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
              <h3 className="text-xl font-light text-gray-900 mb-2">No games found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search terms or filters.</p>
              <Button onClick={clearAllFilters} variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Contact backgroundColor="rgb(255, 255, 255)" textColor="rgb(0, 0, 0)" theme="light" />
    </>
  );
}


