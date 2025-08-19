"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Drawer, DrawerBody, DrawerHeader, DrawerFooter } from "@heroui/drawer";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { SidebarLayout } from "@/components/sidebar-layout";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: {
    imageUrl?: string;
    name?: string;
  };
}

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/wallets", label: "Wallets" },
  { href: "/payment-links", label: "Payment Links" },
  { href: "/transactions", label: "Transactions" },
  { href: "/settings", label: "Settings" },
];

export default function DashboardLayout({
  children,
  user,
}: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <SidebarLayout>
      {children}
    </SidebarLayout>
  );
}
