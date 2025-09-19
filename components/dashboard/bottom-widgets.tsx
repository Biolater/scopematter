"use client";

import React from "react";
import { RecentActivityCard } from "./recent-activity-card";
import { QuickStatsCard } from "./quick-stats-card";
import { FolderIcon, MessageSquareIcon, CheckCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const mockActivities = [
  {
    id: "1",
    icon: <FolderIcon className="text-blue-500 size-4" />,
    message: "New project created: E-commerce Website",
    timeAgo: "2 hours ago",
  },
  {
    id: "2",
    icon: <MessageSquareIcon className="text-purple-500 size-4" />,
    message: "Scope request submitted for Mobile App",
    timeAgo: "4 hours ago",
  },
  {
    id: "3",
    icon: <CheckCircleIcon className="text-green-500 size-4" />,
    message: "Change order approved for Portfolio Site",
    timeAgo: "1 day ago",
  },
];

const mockQuickStats = {
  projectsCompleted: { value: 8, total: 12 },
  pendingRequests: { value: 5, total: 23 },
  changeOrders: { total: 7, breakdown: "2 approved, 3 pending, 2 rejected" },
};

// container + item animations
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

const BottomWidgets = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
        <RecentActivityCard activities={mockActivities} />
      </motion.div>
      <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
        <QuickStatsCard {...mockQuickStats} />
      </motion.div>
    </motion.div>
  );
};

export default BottomWidgets;
