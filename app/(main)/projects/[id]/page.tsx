import { getProject } from "@/lib/data/projects";
import ProjectDetailView from "@/components/projects/project-detail-view";
import ProjectPageClient from "@/components/projects/project-detail/project-page-client";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { id } = await params;
    const project = await getProject({ id });
    return (
      <div className="flex flex-col gap-6">
        <ProjectPageClient project={project} />
        <ProjectDetailView project={project} />
      </div>
    );
  } catch (e: any) {
    if (e.status === 404) {
      notFound(); // Next.js 404 page
    }
    throw e; // anything else → error.tsx
  }
}
