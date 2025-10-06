import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontInter } from "@/config/fonts";
import { LandingNavbar } from "@/components/landing-navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import FloatThemeToggle from "@/components/float-theme-toggle";
import { Analytics } from "@vercel/analytics/next";
import LogoutButton from "@/components/logout-button";

export const metadata: Metadata = {
  metadataBase: new URL("https://scopematter.xyz"),
  title: {
    default: "ScopeMatter – Prevent Scope Creep and Protect Your Billable Hours",
    template: "%s – ScopeMatter | Freelance Scope Management Tool",
  },
  description:
    "ScopeMatter helps freelance developers and small agencies formalize project requirements, manage client change requests, and prevent unpaid work.",
  openGraph: {
    title: "ScopeMatter – Prevent Scope Creep and Protect Your Billable Hours",
    description:
      "Formalize your project scope, manage change requests, and ensure every extra request gets billed transparently.",
    url: "https://scopematter.xyz",
    siteName: "ScopeMatter",
    images: [
      {
        url: "/og-scopematter.jpg",
        width: 1200,
        height: 630,
        alt: "ScopeMatter – Freelance Scope Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScopeMatter – Prevent Scope Creep and Protect Your Billable Hours",
    description:
      "A tool for freelance developers and agencies to formalize project requirements and manage client change requests without losing income to scope creep.",
    images: ["/og-scopematter.jpg"],
    creator: "@ScopeMatterApp",
  },
  keywords: [
    "scope creep software",
    "freelance project scope tool",
    "change request management",
    "client approval system",
    "freelancer contract automation",
    "project scope tracking app",
    "prevent unpaid work freelancers",
  ],
  alternates: { canonical: "https://scopematter.xyz" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-inter antialiased",
          fontInter.className
        )}
      >
        <Analytics />
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          <div className="relative flex flex-col min-h-screen">
            <SmoothScroll />
            {children}
            <FloatThemeToggle />
            <SpeedInsights />
          </div>
        </Providers>
      </body>
    </html>
  );
}