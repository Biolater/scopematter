"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/button";
import { Alert } from "@heroui/alert";
import { FolderXIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-2xl mx-auto">
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-6"
      >
        <FolderXIcon className="w-16 h-16 text-danger" />
      </motion.div>

      {/* Animated heading */}
      <motion.h1
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-3xl font-bold mb-2"
      >
        Project Not Found
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-default-500 mb-6 max-w-md"
      >
        The project you’re looking for doesn’t exist, may have been deleted, or
        you don’t have permission to view it.
      </motion.p>

      {/* Subtle alert for clarity */}
      <Alert
        description="Make sure the link is correct or return to your projects list."
        color="warning"
        className="mb-6"
      />

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex gap-3"
      >
        <Link href="/projects">
          <Button startContent={<ArrowLeftIcon className="w-4 h-4" />}>
            Back to Projects
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="bordered">Go Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
