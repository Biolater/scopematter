"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DashboardMetricCardProps {
  title: string;
  icon: ReactNode;
  value: number | string;
  iconBackground: string;
  footer?: ReactNode; // flexible bottom content
}

export function DashboardMetricCard({
  title,
  icon,
  value,
  iconBackground,
  footer,
}: DashboardMetricCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Card className="transition-all duration-200 hover:shadow-lg">
        <CardHeader className="justify-between">
          <p className="text-sm font-medium">{title}</p>
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={cn("p-2 rounded-lg", iconBackground)}
          >
            {icon}
          </motion.span>
        </CardHeader>
        <CardBody>
          <p className="text-2xl font-bold">{value}</p>
          {footer && <div className="mt-2">{footer}</div>}
        </CardBody>
      </Card>
    </motion.div>
  );
}
