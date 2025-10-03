"use client";

import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody } from "@heroui/card";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8" role="status" aria-label="Loading public project view">
      {/* Header */}
      <div className="mb-6 space-y-3">
        <Skeleton className="h-8 w-72 rounded" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Summary */}
      <Card className="mb-8">
        <CardBody className="space-y-3">
          <Skeleton className="h-4 w-[36rem] max-w-full rounded" />
          <Skeleton className="h-4 w-[28rem] max-w-full rounded" />
          <div className="flex gap-6">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </CardBody>
      </Card>

      {/* Sections */}
      {[0, 1, 2].map((i) => (
        <section key={i} className="space-y-3">
          <Skeleton className="h-5 w-40 rounded" />
          <Card>
            <CardBody className="space-y-0 p-0">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="flex items-start justify-between gap-4 p-4 border-b last:border-none border-default-200">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-56 rounded" />
                    <Skeleton className="h-3 w-96 max-w-full rounded" />
                  </div>
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              ))}
            </CardBody>
          </Card>
        </section>
      ))}
    </div>
  );
}


