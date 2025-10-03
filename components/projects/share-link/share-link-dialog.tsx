"use client";

import { shareLinkQueries } from "@/lib/data/queries/share-link.queries";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { useRef, useState } from "react";

import { ShareLinkItem } from "./share-link-item";
import { ShareLinkSkeletonList } from "./share-link-skeleton";
import CreateLinkForm from "./create-link-form";

type ShareLinkDialogProps = {
  projectId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ShareLinkDialog({
  projectId,
  isOpen,
  onOpenChange,
}: ShareLinkDialogProps) {
  const [pickerOpen, setPickerOpen] = useState(false); // track if datepicker is open
  const popoverContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = shareLinkQueries.use(
    { projectId },
    {
      enabled: isOpen,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      retry: 1,
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      backdrop="blur"
      isDismissable={!pickerOpen}
      isKeyboardDismissDisabled={pickerOpen}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Share Links</ModalHeader>

            <ModalBody className="flex flex-col gap-6">
              {/* Create link form */}
              {/* Container for portalizing popovers inside the modal to prevent outside dismiss */}
              <div ref={popoverContainerRef} />
              <CreateLinkForm
                onPickerOpenChange={setPickerOpen}
                popoverContainer={popoverContainerRef.current ?? undefined}
                projectId={projectId}
              />
              {/* Links list */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-default-600">
                  Existing Links
                </span>

                {isLoading && <ShareLinkSkeletonList count={5} />}

                {error && (
                  <p className="text-danger text-sm">
                    Failed to load share links.
                  </p>
                )}

                {data && data.length === 0 && (
                  <p className="text-default-500 text-sm text-center">
                    No share links created yet.
                  </p>
                )}

                {data && data.length > 0 && (
                  <ul className="flex flex-col gap-4">
                    {data.map((link) => (
                      <ShareLinkItem key={link.id} link={link} />
                    ))}
                  </ul>
                )}
              </div>
            </ModalBody>

            <ModalFooter>
              <Button variant="light" color="danger" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
