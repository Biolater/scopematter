import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://chainpay.example"),
  title: {
    default: `${siteConfig.name} — Get paid globally, instantly`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    url: "/",
    siteName: `${siteConfig.name}`,
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "ChainPay" },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name}`,
    description: siteConfig.description,
    images: ["/og.png"],
    creator: "@chainpay",
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
  icons: {
    icon: "/favicon.ico",
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
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full py-8 border-t border-default-200/60">
              <div className="container mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-semibold">{siteConfig.name}</p>
                  <p className="mt-2 text-default-600">{siteConfig.description}</p>
                </div>
                <nav className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Product</p>
                    <ul className="mt-2 space-y-1">
                      <li><Link href="/pricing">Pricing</Link></li>
                      <li><Link href="/docs">Docs</Link></li>
                      <li><Link href="/blog">Blog</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Company</p>
                    <ul className="mt-2 space-y-1">
                      <li><Link href="/about">About</Link></li>
                      <li><Link isExternal href={siteConfig.links.github}>GitHub</Link></li>
                      <li><Link isExternal href={siteConfig.links.discord}>Community</Link></li>
                    </ul>
                  </div>
                </nav>
                <div className="md:text-right">
                  <p className="text-default-600">© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
