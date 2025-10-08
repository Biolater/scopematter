"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Chip } from "@heroui/chip";
import { Sun, Bell, Shield, CreditCard, Puzzle, Wrench } from "lucide-react";
import { Route } from "next";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const items = [
  {
    label: "Theme",
    href: "/settings/theme",
    icon: <Sun className="size-4.5" />,
    enabled: true,
  },
  {
    label: "Notifications",
    href: "/settings/notifications",
    icon: <Bell className="size-4.5" />,
    enabled: false,
  },
  {
    label: "Data & Privacy",
    href: "/settings/data-privacy",
    icon: <Shield className="size-4.5" />,
    enabled: false,
  },
  {
    label: "Billing & Subscription",
    href: "/settings/billing-subscription",
    icon: <CreditCard className="size-4.5" />,
    enabled: false,
  },
  {
    label: "Integrations",
    href: "/settings/integrations",
    icon: <Puzzle className="size-4.5" />,
    enabled: false,
  },
  {
    label: "Developer Settings",
    href: "/settings/developer",
    icon: <Wrench className="size-4.5" />,
    enabled: false,
  },
];

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
      <aside className="md:sticky md:top-4 h-fit">
        <div className="mb-3">
          <h1 className="text-xl font-semibold text-foreground">Settings</h1>
          <p className="text-sm text-default-600">Manage your preferences</p>
        </div>
        <div className="rounded-xl border border-divider bg-content1 p-2">
          <nav aria-label="Settings sections">
            <ul className="space-y-1">
              {items.map((item) => {
                const active = pathname === item.href;
                if (!item.enabled) {
                  return (
                    <li key={item.href}>
                      <div
                        role="link"
                        aria-disabled="true"
                        className="group flex items-center gap-3 rounded-md px-3 py-2 text-sm text-default-400 cursor-not-allowed"
                      >
                        <span className="text-default-400">{item.icon}</span>
                        <span className="flex-1">{item.label}</span>
                        <Chip
                          size="sm"
                          radius="sm"
                          className="text-xs"
                          color="default"
                        >
                          Coming soon
                        </Chip>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href as Route}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-default/60 text-default-600"
                      }`}
                    >
                      <span
                        className={`shrink-0 ${active ? "text-primary" : "text-default-600 group-hover:text-foreground"}`}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <section aria-live="polite" className="min-h-[420px]">
        {children}
      </section>
    </div>
  );
}
