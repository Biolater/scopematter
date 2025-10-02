"use client";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";
import { ArrowLeft, PencilLine, Share, Trash2 } from "lucide-react";
import { addToast } from "@heroui/toast";
import DeleteProjectDialog from "@/components/projects/delete-project-dialog";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { deleteProjectAction } from "@/lib/actions/project.actions";
import { DeleteProjectSchemaType } from "@/lib/validation/project.schema";
import { ShareLinkDialog } from "@/components/projects/share-link/share-link-dialog";
import EditProjectDialog from "../edit-project-dialog";
import type { ProjectDetail } from "@/lib/types/project.types";

type ProjectPageClientProps = {
  project: ProjectDetail;
};

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  const router = useRouter();
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const {
    isOpen: isShareOpen,
    onOpen: onShareOpen,
    onOpenChange: onShareOpenChange,
  } = useDisclosure();

  const { isPending, runAction } = useServerAction<
    DeleteProjectSchemaType,
    void
  >(deleteProjectAction, {
    onSuccess: () => {
      addToast({ title: "Project deleted successfully", color: "success" });
      router.replace("/projects");
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to delete project",
        color: "danger",
      });
    },
  });

  return (
    <div className="flex flex-col gap-6 py-2 px-4 rounded-full bg-content1/10 border border-default-200 backdrop-blur-md sticky top-6 z-30">
      <div className="flex items-center justify-between">
        {/* Back button */}
        <div className="flex items-center gap-2">
          {/* Mobile */}
          <div className="md:hidden">
            <Tooltip content="Back">
              <Button
                isIconOnly
                variant="light"
                onPress={() => router.back()}
                aria-label="Go back"
              >
                <ArrowLeft className="size-5" />
              </Button>
            </Tooltip>
          </div>
          {/* Desktop */}
          <div className="hidden md:flex">
            <Button
              startContent={<ArrowLeft className="size-5" />}
              variant="light"
              onPress={() => router.back()}
            >
              Go Back
            </Button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Share */}
          <div className="md:hidden">
            <Tooltip content="Share">
              <Button
                isIconOnly
                variant="flat"
                color="primary"
                onPress={onShareOpen}
              >
                <Share className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="hidden md:flex">
            <Button
              variant="flat"
              color="primary"
              onPress={onShareOpen}
              startContent={<Share className="size-4" />}
            >
              Share
            </Button>
          </div>

          {/* Edit */}
          <div className="md:hidden">
            <Tooltip content="Edit">
              <Button
                isIconOnly
                color="primary"
                variant="light"
                onPress={() => setIsEditOpen(true)}
              >
                <PencilLine className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="hidden md:flex">
            <Button
              color="primary"
              variant="light"
              startContent={<PencilLine className="size-4" />}
              onPress={() => setIsEditOpen(true)}
            >
              Edit Project
            </Button>
          </div>

          {/* Delete */}
          <div className="md:hidden">
            <Tooltip content="Delete">
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onPress={() => setDeleteProjectId(project.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </Tooltip>
          </div>
          <div className="hidden md:flex">
            <Button
              color="danger"
              variant="light"
              startContent={<Trash2 className="size-4" />}
              onPress={() => setDeleteProjectId(project.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>

      <DeleteProjectDialog
        deleteProjectId={deleteProjectId}
        onClose={() => setDeleteProjectId(null)}
        onConfirm={async (id) => {
          await runAction({ id });
        }}
        isPending={isPending}
      />

      <ShareLinkDialog
        isOpen={isShareOpen}
        onOpenChange={onShareOpenChange}
        projectId={project.id}
      />
      <EditProjectDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        project={project}
      />
    </div>
  );
}
