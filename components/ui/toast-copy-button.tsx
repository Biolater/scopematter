"use client";

import { Button } from "@heroui/button";
import { useState } from "react";
import { CheckIcon } from "lucide-react";
import { CopyIcon } from "lucide-react";
import { Tooltip } from "@heroui/tooltip";

interface ToastCopyButtonProps {
  url: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  variant?:
    | "solid"
    | "light"
    | "flat"
    | "ghost"
    | "faded"
    | "bordered"
    | "shadow"
    | undefined;
  isIconOnly?: boolean;
}

export function ToastCopyButton({
  url,
  size = "sm",
  color = "primary",
  variant = "solid",
  isIconOnly = false,
}: ToastCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // optionally show an error toast
    }
  };

  return (
    <Tooltip
      content={copied ? "Copied" : "Copy link to clipboard"}
      placement="top"
    >
      <Button
        size={size}
        isIconOnly={isIconOnly}
        color={color}
        variant={variant}
        isDisabled={copied}
        onPress={onCopy}
      >
        {copied ? (
          <CheckIcon className="w-4 h-4" />
        ) : (
          <CopyIcon className="w-4 h-4" />
        )}
      </Button>
    </Tooltip>
  );
}
