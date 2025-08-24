"use client";

import { Button } from "@heroui/button";

export default function PaymentLinksError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-4">
      <div className="mb-2 text-danger">⚠️ {error.message}</div>
      <Button color="danger" onPress={() => reset()}>
        Retry
      </Button>
    </div>
  );
}
