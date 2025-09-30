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
import { Spinner } from "@heroui/spinner";
import { Tooltip } from "@heroui/tooltip";
import { Link2, Eye, Calendar, Trash2, Shield } from "lucide-react";
import { ShareLinkItem } from "./share-link-item";

type ShareLinkDialogProps = {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
};

export function ShareLinkDialog({
  projectId,
  isOpen,
  onClose,
}: ShareLinkDialogProps) {
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
      onClose={onClose}
      size="lg"
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>Share Links</ModalHeader>
        <ModalBody>
          {isLoading && (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          )}

          {error && (
            <p className="text-danger text-sm">Failed to load share links.</p>
          )}

          {data && data.length === 0 && (
            <p className="text-default-500 text-sm">
              No share links created yet.
            </p>
          )}

          {data && data.length > 0 && (
            <ul className="divide-y divide-default-200">
              {data.map((link, index) => (
                <ShareLinkItem key={link.id + index} link={link} />
              ))}
            </ul>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
