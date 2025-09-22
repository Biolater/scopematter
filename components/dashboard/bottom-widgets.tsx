"use client";

import React from "react";
import { RecentActivityCard } from "./recent-activity-card";
import { QuickStatsCard } from "./quick-stats-card";
import { motion } from "framer-motion";
import {
  DashboardActivity,
  DashboardQuickStats,
} from "@/lib/types/dashboard.types";

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

const BottomWidgets = ({
  recentActivity,
  quickStats,
}: {
  recentActivity: DashboardActivity[];
  quickStats: DashboardQuickStats;
}) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
        <RecentActivityCard activities={recentActivity} />
      </motion.div>
      <motion.div variants={item} whileHover={{ y: -4, scale: 1.02 }}>
        <QuickStatsCard quickStats={quickStats} />
      </motion.div>
    </motion.div>
  );
};

export default BottomWidgets;
