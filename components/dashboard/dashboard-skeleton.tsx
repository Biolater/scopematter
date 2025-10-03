"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

const MetricCardSkeleton = () => (
  <Card className="transition-all duration-200">
    <CardHeader className="justify-between items-center">
      <Skeleton className="h-4 w-24 rounded" />
      <Skeleton className="h-8 w-8 rounded-lg" />
    </CardHeader>
    <CardBody className="space-y-3">
      <Skeleton className="h-7 w-28 rounded" />
      <Skeleton className="h-4 w-20 rounded" />
    </CardBody>
  </Card>
);

const RecentActivitySkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-36 rounded" />
    </CardHeader>
    <CardBody>
      <div className="flex flex-col gap-4" role="status" aria-label="Loading recent activity">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </CardBody>
  </Card>
);

const QuickStatsSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-5 w-28 rounded" />
    </CardHeader>
    <CardBody className="flex flex-col gap-4">
      <div className="gap-2 flex flex-col">
        <Skeleton className="h-4 w-56 rounded" />
        <Skeleton className="h-2.5 w-full rounded" />
      </div>
      <div className="gap-2 flex flex-col">
        <Skeleton className="h-4 w-60 rounded" />
        <Skeleton className="h-2.5 w-full rounded" />
      </div>
      <div className="gap-2 flex flex-col">
        <Skeleton className="h-4 w-44 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
      </div>
    </CardBody>
  </Card>
);

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-6" role="status" aria-label="Loading dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivitySkeleton />
        <QuickStatsSkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;


