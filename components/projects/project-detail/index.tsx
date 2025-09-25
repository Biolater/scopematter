"use client";

import { useMemo, useState } from "react";
import type { ProjectDetail } from "@/lib/types/project.types";
import OverviewHeader from "./overview-header";
import ClientCard from "./client-card";
import StatusCard from "./status-card";
import ProgressCard from "./progress-card";
import ProjectTabs from "./project-tabs";
import { motion } from "framer-motion";
import { listContainer, listItemRise } from "@/lib/animations";
import EditProjectDialog from "../edit-project-dialog";

export default function ProjectDetailView({
  project,
}: {
  project: ProjectDetail;
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const scopeItems = Array.isArray(project.scopeItems)
    ? project.scopeItems
    : [];
  const requests = Array.isArray(project.requests) ? project.requests : [];
  const changeOrders = Array.isArray(project.changeOrders)
    ? project.changeOrders
    : [];

  const createdAt = useMemo(() => {
    try {
      return new Date(project.createdAt).toLocaleDateString(undefined, {
        dateStyle: "medium",
      });
    } catch {
      return "--";
    }
  }, [project.createdAt]);

  const updatedAt = useMemo(() => {
    try {
      return new Date(project.updatedAt).toLocaleDateString(undefined, {
        dateStyle: "medium",
      });
    } catch {
      return "--";
    }
  }, [project.updatedAt]);

  const completedScope = scopeItems.filter(
    (i) => i.status === "COMPLETED"
  ).length;
  const scopeCompletionPct = scopeItems.length
    ? Math.round((completedScope / scopeItems.length) * 100)
    : 0;
  const resolvedRequests = requests.filter(
    (r) => r.status !== "PENDING"
  ).length;
  const requestsResolutionPct = requests.length
    ? Math.round((resolvedRequests / requests.length) * 100)
    : 0;
  const approvedChanges = changeOrders.filter(
    (c) => c.status === "APPROVED"
  ).length;
  const changeApprovalPct = changeOrders.length
    ? Math.round((approvedChanges / changeOrders.length) * 100)
    : 0;

  return (
    <div className="flex  flex-col gap-6">
      <OverviewHeader
        project={project}
        createdAt={createdAt}
        updatedAt={updatedAt}
        onEdit={() => setIsEditOpen(true)}
      />

      <motion.section
        variants={listContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        <motion.div variants={listItemRise}>
          <ClientCard project={project} />
        </motion.div>
        <motion.div variants={listItemRise}>
          <StatusCard
            project={project}
            updatedAt={updatedAt}
            completedScope={completedScope}
          />
        </motion.div>
        <motion.div variants={listItemRise}>
          <ProgressCard
            scopeCompletionPct={scopeCompletionPct}
            requestsResolutionPct={requestsResolutionPct}
            changeApprovalPct={changeApprovalPct}
            completedScope={completedScope}
            totalScope={scopeItems.length}
            resolvedRequests={resolvedRequests}
            totalRequests={requests.length}
            approvedChanges={approvedChanges}
            totalChanges={changeOrders.length}
          />
        </motion.div>
      </motion.section>

      <ProjectTabs
        scopeItems={scopeItems}
        requests={requests}
        changeOrders={changeOrders}
        projectId={project.id}
      />

      <EditProjectDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        project={project}
      />
    </div>
  );
}
