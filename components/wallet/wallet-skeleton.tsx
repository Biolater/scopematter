"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton"; // if you use @heroui/react, swap import accordingly
import { motion, AnimatePresence } from "framer-motion";

export function WalletCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          {/* "Ethereum Mainnet" chip */}
          <Skeleton className="h-6 w-40 rounded-md" />
          {/* "Primary" chip (always shown in skeleton) */}
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
        {/* More / actions icon button */}
        <Skeleton className="h-8 w-8 rounded-medium" />
      </CardHeader>

      <CardBody>
        {/* Address label */}
        <Skeleton className="mb-2 h-3 w-16 rounded-md" />
        <div className="flex items-center gap-2">
          {/* Short address text */}
          <Skeleton className="h-5 w-44 rounded-md" />
          {/* Copy button */}
          <Skeleton className="h-7 w-7 rounded-md" />
        </div>
      </CardBody>

      <CardFooter className="flex justify-between">
        {/* "Added <date time>" */}
        <Skeleton className="h-3 w-36 rounded-md" />
        {/* Chain text */}
        <Skeleton className="h-3 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}

export default function WalletsSkeleton({ count = 8 }: { count?: number }) {
  const items = Array.from({ length: Math.min(Math.max(count, 6), 10) });

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {items.map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 100, delay: i * 0.08 },
            }}
            exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.2 } }}
            layout
          >
            <WalletCardSkeleton />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
