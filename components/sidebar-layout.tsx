"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { Tooltip } from "@heroui/tooltip";
import { Button } from "@heroui/button";
import PayLynkLogo from "@/public/navbar-brand.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Wallet,
  Settings,
  Receipt,
  Link as LinkIcon,
  PanelLeft,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import MainNavbar from "./main-navbar";
import { usePathname } from "next/navigation";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="size-4.5" />,
  },
  { name: "Wallets", href: "/wallets", icon: <Wallet className="size-4.5" /> },
  {
    name: "Payment Links",
    href: "/payment-links",
    icon: <LinkIcon className="size-4.5" />,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: <Receipt className="size-4.5" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings className="size-4.5" />,
  },
];

const SidebarContent = ({
  isCollapsed = false,
  setIsCollapsed,
  fromMobile = false,
}: {
  isCollapsed?: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  fromMobile?: boolean;
}) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <div className="flex flex-col h-full">
    {/* Logo / Brand */}
    <div
      className={`p-2 flex justify-between items-center flex-none overflow-hidden z-20 ${
        fromMobile ? "w-fit" : ""
      }`} // FIX: prevent shrink, clip overflow
    >
      <Link href="/dashboard" className="flex items-center">
        <Image
          src={PayLynkLogo}
          alt="PayLynk Logo"
          width={47}
          height={47}
          className="w-[47px] h-[47px] shrink-0" // FIX: lock logo size
        />
      </Link>

      {/* Collapse button (top-right) */}
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
    <nav className="flex-1 overflow-y-auto overflow-x-hidden">
      <ul className="space-y-2 p-2 z-20 relative">
        {" "}
        {/* FIX: small right padding to avoid text touch */}
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
                      {" "}
                      {/* FIX: clip during animation to avoid overlap */}
                      <motion.span
                        style={{
                          display: "inline-block",
                          whiteSpace: "nowrap",
                        }} // FIX: keep on one line, no wrap
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
    <div className="p-4 w-64 flex flex-col overflow-hidden gap-3 z-20 relative">
      <div className="flex items-center overflow-hidden">
        {" "}
        {/* FIX: clip content while animating out */}
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                width: "2rem",
                height: "2rem",
              },
            },
          }}
        />
        <div className="ml-3 overflow-hidden flex-1">
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

      {/* Expand button (bottom, only when collapsed) */}
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
};

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside
        className={`relative hidden md:flex flex-col overflow-hidden border-r border-divider
          ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300 ease-in-out`}
      >
        <SidebarContent
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* RIGHT RAIL: visible only when collapsed */}
        {isCollapsed && (
          <div
            className="group absolute inset-y-0 right-0 z-10 flex w-full items-center justify-center
                       bg-transparent cursor-ew-resize"
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

      {/* Mobile Drawer (same look & width as desktop sidebar) */}
      <Drawer
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        placement="left"
        className="w-72 bg-background"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <SidebarContent
                isCollapsed={false}
                setIsCollapsed={onClose}
                fromMobile={true}
              />
            </>
          )}
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <MainNavbar onMenuPress={() => setIsOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};
