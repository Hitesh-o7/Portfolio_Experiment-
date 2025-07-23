"use client";

import { GLBProject } from "@/data/glbProjects";
import GLBViewer from "@/components/GLBViewer/GLBViewer";
import { Calendar, Tag, Wrench, Lightbulb, Cpu, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface GLBProjectDetailProps {
  project: GLBProject;
}

export default function GLBProjectDetail({ project }: GLBProjectDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto pt-20 px-6 pb-6">
          <Link 
            href="/3d-showcase" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Showcase
          </Link>
        </div>
      </div>

      {/* Project Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
              {project.name}
            </h1>
            <div className="flex items-center justify-center gap-6 text-lg text-gray-600 mb-8">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {project.year}
              </span>
              <span className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                {project.category}
              </span>
              {project.featured && (
                <span className="bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-medium text-sm">
                  ★ Featured
                </span>
              )}
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* GLB Viewer - Large */}
      <div className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <GLBViewer 
              glbFile={project.glbFile} 
              className="w-full h-[600px] md:h-[700px]"
              showControls={true}
              autoRotate={false}
              scale={1}
            />
            <div className="p-6 bg-gray-50 text-center border-t border-gray-200">
              <p className="text-gray-600">
                🖱️ Drag to rotate • 🔍 Scroll to zoom • 📱 Touch to interact
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column */}
            <div className="space-y-8">
              {/* Inspiration */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="flex items-center gap-3 text-2xl font-light text-gray-900 mb-6">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  Inspiration
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.inspiration}
                </p>
              </div>

              {/* Creation Process */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="flex items-center gap-3 text-2xl font-light text-gray-900 mb-6">
                  <Wrench className="w-6 h-6 text-blue-500" />
                  Creation Process
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {project.creationProcess}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Materials Used */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="flex items-center gap-3 text-2xl font-light text-gray-900 mb-6">
                  <Tag className="w-6 h-6 text-green-500" />
                  Materials Used
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.materialsUsed.map((material, index) => (
                    <span
                      key={index}
                      className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-lg font-medium border border-green-200"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Techniques */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="flex items-center gap-3 text-2xl font-light text-gray-900 mb-6">
                  <Cpu className="w-6 h-6 text-purple-500" />
                  Techniques
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.techniques.map((technique, index) => (
                    <span
                      key={index}
                      className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-lg font-medium border border-purple-200"
                    >
                      {technique}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Information */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Technical Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-500 text-sm mb-1">Blender Version</p>
                    <p className="text-gray-900 font-semibold text-xl">{project.blenderVersion}</p>
                  </div>
                  {project.renderTime && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-500 text-sm mb-1 flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        Render Time
                      </p>
                      <p className="text-gray-900 font-semibold text-xl">{project.renderTime}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 