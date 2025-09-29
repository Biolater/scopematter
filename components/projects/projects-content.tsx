"use client";

import { GetProjectsOutput, Project } from "@/lib/types/project.types";
import ProjectCard from "./project-card";
import { motion } from "framer-motion";
import { listContainer, listItemRise } from "@/lib/animations";
import { useState } from "react";
import DeleteProjectDialog from "./delete-project-dialog";
import { deleteProjectAction } from "@/lib/actions/project.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { DeleteProjectSchemaType } from "@/lib/validation/project.schema";
import { addToast } from "@heroui/toast";
import EditProjectDialog from "./edit-project-dialog";
import { ShareLinkDialog } from "./share-link/share-link-dialog";
const ProjectsContent = ({ projects }: { projects: GetProjectsOutput }) => {
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [editProjectId, setEditProjectId] = useState<string | null>(null);
  const [shareProject, setShareProject] = useState<Project | null>(null);
  const { isPending, runAction, state } = useServerAction<
    DeleteProjectSchemaType,
    void
  >(deleteProjectAction, {
    onSuccess: () => {
      addToast({
        title: "Project deleted successfully",
        color: "success",
      });
      setDeleteProjectId(null);
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to delete project",
        color: "danger",
      });
      setDeleteProjectId(null);
    },
  });
  const handleDeleteProject = async () => {
    if (!deleteProjectId) return;
    await runAction({ id: deleteProjectId });
  };
  return (
    <>
      <motion.div
        variants={listContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={listItemRise}>
            <ProjectCard
              project={project}
              onDelete={setDeleteProjectId}
              onEdit={setEditProjectId}
              onShare={setShareProject}
            />
          </motion.div>
        ))}
      </motion.div>
      <EditProjectDialog
        isOpen={!!editProjectId}
        onOpenChange={(open) => setEditProjectId(open ? editProjectId : null)}
        project={
          projects.find((project) => project.id === editProjectId) as Project
        }
      />
      <DeleteProjectDialog
        deleteProjectId={deleteProjectId}
        onClose={() => setDeleteProjectId(null)}
        onConfirm={handleDeleteProject}
        isPending={isPending}
      />
      <ShareLinkDialog
        isOpen={!!shareProject}
        onClose={() => setShareProject(null)}
        projectId={shareProject?.id ?? ""}
      />
    </>
  );
};

export default ProjectsContent;
