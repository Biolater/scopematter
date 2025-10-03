"use client";

import { Project } from "@/lib/types/project.types";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  FileTextIcon,
  FolderIcon,
  User,
  FolderKanban,
  ClipboardList,
  GitPullRequest,
} from "lucide-react";
import { format } from "date-fns";
import { MessageSquareIcon } from "lucide-react";
import { hoverLiftProps } from "@/lib/animations";
import ProjectSettingsDropdown from "./project-settings-dropdown";
import Link from "next/link";

const statusToBadge: Record<
  Project["status"],
  { label: string; color: "default" | "primary" | "success" | "warning" }
> = {
  PENDING: { label: "Pending", color: "default" },
  IN_PROGRESS: { label: "In Progress", color: "primary" },
  COMPLETED: { label: "Completed", color: "success" },
};

const ProjectCard = ({
  project,
  onDelete,
  onEdit,
  onShare,
}: {
  project: Project;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onShare: (project: Project) => void;
}) => {
  const created = format(project.createdAt, "M/d/yyyy");
  const status = statusToBadge[project.status];

  return (
    <motion.div {...hoverLiftProps}>
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader className="justify-between items-start">
          <div className="space-y-1">
            <Link
              href={`/projects/${project.id}`}
              className="text-lg cursor-pointer font-semibold hover:text-primary"
            >
              {project.name}
            </Link>
            <div className="flex items-center gap-1 text-default-600">
              <User className="size-4" />
              <p className="text-sm">{project.client.name}</p>
            </div>
            <Chip size="sm" variant="flat" color={status.color} radius="full">
              {status.label}
            </Chip>
          </div>
          <ProjectSettingsDropdown
            onDelete={() => onDelete(project.id)}
            onEdit={() => onEdit(project.id)}
            onShare={() => onShare(project)}
          />
        </CardHeader>
        <CardBody className="space-y-4">
          {project.description && (
            <p className="text-default-700 text-sm leading-relaxed">
              {project.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-default-500 text-xs">
            <CalendarIcon className="size-4" />
            <span>Created {created}</span>
          </div>

          <div className="border-t border-divider pt-4 grid grid-cols-3 text-center">
            {/* Scope */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center gap-2 text-default-500 text-xs">
                <FolderKanban className="size-4" />
                <span>Scope</span>
              </div>
              <span className="font-semibold">{project._count.scopeItems}</span>
            </div>

            {/* Requests */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center gap-2 text-default-500 text-xs">
                <ClipboardList className="size-4" />
                <span>Requests</span>
              </div>
              <span className="font-semibold">{project._count.requests}</span>
            </div>

            {/* Change Orders */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center gap-2 text-default-500 text-xs">
                <GitPullRequest className="size-4" />
                <span>Changes</span>
              </div>
              <span className="font-semibold">
                {project._count.changeOrders}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
