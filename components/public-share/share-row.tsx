"use client";

import { Card, CardBody } from "@heroui/card";

/**
 * Public share list row primitives for read-only display
 */
export function Row({
  title,
  description,
  right,
  subRight,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
  subRight?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 p-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-default-900">{title}</p>
        {description && (
          <p className="mt-0.5 line-clamp-2 text-sm text-default-600">{description}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 text-right">
        {right}
        {subRight}
      </div>
    </div>
  );
}

export function EmptyRow({ label }: { label: string }) {
  return (
    <div className="p-6 text-center text-sm text-default-500" aria-live="polite">
      {label}
    </div>
  );
}


