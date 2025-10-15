import { getProject } from "@/lib/data/projects";
import ProjectDetailView from "@/components/projects/project-detail-view";
import ProjectPageClient from "@/components/projects/project-detail/project-page-client";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const project = await getProject({ id });

    const projectName = project?.name ?? "Project";
    const clientName = project?.client?.name
      ? ` for ${project.client.name}`
      : "";
    const desc =
      project?.description ??
      "View detailed scope, requests, and change orders for this project.";

    return {
      title: `${projectName}${clientName}`,
      description: `${desc} – Track scope, requests, and change orders easily with ScopeMatter.`,
      openGraph: {
        title: `${projectName}${clientName} | ScopeMatter`,
        description:
          "Monitor project scope, manage client change requests, and keep work clearly defined with ScopeMatter.",
        url: `https://scopematter.xyz/projects/${id}`,
        siteName: "ScopeMatter",
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary",
        title: `${projectName}${clientName} | ScopeMatter`,
        description:
          "Track project progress, scope items, and approved change requests in one place with ScopeMatter.",
      },
    };
  } catch {
    // fallback metadata for 404 or failed fetch
    return {
      title: "Project Not Found",
      description:
        "The requested project could not be found. Return to your dashboard to view all projects.",
    };
  }
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
