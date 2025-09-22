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
import { GetDashboardOutput } from "@/lib/types/dashboard.types";

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

const TopMetrics = ({ data }: { data: GetDashboardOutput["metrics"] }) => {
  const dashboardMetrics = [
    {
      id: "projects",
      title: "Total Projects",
      value: data.projects.total,
      icon: <FolderIcon className="text-blue-500 size-4" />,
      iconBackground: "bg-blue-500/10",
      footer: (
        <span className="text-default-600 text-xs">
          +{data.projects.growth} this {data.projects.growthPeriod}
        </span>
      ),
    },
    {
      id: "scope",
      title: "Scope Items",
      value: data.scopeItems.total,
      icon: <FileTextIcon className="text-orange-500 size-4" />,
      iconBackground: "bg-orange-500/10",
      footer: (
        <span className="text-default-600 text-xs">
          +{data.scopeItems.growth} this {data.scopeItems.growthPeriod}
        </span>
      ),
    },
    {
      id: "requests",
      title: "Requests",
      value: data.requests.total,
      icon: <MessageSquareIcon className="text-red-500 size-4" />,
      iconBackground: "bg-red-500/10",
      footer: (
        <div className="flex items-center gap-2 justify-between">
          <span className="text-default-600 text-xs">
            +{data.requests.growth} this {data.requests.growthPeriod}
          </span>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Chip size="sm" variant="flat" color="danger" radius="sm">
              {data.requests.pending} Pending
            </Chip>
          </motion.div>
        </div>
      ),
    },
    {
      id: "changeOrders",
      title: "Change Orders",
      value: data.changeOrders.total,
      icon: <RefreshCcwIcon className="text-green-500 size-4" />,
      iconBackground: "bg-green-500/10",
      footer: (
        <div className="flex items-center gap-2 justify-between">
          <span className="text-default-600 text-xs">
            +{data.changeOrders.growth} this {data.changeOrders.growthPeriod}
          </span>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Chip size="sm" variant="flat" color="primary" radius="sm">
              {data.changeOrders.approved} Approved
            </Chip>
          </motion.div>
        </div>
      ),
    },
  ];
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
