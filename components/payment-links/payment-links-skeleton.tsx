"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

function PaymentLinkCardSkeleton() {
  return (
    <Card className="w-full">
      <CardHeader className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-24 rounded-md" /> {/* status chip */}
          <Skeleton className="h-6 w-20 rounded-md" /> {/* asset chip */}
          <Skeleton className="h-6 w-36 rounded-md" /> {/* chain chip */}
        </div>
        <Skeleton className="h-8 w-8 rounded-medium" /> {/* actions */}
      </CardHeader>

      <CardBody className="space-y-3">
        <Skeleton className="h-3 w-16 rounded-md" /> {/* Public URL label */}
        <Skeleton className="h-5 w-56 rounded-md" /> {/* URL */}
        <div className="flex gap-2">
          <Skeleton className="h-7 w-7 rounded-md" /> {/* copy */}
          <Skeleton className="h-7 w-7 rounded-md" /> {/* open */}
        </div>
        <Skeleton className="h-3 w-16 rounded-md" /> {/* Amount label */}
        <Skeleton className="h-5 w-24 rounded-md" /> {/* Amount */}
      </CardBody>

      <CardFooter className="flex justify-between">
        <Skeleton className="h-3 w-36 rounded-md" /> {/* created */}
        <Skeleton className="h-3 w-28 rounded-md" /> {/* slug */}
      </CardFooter>
    </Card>
  );
}

export default function PaymentLinksSkeleton({
  count = 8,
}: {
  count?: number;
}) {
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
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -10,
              transition: { duration: 0.2 },
            }}
            layout
          >
            <PaymentLinkCardSkeleton />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
