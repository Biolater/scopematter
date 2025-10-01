"use client";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@heroui/modal";
import { useState } from "react";
import { ArrowLeft, Share, Trash2 } from "lucide-react";
import { addToast } from "@heroui/toast";
import DeleteProjectDialog from "@/components/projects/delete-project-dialog";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { deleteProjectAction } from "@/lib/actions/project.actions";
import { DeleteProjectSchemaType } from "@/lib/validation/project.schema";
import { ShareLinkDialog } from "@/components/projects/share-link/share-link-dialog";

type ProjectPageClientProps = {
  projectId: string;
};

export default function ProjectPageClient({ projectId }: ProjectPageClientProps) {
  const router = useRouter();
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
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
      addToast({ title: err.message ?? "Failed to delete project", color: "danger" });
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tooltip content="Back">
            <Button isIconOnly variant="light" onPress={() => router.back()} aria-label="Go back">
              <ArrowLeft className="size-5" />
            </Button>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip content="Share project">
            <Button
              variant="flat"
              color="primary"
              onPress={onShareOpen}
              startContent={<Share className="size-4" />}
            >
              Share
            </Button>
          </Tooltip>

          <Tooltip content="Delete project">
            <Button
              color="danger"
              variant="light"
              onPress={() => setDeleteProjectId(projectId)}
              startContent={<Trash2 className="size-4" />}
            >
              Delete
            </Button>
          </Tooltip>
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
        projectId={projectId}
      />
    </div>
  );
}


