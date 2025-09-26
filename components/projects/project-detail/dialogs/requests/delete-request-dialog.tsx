"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";

import { deleteRequestAction } from "@/lib/actions/request.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { DeleteRequestSchemaType } from "@/lib/validation/request.schema";

type DeleteRequestDialogProps = {
  deleteRequestId: string | null;
  onClose: () => void;
  projectId: string;
};

export default function DeleteRequestDialog({
  deleteRequestId,
  onClose,
  projectId,
}: DeleteRequestDialogProps) {
  const isOpen = !!deleteRequestId;

  const { runAction, isPending } = useServerAction<
    { projectId: string; data: DeleteRequestSchemaType },
    void
  >(deleteRequestAction, {
    onSuccess: () => {
      addToast({ title: "Request deleted", color: "success" });
      onClose();
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to delete request",
        color: "danger",
      });
    },
  });

  const handleConfirm = async () => {
    if (!deleteRequestId) return;
    await runAction({ projectId, data: { id: deleteRequestId } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="sm">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete Request
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this request? This action cannot be
            undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose} isDisabled={isPending}>
            Cancel
          </Button>
          <Button
            color="danger"
            onPress={handleConfirm}
            isLoading={isPending}
            isDisabled={isPending}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
