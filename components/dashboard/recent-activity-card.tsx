"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ClockIcon } from "lucide-react";

interface ActivityItem {
  id: string;
  icon: ReactNode;
  message: string;
  timeAgo: string;
}

interface RecentActivityCardProps {
  activities: ActivityItem[];
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
                {item.icon}
              </span>
              <div>
                <p className="text-sm font-medium">{item.message}</p>
                <p className="text-xs text-default-500">{item.timeAgo}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardBody>
    </Card>
  );
}
