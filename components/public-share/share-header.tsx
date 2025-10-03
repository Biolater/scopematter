"use client";

import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { ArrowLeft } from "lucide-react";
import { projectStatusMeta } from "@/components/projects/project-detail/status-meta";
import type { ProjectStatus } from "@/lib/types/project.types";

/**
 * Read-only header for public project share page
 */
export default function ShareHeader({
  name,
  clientName,
  clientCompany,
  status,
}: {
  name: string;
  clientName?: string | null;
  clientCompany?: string | null;
  status: ProjectStatus;
}) {
  const meta = projectStatusMeta[status];
  return (
    <div className="mb-6">
{/*       <div className="mb-4">
        <Button
          variant="light"
          size="sm"
          startContent={<ArrowLeft className="size-4" />}
          onPress={() => window.history.back()}
          className="text-default-600 hover:text-default-900"
        >
          Go Back
        </Button>
      </div> */}
      <h1 className="text-3xl font-semibold text-default-900">{name}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-default-600">
        {clientName && (
          <span className="text-sm">
            {clientCompany ? `${clientName} · ${clientCompany}` : clientName}
          </span>
        )}
        <Chip
          size="sm"
          variant="flat"
          color={meta.color}
          className="text-xs font-medium"
        >
          {meta.label}
        </Chip>
      </div>
    </div>
  );
}
