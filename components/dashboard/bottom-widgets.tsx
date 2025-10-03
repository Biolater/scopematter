"use client";

import React from "react";
import { RecentActivityCard } from "./recent-activity-card";
import { QuickStatsCard } from "./quick-stats-card";
import { motion } from "framer-motion";
import { listContainer, listItemRise, hoverLiftProps } from "@/lib/animations";
import {
  DashboardActivity,
  DashboardQuickStats,
} from "@/lib/types/dashboard.types";

// Variants centralized in lib/animations

const BottomWidgets = ({
  recentActivity,
  quickStats,
}: {
  recentActivity: DashboardActivity[];
  quickStats: DashboardQuickStats;
}) => {
  return (
    <motion.div
      variants={listContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      <motion.div variants={listItemRise} {...hoverLiftProps}>
        <RecentActivityCard activities={recentActivity} />
      </motion.div>
      <motion.div variants={listItemRise} {...hoverLiftProps}>
        <QuickStatsCard quickStats={quickStats} />
      </motion.div>
    </motion.div>
  );
};

export default BottomWidgets;
