import SettingsPageLayout from "@/components/settings/settings-page-layout";
import { Metadata } from "next";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Customize your ScopeMatter experience. Manage theme, notifications, billing, integrations, and developer preferences.",
  openGraph: {
    title: "Settings – Manage Preferences | ScopeMatter",
    description:
      "Adjust your preferences, themes, and integrations in ScopeMatter to make project management effortless.",
    url: "https://scopematter.xyz/settings",
    siteName: "ScopeMatter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Settings – Manage Preferences | ScopeMatter",
    description:
      "Manage your theme, notifications, and integrations in ScopeMatter — keep your workspace tailored to you.",
  },
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <SettingsPageLayout>{children}</SettingsPageLayout>;
}
