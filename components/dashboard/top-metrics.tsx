"use client";

import {
  FolderIcon,
  FileTextIcon,
  MessageSquareIcon,
  RefreshCcwIcon,
} from "lucide-react";
import { DashboardMetricCard } from "./dashboard-metric-card";
import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const dashboardMetrics = [
  {
    id: "projects",
    title: "Total Projects",
    value: 12,
    icon: <FolderIcon className="text-blue-500 size-4" />,
    iconBackground: "bg-blue-500/10",
    footer: <span className="text-default-600 text-xs">+2 this month</span>,
  },
  {
    id: "scope",
    title: "Scope Items",
    value: 48,
    icon: <FileTextIcon className="text-orange-500 size-4" />,
    iconBackground: "bg-orange-500/10",
    footer: <span className="text-default-600 text-xs">+8 this week</span>,
  },
  {
    id: "requests",
    title: "Requests",
    value: 23,
    icon: <MessageSquareIcon className="text-red-500 size-4" />,
    iconBackground: "bg-red-500/10",
    footer: (
      <div className="flex items-center gap-2 justify-between">
        <span className="text-default-600 text-xs">+3 this week</span>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Chip size="sm" variant="flat" color="danger" radius="sm">
            5 Pending
          </Chip>
        </motion.div>
      </div>
    ),
  },
  {
    id: "changeOrders",
    title: "Change Orders",
    value: 7,
    icon: <RefreshCcwIcon className="text-green-500 size-4" />,
    iconBackground: "bg-green-500/10",
    footer: (
      <div className="flex items-center gap-2 justify-between">
        <span className="text-default-600 text-xs">+1 this month</span>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Chip size="sm" variant="flat" color="primary" radius="sm">
            2 Approved
          </Chip>
        </motion.div>
      </div>
    ),
  },
];

const TopMetrics = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {dashboardMetrics.map((metric) => (
        <motion.div key={metric.id} variants={item}>
          <DashboardMetricCard {...metric} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TopMetrics;