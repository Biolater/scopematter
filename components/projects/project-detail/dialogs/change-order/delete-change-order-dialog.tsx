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

import { deleteChangeOrderAction } from "@/lib/actions/changeOrder.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { DeleteChangeOrderSchemaType } from "@/lib/validation/changeOrder.schema";
import { DeleteChangeOrderOutput } from "@/lib/types/changeOrder.types";

type DeleteChangeOrderDialogProps = {
  deleteChangeOrderId: string | null;
  onClose: () => void;
  projectId: string;
};

export default function DeleteChangeOrderDialog({
  deleteChangeOrderId,
  onClose,
  projectId,
}: DeleteChangeOrderDialogProps) {
  const isOpen = !!deleteChangeOrderId;

  const { runAction, isPending } = useServerAction<
    { projectId: string; data: DeleteChangeOrderSchemaType },
    DeleteChangeOrderOutput
  >(deleteChangeOrderAction, {
    onSuccess: () => {
      addToast({ title: "Change order deleted", color: "success" });
      onClose();
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to delete change order",
        color: "danger",
      });
    },
  });

  const handleConfirm = async () => {
    if (!deleteChangeOrderId) return;
    await runAction({ projectId, data: { id: deleteChangeOrderId } });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="sm">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete Change Order
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this change order? This action
            cannot be undone.
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
