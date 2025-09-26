"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  CheckCircleIcon,
  ClockIcon,
  FolderIcon,
  MessageSquareIcon,
} from "lucide-react";
import { DashboardActivity } from "@/lib/types/dashboard.types";
import { formatDistanceToNow } from "date-fns";

interface RecentActivityCardProps {
  activities: DashboardActivity[];
}

const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const listItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold flex items-center gap-2">
          <span>
            <ClockIcon className="size-6" />
          </span>{" "}
          Recent Activity
        </h3>
      </CardHeader>
      <CardBody>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center pb-8 text-center text-default-600">
            <ClockIcon className="size-12 mb-2 text-default-600" />
            <p className="text-sm font-medium">No recent activity yet</p>
            <p className="text-xs">Your projects’ updates will appear here</p>
          </div>
        ) : (
          <motion.div
            variants={list}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {activities.map((item) => (
              <motion.div
                key={item.id}
                variants={listItem}
                className="flex items-start gap-3"
              >
                <span className="p-2 rounded-full bg-default-100">
                  {item.type === "PROJECT_CREATED" ? (
                    <FolderIcon className="text-blue-500 size-4" />
                  ) : item.type === "REQUEST_SUBMITTED" ? (
                    <MessageSquareIcon className="text-purple-500 size-4" />
                  ) : (
                    <CheckCircleIcon className="text-green-500 size-4" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-medium">{item.message}</p>
                  <p className="text-xs text-default-500">
                    {formatDistanceToNow(item.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardBody>
    </Card>
  );
}
