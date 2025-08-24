"use client";

import { useMemo, useState } from "react";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Input } from "@heroui/input";
import { Tooltip } from "@heroui/tooltip";
import { addToast } from "@heroui/toast";
import { motion } from "framer-motion";
import {
  Copy as CopyIcon,
  Share2 as ShareIcon,
  Wallet as WalletIcon,
  DollarSign,
  Info,
} from "lucide-react";
import { shortAddr } from "@/lib/utils/wallet.utils";

type Chain = "ETH_MAINNET";
type Asset = "USDT" | "ETH";

interface Props {
  slug: string;
  username: string;
  imageUrl: string | null;
  chain: Chain;
  asset: Asset;
  walletAddress: string;
  defaultAmountUsd: string | null;
  memo: string | null;
}

export default function PayFormClient({
  slug,
  username,
  imageUrl,
  chain,
  asset,
  walletAddress,
  defaultAmountUsd,
  memo,
}: Props) {
  const [amount, setAmount] = useState<string>(defaultAmountUsd ?? "");
  const [busy, setBusy] = useState(false);

  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined") return window.location.origin;
    return process.env.NEXT_PUBLIC_APP_URL ?? "https://paylynk.app";
  }, []);

  const linkUrl = `${baseUrl.replace(/\/+$/, "")}/p/${slug}`;

  const presets = memo
    ? [memoPresetToNumber(memo)].filter(Boolean) as number[]
    : [];

  // default quick presets
  const quick = Array.from(new Set<number>([
    25, 50, 100, 250, 500,
    ...presets,
  ])).sort((a, b) => a - b).slice(0, 6);

  function memoPresetToNumber(m: string): number | null {
    const match = m.match(/(\d+(\.\d{1,2})?)/);
    if (!match) return null;
    const n = Number(match[1]);
    return Number.isFinite(n) ? Number(n) : null;
  }

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      addToast({ title: `${label} copied`, color: "success" });
    } catch {
      addToast({ title: `Unable to copy ${label}`, color: "danger" });
    }
  }

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Pay ${username} on PayLynk`,
          text: memo ?? `Send a secure ${asset} payment on Ethereum to ${username}.`,
          url: linkUrl,
        });
      } else {
        await copy(linkUrl, "Link");
      }
    } catch {
      // user canceled share; ignore
    }
  }

  function sanitizeAmount(v: string) {
    // keep only digits and one dot; clamp to 2 decimals
    const cleaned = v.replace(/[^\d.]/g, "");
    const parts = cleaned.split(".");
    const head = parts[0];
    const tail = parts.slice(1).join("");
    const decimal = tail.length > 0 ? "." + tail.replace(/\./g, "").slice(0, 2) : "";
    return (head + decimal).replace(/^0+(?=\d)/, "0");
  }

  function setPreset(v: number) {
    setAmount(String(v));
  }

  async function handleContinue() {
    if (!amount || Number(amount) <= 0) {
      addToast({ title: "Enter a valid USD amount", color: "warning" });
      return;
    }
    setBusy(true);
    try {
      // PLACEHOLDER: you integrate Onramper here.
      // Example: dispatch a custom event or call your onramper opener.
      window.dispatchEvent(
        new CustomEvent("paylynk:open-onramper", {
          detail: {
            usdAmount: Number(amount),
            asset,
            chain,
            walletAddress,
            slug,
          },
        })
      );
      addToast({ title: "Opening payment widget…", color: "success" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="w-full"
    >
      <Card className="border border-divider shadow-medium rounded-2xl">
        <CardHeader className="flex items-center gap-4">
          <Avatar
            src={imageUrl ?? undefined}
            name={username}
            className="size-12"
            showFallback
          />
          <div className="flex flex-col">
            <div className="text-xl font-semibold leading-tight">
              Pay {username}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Chip size="sm" variant="flat" className="rounded-full">
                {asset}
              </Chip>
              <Chip size="sm" variant="flat" className="rounded-full">
                {chain === "ETH_MAINNET" ? "Ethereum" : chain}
              </Chip>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Tooltip content="Share link">
              <Button isIconOnly variant="light" onPress={share}>
                <ShareIcon className="size-4.5" />
              </Button>
            </Tooltip>
            <Tooltip content="Copy link">
              <Button
                isIconOnly
                variant="light"
                onPress={() => copy(linkUrl, "Link")}
              >
                <CopyIcon className="size-4.5" />
              </Button>
            </Tooltip>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="space-y-5">
          {memo && (
            <div className="flex items-center gap-2 text-sm text-foreground-500">
              <Info className="size-4 shrink-0" />
              <span>{memo}</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-medium">Amount (USD)</label>
            <Input
              type="text"
              value={amount}
              onValueChange={(v) => setAmount(sanitizeAmount(v))}
              startContent={<DollarSign className="size-4 text-foreground-500" />}
              placeholder="0.00"
              inputMode="decimal"
              aria-label="Amount in USD"
            />
            <div className="flex flex-wrap gap-2">
              {quick.map((q) => (
                <Button
                  key={q}
                  size="sm"
                  variant="flat"
                  onPress={() => setPreset(q)}
                  className="rounded-full"
                >
                  ${q}
                </Button>
              ))}
            </div>
          </div>

          <Divider />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Destination</span>
              <Chip size="sm" variant="flat" className="rounded-full">
                <WalletIcon className="size-3.5 mr-1" />
                {shortAddr(walletAddress)}
              </Chip>
            </div>
            <div className="flex gap-2">
              <Button
                variant="light"
                size="sm"
                onPress={() => copy(walletAddress, "Address")}
                startContent={<CopyIcon className="size-4" />}
              >
                Copy address
              </Button>
              <Button
                variant="light"
                size="sm"
                onPress={() => copy(linkUrl, "Link")}
                startContent={<ShareIcon className="size-4" />}
              >
                Share link
              </Button>
            </div>
          </div>

          <Button
            color="primary"
            size="lg"
            className="w-full rounded-2xl"
            isLoading={busy}
            onPress={handleContinue}
          >
            Continue to payment
          </Button>

          <p className="text-center text-xs text-foreground-500">
            You will complete the purchase in a secure on-ramp. Funds are delivered to the wallet above.
          </p>
        </CardBody>
      </Card>
    </motion.div>
  );
}

