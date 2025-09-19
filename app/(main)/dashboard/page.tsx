import DashboardContent from "@/components/dashboard/dashboard-content";
import SectionHeader from "@/components/section-header";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <SectionHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your projects."
      >
        <Button color="primary" as={Link} href="/projects">
          New Project
        </Button>
      </SectionHeader>
      <DashboardContent />
    </>
  );
}
