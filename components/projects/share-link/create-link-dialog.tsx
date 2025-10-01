"use client";

import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { DatePicker } from "@heroui/date-picker";
import { useState } from "react";
import { addToast } from "@heroui/toast";
import { CalendarDate } from "@internationalized/date";

type CreateShareLinkDialogProps = {
  isOpen: boolean;
  onClose: () => void;      // closes ONLY this dialog
  projectId: string;
};

export function CreateShareLinkDialog({
  isOpen,
  onClose,
  projectId,
}: CreateShareLinkDialogProps) {
  // Use `undefined` for controlled HeroUI DatePicker (not null)
  const [expiresAt, setExpiresAt] = useState<CalendarDate | undefined>(undefined);
  const [showScopeItems, setShowScopeItems] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showChangeOrders, setShowChangeOrders] = useState(true);

  // Track popover open state to temporarily disable modal dismissal
  const [pickerOpen, setPickerOpen] = useState(false);

  const onSubmit = () => {
    if (!showScopeItems && !showRequests && !showChangeOrders) {
      addToast({ title: "At least one permission must be selected", color: "danger", size: "sm" });
      return;
    }
    console.log("TODO: create share link", { projectId, expiresAt, showScopeItems, showRequests, showChangeOrders });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}                 // ✅ closes only this dialog
      size="md"
      backdrop="blur"
      scrollBehavior="inside"
      isDismissable={!pickerOpen}       // ✅ don’t close on outside click while picker open
      isKeyboardDismissDisabled={pickerOpen} // ✅ don’t close on Esc while picker open
    >
      <ModalContent>
        <ModalHeader>Create Share Link</ModalHeader>

        <ModalBody className="flex flex-col gap-4">
          <DatePicker
            label="Expiry date (optional)"
            value={expiresAt}                   // ✅ controlled
            onChange={(val) => {                // ✅ HeroUI uses onChange for controlled value
              console.log("DatePicker changed:", val);
              setExpiresAt(val ?? undefined);
            }}
            onOpenChange={setPickerOpen}        // ✅ toggle dismissal rules while open
          />

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-default-600">Permissions:</span>
            <Checkbox isSelected={showScopeItems} onValueChange={setShowScopeItems}>
              Allow viewing scope items
            </Checkbox>
            <Checkbox isSelected={showRequests} onValueChange={setShowRequests}>
              Allow viewing requests
            </Checkbox>
            <Checkbox isSelected={showChangeOrders} onValueChange={setShowChangeOrders}>
              Allow viewing change orders
            </Checkbox>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button variant="light" color="danger" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onSubmit}>
            Create Link
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
