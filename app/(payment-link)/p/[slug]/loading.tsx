"use client";

import { Spinner } from "@heroui/spinner";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden">
      {/* subtle background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div className="absolute -inset-[40%] bg-[radial-gradient(60%_60%_at_50%_40%,theme(colors.primary/15),transparent_70%)]" />
      </div>

      <div className="relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-divider bg-background/70 backdrop-blur-xl shadow-large">
        <div className="text-xl font-semibold tracking-tight">PayLynk</div>

        <Spinner
          size="lg"
          color="primary"
          label="Loading…"
          classNames={{
            label: "text-foreground-500 mt-1",
            circle1: "stroke-primary",
            circle2: "stroke-primary-400",
          }}
        />

        <p className="text-xs text-foreground-500">
          Securing connection • Preparing widgets
        </p>
      </div>
    </div>
  );
}
