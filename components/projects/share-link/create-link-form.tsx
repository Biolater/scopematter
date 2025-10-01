"use client";

import { Checkbox } from "@heroui/checkbox";
import { DatePicker } from "@heroui/date-picker";
import React, { useState } from "react";
import { CalendarDate } from "@internationalized/date";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/toast";
import { CreateShareLinkSchemaType } from "@/lib/validation/shareLink.schema";
import { createShareLinkAction } from "@/lib/actions/shareLink.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { shareLinkQueries } from "@/lib/data/queries/share-link.queries";
import { CreateShareLinkOutput } from "@/lib/types/shareLink.types";
import { ToastCopyButton } from "@/components/ui/toast-copy-button";

interface CreateLinkFormProps {
  onPickerOpenChange?: (open: boolean) => void;
  popoverContainer?: Element;
  projectId: string;
}

const CreateLinkForm = ({
  onPickerOpenChange,
  popoverContainer,
  projectId,
}: CreateLinkFormProps) => {
  const { useInvalidate } = shareLinkQueries;
  const invalidate = useInvalidate();
  const { runAction, isPending, state } = useServerAction<
    CreateShareLinkSchemaType,
    CreateShareLinkOutput
  >(createShareLinkAction, {
    onSuccess: (data) => {
      addToast({
        size: "sm",
        title: "Share link created successfully",
        color: "success",
        timeout: 10000,
        endContent: (
          <ToastCopyButton
            url={data.url}
            isIconOnly
            color="success"
            variant="light"
          />
        ),
      });
      invalidate.params({ projectId });
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to create share link",
        color: "danger",
      });
    },
  });
  const [expiresAt, setExpiresAt] = useState<CalendarDate | undefined>(
    undefined
  );
  const [showScopeItems, setShowScopeItems] = useState(true);
  const [showRequests, setShowRequests] = useState(true);
  const [showChangeOrders, setShowChangeOrders] = useState(true);

  const handlePickerOpenChange = (open: boolean) => {
    onPickerOpenChange?.(open);
  };

  const onSubmit = () => {
    if (!showScopeItems && !showRequests && !showChangeOrders) {
      addToast({
        title: "At least one permission must be selected",
        color: "danger",
        size: "sm",
      });
      return;
    }
    runAction({
      projectId,
      expiresAt: expiresAt?.toDate("UTC"),
      showScopeItems,
      showRequests,
      showChangeOrders,
    });
  };

  return (
    <div className="flex flex-col gap-4 border-b border-divider pb-4">
      <DatePicker
        showMonthAndYearPickers
        label="Expiry date (optional)"
        value={expiresAt}
        onChange={(val) => setExpiresAt(val ?? undefined)}
        onOpenChange={handlePickerOpenChange}
        popoverProps={{ portalContainer: popoverContainer }}
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-default-600">
          Permissions:
        </span>
        <Checkbox isSelected={showScopeItems} onValueChange={setShowScopeItems}>
          Allow viewing scope items
        </Checkbox>
        <Checkbox isSelected={showRequests} onValueChange={setShowRequests}>
          Allow viewing requests
        </Checkbox>
        <Checkbox
          isSelected={showChangeOrders}
          onValueChange={setShowChangeOrders}
        >
          Allow viewing change orders
        </Checkbox>
      </div>
      <div className="flex justify-end">
        <Button
          color="primary"
          onPress={onSubmit}
          isLoading={isPending}
          isDisabled={isPending}
        >
          Create Link
        </Button>
      </div>
    </div>
  );
};

export default CreateLinkForm;
