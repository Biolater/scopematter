import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { LandingNavbar } from "@/components/landing-navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import FloatThemeToggle from "@/components/float-theme-toggle";
import { Analytics } from "@vercel/analytics/next";
import LogoutButton from "@/components/logout-button";

export const metadata: Metadata = {
  metadataBase: new URL("https://knot.example"),
  title: {
    default: "Knot — Formalize Requirements. Manage Change. Get Paid.",
    template: "%s — Knot",
  },
  description:
    "Knot is a tool for freelance developers and agencies to prevent scope creep by formalizing project requirements and managing client change requests.",
  openGraph: {
    title: "Knot",
    description:
      "Knot is a tool for freelance developers and agencies to prevent scope creep by formalizing project requirements and managing client change requests.",
    url: "/",
    siteName: "Knot",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Knot" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knot",
    description:
      "Knot is a tool for freelance developers and agencies to prevent scope creep by formalizing project requirements and managing client change requests.",
    images: ["/og.png"],
    creator: "@knot",
  },
  keywords: [
    "scope creep",
    "change requests",
    "freelance developer tools",
    "project management",
    "client management",
    "software development",
    "requirements formalization",
    "freelancer contracts",
  ],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
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
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Analytics />
        <Providers themeProps={{ attribute: "class", defaultTheme: "system" }}>
          <div className="relative flex flex-col min-h-screen">
            <SmoothScroll />
            <main>{children}</main>
            <FloatThemeToggle />
          </div>
        </Providers>
      </body>
    </html>
  );
}
