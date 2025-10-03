"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";
import { ChartBarIcon } from "lucide-react";
import { Progress } from "@heroui/progress";
import { DashboardQuickStats } from "@/lib/types/dashboard.types";

interface QuickStatsCardProps {
  quickStats: DashboardQuickStats;
}

export function QuickStatsCard({ quickStats }: QuickStatsCardProps) {
  const projectsPct =
    (quickStats.projectsCompleted.value / quickStats.projectsCompleted.total) *
    100;
  const requestsPct =
    (quickStats.pendingRequests.value / quickStats.pendingRequests.total) * 100;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold flex items-center gap-2">
          <span>
            <ChartBarIcon className="size-6" />
          </span>{" "}
          Quick Stats
        </h3>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="gap-1 flex flex-col">
          <p className="text-sm font-medium">
            Projects Completed {quickStats.projectsCompleted.value}/
            {quickStats.projectsCompleted.total}
          </p>
          <Progress aria-label="Projects Completed" value={projectsPct} />
        </div>

        <div className="gap-1 flex flex-col">
          <p className="text-sm font-medium">
            Pending Requests {quickStats.pendingRequests.value}/
            {quickStats.pendingRequests.total}
          </p>
          <Progress aria-label="Pending Requests" value={requestsPct} />
        </div>

        <div>
          <p className="text-sm font-medium">
            Change Orders {quickStats.changeOrders.total}
          </p>
          <p className="text-xs text-default-500">
            {quickStats.changeOrders.breakdown}
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
