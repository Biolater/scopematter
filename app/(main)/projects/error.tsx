"use client";

import { useEffect, startTransition } from "react";
import { Button } from "@heroui/button";
import { RefreshCwIcon } from "lucide-react";
import { Alert } from "@heroui/alert";
import { useRouter } from "next/navigation";

/**
 * Route-level error boundary for /projects.
 * Renders when server component data fetching throws.
 */
export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // TODO: hook up to real error reporting (e.g., Sentry, LogRocket)
    console.error("Projects error:", error);
  }, [error]);

  // Generate user-friendly error message
  const getUserMessage = () => {
    // In production with digest, show generic message
    if (!isDev && error.digest) {
      return "We're having trouble loading your projects. Please try again in a moment.";
    }

    // In development or for client-side errors, show actual message
    // But sanitize common server error messages
    const msg = error.message || "";
    if (
      msg.includes("Server Components render") ||
      msg.includes("digest")
    ) {
      return "Failed to load projects data. Please try refreshing the page.";
    }

    return msg || "An unexpected error occurred while loading projects.";
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center gap-4 max-w-md mx-auto">
      <Alert description={getUserMessage()} color="danger" />
      {isDev && error.digest && (
        <p className="text-xs text-muted font-mono">Digest: {error.digest}</p>
      )}
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
