import SectionHeader from "@/components/section-header";
import { getProjects } from "@/lib/data/projects";
import ProjectsContent from "@/components/projects/projects-content";
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import CreateProjectDialog from "@/components/projects/create-project-dialog";
import EditProjectDialog from "@/components/projects/edit-project-dialog";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <SectionHeader
        title="Projects"
        description="Manage all your freelance projects in one place."
      >
        <div className="flex items-center gap-2">
          <CreateProjectDialog />
          <p className="text-sm text-default-600">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </p>
        </div>
      </SectionHeader>
      <ProjectsContent projects={projects} />
    </>
  );
}
