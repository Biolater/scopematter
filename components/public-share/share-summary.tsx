"use client";

import { Card, CardBody } from "@heroui/card";

/**
 * Project summary card: description and meta dates
 */
export default function ShareSummary({
  description,
  createdAt,
  updatedAt,
}: {
  description?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}) {
  return (
    <Card className="mb-8 border border-default-200 shadow-sm">
      <CardBody className="space-y-3">
        {description && (
          <p className="text-default-700 text-sm leading-relaxed">{description}</p>
        )}
        <div className="text-xs text-default-500 flex flex-wrap gap-x-6 gap-y-1">
          <span>Created {safeDate(createdAt)}</span>
          <span>Last updated {safeDate(updatedAt)}</span>
        </div>
      </CardBody>
    </Card>
  );
}

function safeDate(input?: string | Date | null) {
  try {
    return new Date(input ?? "").toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return "--";
  }
}


