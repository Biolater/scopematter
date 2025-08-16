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
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass =
    "text-sm text-muted hover:text-foreground transition-colors";

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#how", label: "How It Works" },
    { href: "#benefits", label: "Benefits" },
    { href: "#support", label: "Support" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleNavItemClick = (href: string) => {
    setIsMenuOpen(false);

    // Smooth scroll to section with offset for navbar height
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80; // Approximate navbar height
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <HeroUINavbar
      id="site-navbar"
      maxWidth="xl"
      position="sticky"
      isBordered
      isBlurred
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      <NavbarBrand className="-ml-3">
        <NextLink
          href="#hero"
          className="flex items-center font-semibold tracking-tight"
        >
          <img src="/navbar-brand.png" alt="PayLynk" className="h-12 w-auto" />
          <p className="font-bold text-inherit -ml-2">PayLynk</p>
        </NextLink>
      </NavbarBrand>

      {/* Desktop nav */}
      <NavbarContent justify="end" className="hidden md:flex gap-4">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <button
              onClick={() => handleNavItemClick(item.href)}
              className="text-sm hover:text-foreground/80 cursor-pointer transition-colors"
            >
              {item.label}
            </button>
          </NavbarItem>
        ))}
        <SignedOut>
          <NavbarItem>
            <Button as={NextLink} href="/sign-in" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={NextLink} href="/sign-up" color="primary">
              Sign Up
            </Button>
          </NavbarItem>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </NavbarContent>

      {/* Mobile toggle */}
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle aria-label="Open menu" />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="overflow-hidden">
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <button
              onClick={() => handleNavItemClick(item.href)}
              className="w-full cursor-pointer block hover:text-foreground/80 transition-colors text-left"
            >
              {item.label}
            </button>
          </NavbarMenuItem>
        ))}
        <SignedOut>
          <NavbarMenuItem>
            <NextLink href="/sign-in" className="w-full">
              <Button fullWidth variant="flat">
                Sign In
              </Button>
            </NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <NextLink href="/sign-up" className="w-full">
              <Button fullWidth color="primary">
                Sign Up
              </Button>
            </NextLink>
          </NavbarMenuItem>
        </SignedOut>
        <SignedIn>
          <NavbarMenuItem>
            <UserButton />
          </NavbarMenuItem>
        </SignedIn>
      </NavbarMenu>
    </HeroUINavbar>
  );
}
