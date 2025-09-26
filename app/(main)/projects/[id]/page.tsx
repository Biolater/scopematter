import { getProject } from "@/lib/data/projects";
import ProjectDetailView from "@/components/projects/project-detail-view";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const { id } = await params;
    const project = await getProject({ id });
    return <ProjectDetailView project={project} />;
  } catch (e: any) {
    if (e.status === 404) {
      notFound(); // Next.js 404 page
    }
    throw e; // anything else → error.tsx
  }
}
