"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import clsx from "clsx";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = "text-sm text-muted hover:text-foreground transition-colors";

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      isBordered
      isBlurred
    >
      <NavbarBrand>
        <NextLink href="#hero" className="font-semibold tracking-tight">Chainpay</NextLink>
      </NavbarBrand>

      {/* Desktop nav */}
      <NavbarContent justify="end" className="hidden md:flex gap-5">
        <NavbarItem><a className={linkClass} href="#hero">Home</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#how">How It Works</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#benefits">Benefits</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#support">Support</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#faq">FAQ</a></NavbarItem>
        <NavbarItem>
          <a href="#waitlist" className="btn-primary">Join Waitlist</a>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile toggle */}
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle aria-label="Open menu" />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        {[
          { href: "#hero", label: "Home" },
          { href: "#how", label: "How It Works" },
          { href: "#benefits", label: "Benefits" },
          { href: "#support", label: "Support" },
          { href: "#faq", label: "FAQ" },
          { href: "#waitlist", label: "Join Waitlist", primary: true },
        ].map((item) => (
          <NavbarMenuItem key={item.href}>
            <a
              href={item.href}
              className={clsx(
                "block w-full py-3",
                item.primary
                  ? "font-medium text-primary"
                  : "text-default-600 hover:text-foreground",
              )}
            >
              {item.label}
            </a>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
}


