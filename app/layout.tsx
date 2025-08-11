import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { LandingNavbar } from "@/components/landing-navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import FloatThemeToggle from "@/components/FloatThemeToggle";

export const metadata: Metadata = {
  metadataBase: new URL("https://paylynk.example"),
  title: {
    default: "PayLynk — Get paid in USDT/ETH from any client, instantly",
    template: "%s — PayLynk",
  },
  description:
    "Clients pay in USD via card or bank. You receive crypto directly in your wallet — fast, secure, and non‑custodial.",
  openGraph: {
    title: "PayLynk",
    description:
      "Clients pay in USD via card or bank. You receive crypto directly in your wallet — fast, secure, and non‑custodial.",
    url: "/",
    siteName: "PayLynk",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "PayLynk" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PayLynk",
    description:
      "Clients pay in USD via card or bank. You receive crypto directly in your wallet — fast, secure, and non‑custodial.",
    images: ["/og.png"],
    creator: "@paylynk",
  },
  keywords: [
    "crypto payments",
    "freelancer payments",
    "USDT",
    "ETH",
    "on-ramp",
    "Binance P2P",
    "global payments",
  ],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
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
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen">
            <SmoothScroll />
            <LandingNavbar />
            <main>{children}</main>
            <FloatThemeToggle />
            <footer className="w-full py-8 border-t border-divider">
              <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-semibold">PayLynk</p>
                  <p className="mt-2 text-default-600">
                    Get paid globally, instantly — without the payment barriers.
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-default-600">contact@paylynk.io</p>
                </div>
                <div className="md:text-right">
                  <p className="text-default-600">© 2025 PayLynk</p>
                  <div className="space-x-3">
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#">Terms</Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
