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
import Image from "next/image";
import NavbarImage from "@/public/paylynk-navbar.png";
import navbarSvg from "@/public/file.svg";

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
      id="site-navbar"
      maxWidth="xl"
      position="sticky"
      isBordered
      isBlurred
    >
      <NavbarBrand className="-ml-3">
        <NextLink href="#hero" className="flex items-center font-semibold tracking-tight">
          <img src="/navbar-brand.png" alt="PayLynk" className="h-12 w-auto" />
          <p className="font-bold text-inherit -ml-2">PayLynk</p>
        </NextLink>
      </NavbarBrand>

      {/* Desktop nav */}
      <NavbarContent justify="end" className="hidden md:flex gap-5">
        <NavbarItem><a className={linkClass} href="#hero">Home</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#how">How It Works</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#benefits">Benefits</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#support">Support</a></NavbarItem>
        <NavbarItem><a className={linkClass} href="#faq">FAQ</a></NavbarItem>
        {/* <NavbarItem>
          <Button as="a" href="#waitlist" size="md" className="btn-primary">Join Waitlist</Button>
        </NavbarItem> */}
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
          // { href: "#waitlist", label: "Join Waitlist", primary: true },
        ].map((item) => (
          <NavbarMenuItem key={item.href}>
            {item.primary ? (
              <Button
                as="a"
                href={item.href}
                className="w-full btn-primary"
                size="md"
              >
                {item.label}
              </Button>
            ) : (
              <a
                href={item.href}
                className="block w-full py-3 text-default-600 hover:text-foreground"
              >
                {item.label}
              </a>
            )}
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
}


