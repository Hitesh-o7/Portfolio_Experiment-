"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import TransitionLink from "@/components/Transition/TransitionLink"
import { performTransitionAndNavigate } from "@/utils/transition"
import { Search, ExternalLink, Github, X } from "lucide-react"
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor"
import Contact from "@/components/Contact/Contact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Sample project data - replace with your actual projects
const projects = [
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
    id: 8
    ,
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
]

const categories = ["All", "Web Application", "Mobile App", "Website", "AI/ML", "Blockchain"]
const technologies = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", "Solidity"]

export default function Work() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"])
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [centeredProjectId, setCenteredProjectId] = useState<number | null>(null)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Preload images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projects.map((project) => {
        return new Promise((resolve) => {
          if (project.image) {
            const img = new window.Image()
            img.onload = () => {
              setImagesLoaded(prev => new Set(prev).add(project.id))
              resolve(true)
            }
            img.onerror = () => resolve(false)
            img.src = project.image
          } else {
            resolve(true)
          }
        })
      })
      
      await Promise.all(imagePromises)
    }

    preloadImages()
  }, [])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategories.includes("All") || selectedCategories.includes(project.category)
      const matchesTechnology =
        selectedTechnologies.length === 0 || selectedTechnologies.some((tech) => project.technologies.includes(tech))
      const matchesFeatured = !showFeaturedOnly || project.featured

      return matchesSearch && matchesCategory && matchesTechnology && matchesFeatured
    })
  }, [searchTerm, selectedCategories, selectedTechnologies, showFeaturedOnly])

  // Set up Intersection Observer for mobile
  useEffect(() => {
    if (typeof window === "undefined") return

    const isMobile = window.innerWidth < 768

    if (isMobile) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const projectId = Number.parseInt(entry.target.getAttribute("data-project-id") || "0")

            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
              setCenteredProjectId(projectId)
            } else if (centeredProjectId === projectId && !entry.isIntersecting) {
              setCenteredProjectId(null)
            }
          })
        },
        {
          threshold: [0.6, 0.8],
          rootMargin: "-20% 0px -20% 0px", // Only trigger when in center 60% of viewport
        },
      )

      // Observe all project cards
      const projectCards = document.querySelectorAll("[data-project-id]")
      projectCards.forEach((card) => {
        if (observerRef.current) {
          observerRef.current.observe(card)
        }
      })
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [filteredProjects, centeredProjectId])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      if (!isMobile) {
        setCenteredProjectId(null)
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"])
    } else {
      setSelectedCategories((prev) => {
        const newCategories = prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev.filter((c) => c !== "All"), category]
        return newCategories.length === 0 ? ["All"] : newCategories
      })
    }
  }

  const toggleTechnology = (technology: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology) ? prev.filter((t) => t !== technology) : [...prev, technology],
    )
  }

  const clearAllFilters = () => {
    setSelectedCategories(["All"])
    setSelectedTechnologies([])
    setShowFeaturedOnly(false)
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-white">
      <SmoothCursor /> 
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mt-[20vh] mb-12">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-4 tracking-tight">Projects</h1>
             
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-gray-900 transition-all duration-200 text-base"
              />
            </div>
          </div>

          {/* Filters */}
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

          {/* Results Count */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 mb-20">
        {filteredProjects.length > 0 ? (
          <div className="space-y-20">
            {filteredProjects.map((project) => {
              const isExternalUrl = project.liveUrl.startsWith('http://') || project.liveUrl.startsWith('https://');
              
              return (
              <div key={project.id} className="group flex items-end gap-8 md:gap-8">
                {/* Project Image Card */}
                {isExternalUrl ? (
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 max-w-2xl relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl backdrop-blur-sm border border-gray-100/50 transition-all duration-500 cursor-pointer"
                    data-project-id={project.id}
                  >
                    <div className={project.type === "video" ? "relative" : "aspect-[16/9] relative"}>
                      {project.type === "video" && project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          {/* Loading skeleton */}
                          {!imagesLoaded.has(project.id) && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            </div>
                          )}
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            priority={project.featured} // Priority loading for featured projects
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={85}
                            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                              imagesLoaded.has(project.id) 
                                ? "opacity-100" 
                                : "opacity-0"
                            }`}
                            onLoad={() => {
                              setImagesLoaded(prev => new Set(prev).add(project.id))
                            }}
                          />
                        </div>
                      )}

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                            ★ Featured
                          </div>
                        </div>
                      )}

                      {/* Desktop Hover Overlay */}
                      <div 
                        className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                      >
                        <div className="flex gap-3">
                          <div
                            onClick={async (e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (isExternalUrl) {
                                window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                              } else {
                                await performTransitionAndNavigate(router, project.liveUrl)
                              }
                            }}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-700" />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                            }}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
                          >
                            <Github className="w-5 h-5 text-gray-700" />
                          </div>
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
                        <div className="p-4 text-right text-white relative">
                          <h3 className="text-xl font-light mb-2 leading-tight">{project.title}</h3>
                          <p className="text-sm text-gray-200 leading-relaxed">
                            {project.description.length > 60 
                              ? `${project.description.substring(0, 60)}...` 
                              : project.description}
                          </p>
                          {/* Action buttons - absolute positioned left bottom */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <div
                              onClick={async (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (isExternalUrl) {
                                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                                } else {
                                  await performTransitionAndNavigate(router, project.liveUrl)
                                }
                              }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4 text-white" />
                            </div>
                            <div
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                              }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                            >
                              <Github className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          
                          {/* Hidden technologies */}
                          <div className="hidden flex-wrap justify-end gap-1 mb-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded backdrop-blur-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {/* Hidden metadata */}
                          <div className="hidden text-right">
                            <p className="text-xs text-gray-300">
                              {new Date(project.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}
                            </p>
                            <p className="text-xs text-gray-400">{project.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <TransitionLink
                    href={project.liveUrl}
                    className="flex-1 max-w-2xl relative overflow-hidden bg-white rounded-xl shadow-lg hover:shadow-2xl backdrop-blur-sm border border-gray-100/50 transition-all duration-500 cursor-pointer block"
                    data-project-id={project.id}
                  >
                    <div className={project.type === "video" ? "relative" : "aspect-[16/9] relative"}>
                      {project.type === "video" && project.video ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="relative w-full h-full">
                          {/* Loading skeleton */}
                          {!imagesLoaded.has(project.id) && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                            </div>
                          )}
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            priority={project.featured} // Priority loading for featured projects
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            quality={85}
                            className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                              imagesLoaded.has(project.id) 
                                ? "opacity-100" 
                                : "opacity-0"
                            }`}
                            onLoad={() => {
                              setImagesLoaded(prev => new Set(prev).add(project.id))
                            }}
                          />
                        </div>
                      )}

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
                            ★ Featured
                          </div>
                        </div>
                      )}

                      {/* Desktop Hover Overlay */}
                      <div 
                        className="hidden md:flex absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                      >
                        <div className="flex gap-3">
                          <div
                            onClick={async (e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              if (isExternalUrl) {
                                window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                              } else {
                                await performTransitionAndNavigate(router, project.liveUrl)
                              }
                            }}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
                          >
                            <ExternalLink className="w-5 h-5 text-gray-700" />
                          </div>
                          <div
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                            }}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
                          >
                            <Github className="w-5 h-5 text-gray-700" />
                          </div>
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
                        <div className="p-4 text-right text-white relative">
                          <h3 className="text-xl font-light mb-2 leading-tight">{project.title}</h3>
                          <p className="text-sm text-gray-200 leading-relaxed">
                            {project.description.length > 60 
                              ? `${project.description.substring(0, 60)}...` 
                              : project.description}
                          </p>
                          {/* Action buttons - absolute positioned left bottom */}
                          <div className="absolute bottom-4 left-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <div
                              onClick={async (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                if (isExternalUrl) {
                                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                                } else {
                                  await performTransitionAndNavigate(router, project.liveUrl)
                                }
                              }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                            >
                              <ExternalLink className="w-4 h-4 text-white" />
                            </div>
                            <div
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                window.open(project.githubUrl, '_blank', 'noopener,noreferrer')
                              }}
                              className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
                            >
                              <Github className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          
                          {/* Hidden technologies */}
                          <div className="hidden flex-wrap justify-end gap-1 mb-2">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded backdrop-blur-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          {/* Hidden metadata */}
                          <div className="hidden text-right">
                            <p className="text-xs text-gray-300">
                              {new Date(project.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                              })}
                            </p>
                            <p className="text-xs text-gray-400">{project.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TransitionLink>
                )}

                {/* Desktop Project Title - Hidden on Mobile */}
                <div className="hidden md:block w-60 lg:w-80 text-right pb-8 ml-auto">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 mb-2 lg:mb-3 group-hover:text-gray-600 transition-colors duration-200 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-sm lg:text-base text-gray-500 mb-3 lg:mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-end gap-1 mb-2 lg:mb-3">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs md:text-xs lg:text-sm text-gray-400">
                    {new Date(project.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}{" "}
                    • {project.category}
                  </p>
                </div>
              </div>
            )})}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">No projects found</h3>
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
      <Contact 
      backgroundColor="rgba(255,255,255,1)" 
      textColor="rgba(0,0,0,0.9)"
      theme="light"
    />
    </div>
  )
}
