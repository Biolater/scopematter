"use client";

import { useEffect, startTransition } from "react";
import { Button } from "@heroui/button";
import { RefreshCwIcon } from "lucide-react";
import { Alert } from "@heroui/alert";
import { useRouter } from "next/navigation";

/**
 * Route-level error boundary for /dashboard.
 * Renders when server component data fetching throws.
 */
export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // TODO: hook up to real error reporting
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4 max-w-md mx-auto">
      <Alert
        description={
          error.message ||
          "An unexpected error occurred while fetching your data."
        }
        color="danger"
      />
      <div className="flex items-center gap-3">
        <Button
          startContent={<RefreshCwIcon className="size-4" />}
          variant="flat"
          color="primary"
          onPress={() => {
            // Reset the error boundary and force a route refresh to re-fetch server data
            startTransition(() => reset());
            router.refresh();
          }}
        >
          Try Again
        </Button>
        <Button variant="bordered" onPress={() => (window.location.href = "/dashboard")}>
          Go Home
        </Button>
      </div>
    </div>
  );
}
