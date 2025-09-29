"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";

interface DeleteProjectModalProps {
  deleteProjectId: string | null;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void> | void;
  isPending: boolean;
}

export default function DeleteProjectDialog({
  deleteProjectId,
  onClose,
  onConfirm,
  isPending,
}: DeleteProjectModalProps) {
  const isOpen = !!deleteProjectId;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="sm">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Delete Project
        </ModalHeader>
        <ModalBody>
          <p>
            Are you sure you want to delete this project? This action cannot be
            undone.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button isDisabled={isPending} variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button
            color="danger"
            isLoading={isPending}
            isDisabled={isPending}
            onPress={async () => {
              if (deleteProjectId) await onConfirm(deleteProjectId);
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
