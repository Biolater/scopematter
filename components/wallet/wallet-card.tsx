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
  Wallet as WalletIcon,
  Star as StarIcon,
  Copy as CopyIcon,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Wallet } from "@/lib/types/wallet.types";
import { useState } from "react";
import { deleteWalletAction } from "@/lib/actions/wallet.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { addToast } from "@heroui/toast";

function shortAddr(addr: string) {
  if (!addr || addr.length < 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function WalletCard({ wallet }: { wallet: Wallet }) {
  const [copied, setCopied] = useState(false);
  const { runAction, isPending } = useServerAction(deleteWalletAction, {
    onSuccess: () => {
      addToast({
        title: "Wallet deleted successfully",
        color: "success",
      });
    },
    onError: (err) => {
      addToast({
        title: err.message,
        color: "danger",
      });
    },
  });

  async function handleCopy() {
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  }

  const createdAt = new Date(wallet.createdAt);

  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Chip
            startContent={<WalletIcon className="size-4" />}
            variant="flat"
            color="secondary"
            size="sm"
            radius="sm"
          >
            Ethereum Mainnet
          </Chip>

          {wallet.isPrimary && (
            <Chip
              startContent={<StarIcon className="size-4" />}
              variant="flat"
              color="primary"
              size="sm"
              radius="sm"
            >
              Primary
            </Chip>
          )}
        </div>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light" size="sm" radius="sm">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disabledKeys={wallet.isPrimary ? ["make-primary"] : []}
            aria-label="Wallet actions"
          >
            <DropdownItem
              key="make-primary"
              startContent={<StarIcon className="size-4" />}
            >
              {wallet.isPrimary ? "Already Primary" : "Make Primary"}
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              onPress={() => runAction({ id: wallet.id })}
              color="danger"
              startContent={<Trash2 className="size-4" />}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>

      <CardBody>
        <div className="text-xs text-default-500 mb-1">Address</div>
        <div className="flex items-center gap-2">
          <Tooltip content={wallet.address} placement="top">
            <span className="font-mono text-sm">
              {shortAddr(wallet.address)}
            </span>
          </Tooltip>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={handleCopy}
            className={copied ? "text-success" : ""}
          >
            <CopyIcon className="size-4" />
          </Button>
        </div>
      </CardBody>

      <CardFooter className="flex justify-between text-xs text-default-500">
        <span>
          Added {createdAt.toLocaleDateString()}{" "}
          {createdAt.toLocaleTimeString()}
        </span>
        <span>{wallet.chain.replace("_", " ")}</span>
      </CardFooter>
    </Card>
  );
}
