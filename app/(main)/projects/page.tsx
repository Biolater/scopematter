import SectionHeader from "@/components/section-header";
import { getProjects } from "@/lib/data/projects";
import ProjectsContent from "@/components/projects/projects-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <SectionHeader
        title="Projects"
        description="Manage all your freelance projects in one place."
      >
        <p className="text-sm text-default-600">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>
      </SectionHeader>
      <ProjectsContent projects={projects} />
    </>
  );
}
