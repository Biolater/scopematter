"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { TriangleAlert } from "lucide-react";

export default function DeletePaymentLinkDialog({
  slug,
  open,
  onOpenChange,
  onConfirm,
}: {
  slug: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}) {
  const [submitting, setSubmitting] = useState(false);

  const onDelete = async () => {
    try {
      setSubmitting(true);
      await onConfirm();
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      size="md"
      backdrop="blur"
      scrollBehavior="inside"
      hideCloseButton={submitting}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <TriangleAlert className="size-5 shrink-0 text-danger" />
              Delete payment link
            </ModalHeader>

            <ModalBody className="space-y-3">
              <div className="text-sm text-foreground-600">
                You’re about to permanently remove this payment link. This
                action cannot be undone.
              </div>

              <div className="rounded-xl bg-content2 p-3 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">Slug:</span>
                  <code className="rounded-md bg-content3 px-2 py-0.5 text-xs">
                    {slug ?? "-"}
                  </code>
                  <Chip size="sm" variant="flat">
                    Public page: /p/{slug}
                  </Chip>
                </div>
              </div>

              <div className="rounded-md border border-danger-200 bg-danger-50 px-3 py-2 text-xs text-danger-700">
                Deleting will permanently remove this link and make the public
                page inaccessible.
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="flat"
                onPress={() => onOpenChange(false)}
                isDisabled={submitting}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                onPress={onDelete}
                isLoading={submitting}
                isDisabled={submitting}
              >
                Delete permanently
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
