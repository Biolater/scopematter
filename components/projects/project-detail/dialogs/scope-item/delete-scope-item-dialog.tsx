"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { deleteScopeItemAction } from "@/lib/actions/scopeItem.actions";

interface DeleteScopeItemDialogProps {
  deleteItemId: string | null;
  onClose: () => void;
  projectId: string;
}

export default function DeleteScopeItemDialog({
  deleteItemId,
  onClose,
  projectId,
}: DeleteScopeItemDialogProps) {
  const isOpen = !!deleteItemId;

  const { runAction, isPending } = useServerAction<{ id: string; projectId: string }, void>(
    deleteScopeItemAction,
    {
      onSuccess: () => {
        addToast({ title: "Scope item deleted", color: "success" });
        onClose();
      },
      onError: (err) => {
        addToast({
          title: err.message ?? "Failed to delete scope item",
          color: "danger",
        });
      },
    }
  );

  const handleConfirm = async () => {
    if (deleteItemId) {
      await runAction({ id: deleteItemId, projectId });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="sm">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete Scope Item
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this scope item? This action cannot
            be undone.
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
