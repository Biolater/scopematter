import SectionHeader from "@/components/section-header";
import { getProjects } from "@/lib/data/projects";
import ProjectsContent from "@/components/projects/projects-content";
import { Button } from "@heroui/button";
import { PlusIcon } from "lucide-react";
import CreateProjectDialog from "@/components/projects/create-project-dialog";
import EditProjectDialog from "@/components/projects/edit-project-dialog";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Manage all your freelance projects in one organized workspace. Track project scope, client requests, and approved change orders to prevent unpaid work.",
  openGraph: {
    title: "Projects – Freelance Project Management | ScopeMatter",
    description:
      "View and manage all your freelance projects in one place. Keep scopes clear, handle client change requests, and avoid scope creep effortlessly.",
    url: "https://scopematter.xyz/projects",
    siteName: "ScopeMatter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Projects – Freelance Project Management | ScopeMatter",
    description:
      "Stay on top of all your freelance projects, track scope changes, and protect your billable hours with ScopeMatter.",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex flex-col h-full">
      <SectionHeader
        title="Projects"
        description="Manage all your freelance projects in one place."
      >
        <div className="flex items-center gap-2">
          <CreateProjectDialog />
          {projects.length > 0 && (
            <p className="text-sm text-default-600">
              {projects.length} project{projects.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
      </SectionHeader>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-divider rounded-2xl bg-default-50 h-full">
          <div className="p-4 rounded-full bg-default-100 mb-4">
            <PlusIcon className="size-8 text-default-600" />
          </div>
          <h3 className="text-lg font-semibold text-default-600">
            No projects yet
          </h3>
          <p className="text-sm text-default-600 max-w-sm mt-1">
            Create your first project to track scope, requests, and changes all
            in one place.
          </p>
          <div className="mt-6">
            <CreateProjectDialog />
          </div>
        </div>
      ) : (
        <ProjectsContent projects={projects} />
      )}
    </div>
  );
}
