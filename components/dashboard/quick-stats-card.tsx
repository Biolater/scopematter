"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";

interface QuickStatsCardProps {
  projectsCompleted: { value: number; total: number };
  pendingRequests: { value: number; total: number };
  changeOrders: { total: number; breakdown: string };
}

export function QuickStatsCard({
  projectsCompleted,
  pendingRequests,
  changeOrders,
}: QuickStatsCardProps) {
  const projectsPct = (projectsCompleted.value / projectsCompleted.total) * 100;
  const requestsPct = (pendingRequests.value / pendingRequests.total) * 100;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold flex items-center gap-2">
          📊 Quick Stats
        </h3>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-medium">
            Projects Completed {projectsCompleted.value}/
            {projectsCompleted.total}
          </p>
          <div className="w-full h-2 bg-default-200 rounded overflow-hidden">
            <motion.div
              className="h-2 bg-primary rounded"
              initial={{ width: 0 }}
              animate={{ width: `${projectsPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">
            Pending Requests {pendingRequests.value}/{pendingRequests.total}
          </p>
          <div className="w-full h-2 bg-default-200 rounded overflow-hidden">
            <motion.div
              className="h-2 bg-success rounded"
              initial={{ width: 0 }}
              animate={{ width: `${requestsPct}%` }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">
            Change Orders {changeOrders.total}
          </p>
          <p className="text-xs text-default-500">{changeOrders.breakdown}</p>
        </div>
      </CardBody>
    </Card>
  );
}
