"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";
import { siteConfig } from "@/config/site";

type AppChromeProps = {
  children: ReactNode;
};

export function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return (
      <div className="relative flex flex-col h-screen">
        <main className="container mx-auto max-w-7xl px-6 flex-grow flex items-center justify-center">
          {children}
        </main>
      </div>
    );
  }

  return (
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
  );
}


