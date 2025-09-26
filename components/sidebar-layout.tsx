"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wallet as WalletIcon,
  Settings,
  Receipt,
  Link as LinkIcon,
  PanelLeft,
  Folders,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MainNavbar from "@/components/main-navbar"; // adjust path
import { usePathname } from "next/navigation";
import ScopematterLogo from "@/public/scopematter-brand.png";
import { usePersistentCollapsed } from "@/lib/hooks/use-persistent-collapsed";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-4.5 shrink-0" />,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: <Folders className="size-4.5 shrink-0" />,
  },
  {
    name: "Payment Links",
    href: "/payment-links",
    icon: <LinkIcon className="size-4.5 shrink-0" />,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: <Receipt className="size-4.5 shrink-0" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings className="size-4.5 shrink-0" />,
  },
];

function SidebarContent({
  isCollapsed = false,
  setIsCollapsed,
  fromMobile = false,
}: {
  isCollapsed?: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  fromMobile?: boolean;
}) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-full flex-col">
      {/* Logo / Brand */}
      <div
        className={`z-20 flex flex-none items-center justify-between overflow-hidden p-2 ${fromMobile ? "w-fit" : ""}`}
      >
        <Link prefetch href="/dashboard" className="flex items-center">
          <Image
            src={ScopematterLogo}
            alt="Scopematter Logo"
            width={47}
            height={47}
            className="h-[47px] w-[47px] shrink-0"
          />
        </Link>

        {!isCollapsed && (
          <Tooltip content="Collapse sidebar" placement="right" color="default">
            <Button
              variant="light"
              isIconOnly
              className="hidden md:flex"
              color="default"
              size="sm"
              onPress={() => setIsCollapsed(true)}
            >
              <PanelLeft className="size-4.5" />
            </Button>
          </Tooltip>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-x-hidden overflow-y-auto">
        <ul className="relative z-20 space-y-2 p-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Tooltip
                content={item.name}
                placement="right"
                isDisabled={!isCollapsed}
              >
                <Button
                  className={`justify-start min-w-auto ${isCollapsed ? "" : "w-full"} ${
                    isActive(item.href) ? "bg-default/60" : ""
                  }`}
                  as={Link}
                  href={item.href}
                  onPress={() => fromMobile && setIsCollapsed(true)}
                  variant="light"
                  startContent={item.icon}
                >
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <div className="ml-2 overflow-hidden">
                        <motion.span
                          style={{
                            display: "inline-block",
                            whiteSpace: "nowrap",
                          }}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.name}
                        </motion.span>
                      </div>
                    )}
                  </AnimatePresence>
                </Button>
              </Tooltip>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className="relative z-20 flex w-64 flex-col gap-3 overflow-hidden p-4">
        <div className="flex items-center overflow-hidden">
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "2rem", height: "2rem" },
              },
            }}
          />
          <div className="ml-3 flex-1 overflow-hidden">
            <motion.div
              className="flex flex-col"
              style={{ display: "inline-block" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-medium whitespace-nowrap">John Doe</p>
            </motion.div>
          </div>
        </div>

        {isCollapsed && (
          <Tooltip content="Expand sidebar" placement="right">
            <Button
              variant="light"
              onPress={() => setIsCollapsed(false)}
              isIconOnly
              color="default"
              size="sm"
            >
              <PanelLeft className="size-4.5" />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

export default function SidebarLayout({
  children,
  initialCollapsed,
}: {
  children: React.ReactNode;
  initialCollapsed: boolean; // <- from server cookie
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] =
    usePersistentCollapsed(initialCollapsed);

  return (
    <div className="relative flex h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={`relative hidden md:flex flex-col overflow-hidden border-r border-divider ${
          isCollapsed ? "w-16" : "w-64"
        } transition-all duration-300 ease-in-out`}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* RIGHT RAIL: click anywhere on the rail to expand when collapsed */}
        {isCollapsed && (
          <div
            className="group absolute inset-y-0 right-0 z-10 flex w-full cursor-ew-resize items-center justify-center bg-transparent"
            role="button"
            aria-label="Expand sidebar"
            tabIndex={0}
            onClick={() => setIsCollapsed(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setIsCollapsed(false);
            }}
          />
        )}
      </aside>

      {/* Mobile Drawer */}
      <Drawer
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        className="w-72 bg-background"
      >
        <DrawerContent>
          {(onClose) => (
            <SidebarContent
              isCollapsed={false}
              setIsCollapsed={(_next) => onClose()}
              fromMobile
            />
          )}
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <MainNavbar onMenuPress={() => setIsOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 max-w-7xl mx-auto sm:py-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
