import DashboardContent from "@/components/dashboard/dashboard-content";
import SectionHeader from "@/components/section-header";
import { Button } from "@heroui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";

export const dynamic = "force-dynamic";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View all your freelance projects, requests, and change orders in one place. Stay organized, prevent scope creep, and ensure every hour of your work gets paid.",
  openGraph: {
    title: "Dashboard – Freelance Project Overview | ScopeMatter",
    description:
      "Monitor your active projects, track requests, and manage scope changes effortlessly with ScopeMatter.",
    url: "https://scopematter.xyz/dashboard",
    siteName: "ScopeMatter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Dashboard – Freelance Project Overview | ScopeMatter",
    description:
      "Track your freelance projects, requests, and change orders. Avoid scope creep and protect your time with ScopeMatter.",
  },
};

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
