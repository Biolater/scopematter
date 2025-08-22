"use client";

import { Card, CardBody, CardHeader, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import {
  Link as LinkIcon,
  ExternalLink,
  MoreVertical,
  Copy as CopyIcon,
  PauseCircle,
  PlayCircle,
  Trash2,
  Wallet as WalletIcon,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import { shortAddr } from "@/lib/utils/wallet.utils";
import type { PaymentLink } from "@/lib/types/payment-link.types";

type Status = "ACTIVE" | "INACTIVE";

export default function PaymentLinkCard({
  link,
  onToggleStatus,
  onDelete,
}: {
  link: PaymentLink;
  onToggleStatus: (id: string, nextStatus: Status) => void;
  onDelete: (id: string) => void;
}) {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://paylynk.xyz";
  const publicUrl = `${origin}/p/${link.slug}`;

  const createdAt =
    link.createdAt instanceof Date ? link.createdAt : new Date(link.createdAt);
  const createdShort = createdAt.toLocaleString(undefined, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const statusColor = link.status === "ACTIVE" ? "success" : "default";
  const assetColor = link.asset === "USDT" ? "success" : "secondary";
  const chainLabel = "Ethereum Mainnet";

  const amountLabel =
    link.amountUsd == null || link.amountUsd === ""
      ? "Any amount"
      : `$${Number(link.amountUsd).toLocaleString()}`;

  async function handleCopyUrl() {
    await navigator.clipboard.writeText(publicUrl);
    addToast({ title: "Link copied", color: "success" });
  }

  function handleDelete() {
    onDelete(link.id);
  }

  function handleToggle() {
    const next: Status = link.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    onToggleStatus(link.id, next);
  }

  const canHardDelete = link.transactions.length === 0;

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Chip
              startContent={<LinkIcon className="size-4" />}
              color={statusColor as any}
              variant="flat"
              size="sm"
              radius="sm"
            >
              {link.status === "ACTIVE" ? "Active" : "Inactive"}
            </Chip>
            <Chip
              variant="flat"
              color={assetColor as any}
              size="sm"
              radius="sm"
            >
              {link.asset}
            </Chip>
            <Chip variant="flat" color="secondary" size="sm" radius="sm">
              {chainLabel}
            </Chip>
          </div>

          <div className="flex items-center gap-2 text-xs text-default-500">
            <WalletIcon className="size-3.5" />
            <span className="font-mono">
              {shortAddr(link.wallet.address)}
              {link.wallet.isPrimary ? " • Primary" : ""}
            </span>
          </div>

          {link.memo && (
            <div className="text-xs text-default-600 line-clamp-2">
              {link.memo}
            </div>
          )}
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              radius="sm"
              aria-label="More actions"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Payment link actions">
  <DropdownItem
    key="toggle"
    startContent={
      link.status === "ACTIVE" ? (
        <PauseCircle className="size-4" />
      ) : (
        <PlayCircle className="size-4" />
      )
    }
    onPress={handleToggle}
  >
    {link.status === "ACTIVE" ? "Deactivate" : "Activate"}
  </DropdownItem>

  <DropdownItem
    key="delete"
    className="text-danger"
    color="danger"
    startContent={<Trash2 className="size-4" />}
    onPress={() => canHardDelete && handleDelete()}
    isDisabled={!canHardDelete}
    description={
      !canHardDelete
        ? "This link has transactions and cannot be deleted."
        : undefined
    }
  >
    Delete permanently
  </DropdownItem>
</DropdownMenu>

        </Dropdown>
      </CardHeader>

      <CardBody className="space-y-3">
        <div className="text-xs text-default-500">Public URL</div>
        <div className="flex items-center gap-2">
          <Tooltip content={publicUrl} placement="top">
            <span className="truncate text-sm max-w-[220px] sm:max-w-[340px]">
              {publicUrl}
            </span>
          </Tooltip>

          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={handleCopyUrl}
            aria-label="Copy URL"
          >
            <CopyIcon className="size-4" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            aria-label="Open link"
            onPress={() =>
              window.open(publicUrl, "_blank", "noopener,noreferrer")
            }
          >
            <ExternalLink className="size-4" />
          </Button>
        </div>

        <div className="text-xs text-default-500 mt-2">Amount</div>
        <div className="text-sm">{amountLabel}</div>
      </CardBody>

      <CardFooter className="flex justify-between text-xs flex-wrap gap-2 text-default-500">
        <span>Created {createdShort}</span>
        <span>Slug: {link.slug}</span>
      </CardFooter>
    </Card>
  );
}
