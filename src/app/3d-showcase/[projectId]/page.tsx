import { notFound } from "next/navigation";
import { getProjectById } from "@/data/glbProjects";
import GLBProjectDetail from "@/components/GLBProjectDetail/GLBProjectDetail";
import Header from "@/components/Header/Header";
import { SmoothCursor } from "@/components/ui/Cursor/smooth-cursor";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <main data-scroll-container>
      <SmoothCursor />
      <Header />
      <GLBProjectDetail project={project} />
    </main>
  );
}

// Generate static params for all projects
export async function generateStaticParams() {
  const { glbProjects } = await import("@/data/glbProjects");
  
  return glbProjects.map((project) => ({
    projectId: project.id,
  }));
} 