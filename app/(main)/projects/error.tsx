"use client";

import { useEffect } from "react";
import { Button } from "@heroui/button";
import { RefreshCwIcon } from "lucide-react";
import { Alert } from "@heroui/alert";

/**
 * Route-level error boundary for /projects.
 * Renders when server component data fetching throws.
 */
export default function ProjectsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: hook up to real error reporting
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4 max-w-md mx-auto">
      <Alert
        description={
          error.message ||
          "An unexpected error occurred, please try again later."
        }
        color="danger"
      />
      <div className="flex items-center gap-3">
        <Button
          startContent={<RefreshCwIcon className="size-4" />}
          variant="flat"
          color="primary"
          onPress={() => reset()}
        >
          Try Again
        </Button>
        <Button
          variant="bordered"
          onPress={() => (window.location.href = "/projects")}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}
