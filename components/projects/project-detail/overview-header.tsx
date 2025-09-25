import { Button } from "@heroui/button";
import { Sparkles, PencilLine } from "lucide-react";
import type { ProjectDetail } from "@/lib/types/project.types";
import { motion } from "framer-motion";
import { itemRise } from "@/lib/animations";
import { Chip } from "@heroui/chip";

export default function OverviewHeader({
  project,
  createdAt,
  updatedAt,
  onEdit,
}: {
  project: ProjectDetail;
  createdAt: string;
  updatedAt: string;
  onEdit: () => void;
}) {
  const statPillClass =
    "rounded-full border border-default-200 bg-content2 px-3 py-1 text-xs text-default-500";

  return (
    <motion.section
      {...itemRise}
      className="rounded-3xl border border-default-200 bg-content1 p-8 shadow-sm backdrop-blur"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-4">
          <Chip
            startContent={<Sparkles className="size-4 text-primary" />}
            color="primary"
            variant="flat"
          >
            Project Overview
          </Chip>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-default-900 md:text-4xl">
              {project.name}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-default-600 md:text-base">
              {project.description ??
                "No description provided for this project yet."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-default-500">
            <span className={statPillClass}>Project ID: {project.id}</span>
            <span className={statPillClass}>Created {createdAt}</span>
            <span className={statPillClass}>Last updated {updatedAt}</span>
          </div>
        </div>

        <Button
          color="primary"
          size="md"
          startContent={<PencilLine className="size-4" />}
          onPress={onEdit}
        >
          Edit Project
        </Button>
      </div>
    </motion.section>
  );
}
