import DashboardContent from "@/components/dashboard/dashboard-content";
import SectionHeader from "@/components/section-header";
import { Button } from "@heroui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <>
      <SectionHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your projects."
      >
        <Button
          startContent={<PlusIcon className="size-4" />}
          color="primary"
          as={Link}
          href="/projects"
        >
          New Project
        </Button>
      </SectionHeader>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </>
  );
}
