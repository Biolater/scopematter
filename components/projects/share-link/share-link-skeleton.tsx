"use client";

import { Skeleton } from "@heroui/skeleton";

export function ShareLinkSkeleton() {
  return (
    <div className="rounded-xl border border-divider p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Metadata skeleton */}
        <div className="flex items-start gap-3">
          <Skeleton className="rounded-full w-5 h-5 mt-1" />
          <div className="flex flex-col gap-2">
            {/* Status skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-4" />
              <Skeleton className="rounded-full w-16 h-6" />
            </div>

            {/* Views + Created skeleton */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Skeleton className="w-8 h-3" />
                <Skeleton className="rounded-full w-3 h-3" />
                <Skeleton className="w-4 h-3" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="w-12 h-3" />
                <Skeleton className="rounded-full w-3 h-3" />
                <Skeleton className="w-16 h-3" />
              </div>
            </div>

            {/* Last viewed skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="w-16 h-3" />
              <Skeleton className="rounded-full w-3 h-3" />
              <Skeleton className="w-14 h-3" />
            </div>

            {/* Permissions skeleton */}
            <div className="flex flex-col gap-1">
              <Skeleton className="w-16 h-3" />
              <div className="flex flex-wrap gap-1">
                <Skeleton className="rounded-full w-16 h-6" />
                <Skeleton className="rounded-full w-20 h-6" />
                <Skeleton className="rounded-full w-18 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Expiry + Actions skeleton */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Skeleton className="w-24 h-3" />
          <Skeleton className="rounded-full w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

interface ShareLinkSkeletonListProps {
  count?: number;
}

export function ShareLinkSkeletonList({ count = 2 }: ShareLinkSkeletonListProps) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <ShareLinkSkeleton key={index} />
      ))}
    </div>
  );
}
