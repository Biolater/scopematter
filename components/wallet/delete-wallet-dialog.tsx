"use client";

import { useState, useMemo } from "react";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Chip } from "@heroui/chip";
import { TriangleAlert } from "lucide-react"; // or any icon you prefer
import { Wallet } from "@/lib/types/wallet.types";

type DeleteWalletDialogProps = {
  wallet: Wallet | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (walletId: string) => Promise<void> | void;
  linkedPaymentLinksCount?: number;
};

const maskAddress = (addr: string, left = 6, right = 6) => {
  if (!addr) return "";
  if (addr.length <= left + right) return addr;
  return `${addr.slice(0, left)}…${addr.slice(-right)}`;
};

export default function DeleteWalletDialog({
  wallet,
  open,
  onOpenChange,
  onConfirm,
  linkedPaymentLinksCount,
}: DeleteWalletDialogProps) {
  const [submitting, setSubmitting] = useState(false);

  const masked = useMemo(() => maskAddress(wallet?.address ?? ""), [wallet]);

  const onDelete = async () => {
    try {
      setSubmitting(true);
      await onConfirm(wallet?.id ?? "");
      onOpenChange(false);
    } finally {
      setSubmitting(false);
    }
  };

  const isPrimary = Boolean(wallet?.isPrimary);
  const blockReason = isPrimary
    ? "This is your primary wallet. Set another wallet as primary before deleting."
    : undefined;

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
              Delete wallet
            </ModalHeader>

            <ModalBody className="space-y-3">
              <div className="text-sm text-foreground-600">
                You’re about to permanently remove this wallet from your
                account. This action cannot be undone.
              </div>

              <div className="rounded-xl bg-content2 p-3 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">Address:</span>
                  <code className="rounded-md bg-content3 px-2 py-0.5 text-xs">
                    {masked}
                  </code>
                  <Chip size="sm" variant="flat">
                    {wallet?.chain ?? "Unknown"}
                  </Chip>
                  {isPrimary && (
                    <Chip size="sm" color="warning" variant="flat">
                      Primary
                    </Chip>
                  )}
                </div>
                {typeof linkedPaymentLinksCount === "number" && (
                  <div className="mt-2 text-xs text-foreground-500">
                    {linkedPaymentLinksCount > 0
                      ? `Warning: ${linkedPaymentLinksCount} payment link${
                          linkedPaymentLinksCount > 1 ? "s" : ""
                        } currently point${
                          linkedPaymentLinksCount > 1 ? "" : "s"
                        } to this wallet. Those links will stop working.`
                      : "No payment links are connected to this wallet."}
                  </div>
                )}
              </div>

              {blockReason ? (
                <div className="rounded-md border border-warning-200 bg-warning-50 px-3 py-2 text-xs text-warning-700">
                  {blockReason}
                </div>
              ) : (
                <div className="rounded-md border border-danger-200 bg-danger-50 px-3 py-2 text-xs text-danger-700">
                  Type of action: <b>Destructive</b>. Make sure you’ve migrated
                  any active payment links before proceeding.
                </div>
              )}
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
                isDisabled={submitting || Boolean(blockReason)}
              >
                Delete wallet
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
