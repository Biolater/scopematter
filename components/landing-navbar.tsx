"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { Route } from "next";
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
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/nextjs";

export function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#how", label: "How It Works" },
    { href: "#benefits", label: "Benefits" },
    { href: "#faq", label: "FAQ" },
  ];

  const legalItems = [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
  ];

  const handleNavItemClick = (href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("#")) {
      // Smooth scroll to section
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 80;
        const elementPosition =
          element.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;
        window.scrollTo({ top: elementPosition, behavior: "smooth" });
      }
    }
  };

  return isSignedIn ? (
    <></>
  ) : (
    <HeroUINavbar
      isBlurred
      isBordered
      id="site-navbar"
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className="-ml-3 grow-0 basis-auto">
        <NextLink
          className="flex items-center shrink-0 font-semibold tracking-tight"
          href={isSignedIn ? "/dashboard" : "#hero"}
        >
          <img
            alt="ScopeMatter"
            className="h-12 w-auto"
            src="/scopematter-brand.png"
          />
          <p className="font-bold text-inherit -ml-1">ScopeMatter</p>
        </NextLink>
      </NavbarBrand>

      {/* Desktop navigation */}
      <NavbarContent className="hidden md:flex gap-4" justify="end">
        <SignedOut>
          <div className="flex gap-4 mx-auto">
            {navItems.map((item) => (
              <NavbarItem key={item.href}>
                <button
                  className="text-sm hover:text-foreground/80 cursor-pointer transition-colors"
                  onClick={() => handleNavItemClick(item.href)}
                >
                  {item.label}
                </button>
              </NavbarItem>
            ))}

            {/* Legal links */}
            {legalItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  href={item.href as Route}
                  className="text-sm hover:text-foreground/80 transition-colors"
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>

          <NavbarItem>
            <Button as={NextLink} href="/sign-in" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={NextLink} color="primary" href="/sign-up">
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
        <SignedIn>
          <UserButton />
        </SignedIn>
        <NavbarMenuToggle aria-label="Open menu" />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="overflow-hidden">
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <button
              className="w-full cursor-pointer block hover:text-foreground/80 transition-colors text-left"
              onClick={() => handleNavItemClick(item.href)}
            >
              {item.label}
            </button>
          </NavbarMenuItem>
        ))}

        {/* Legal items */}
        {legalItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <NextLink
              href={item.href as Route}
              className="block w-full text-left hover:text-foreground/80 transition-colors"
            >
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}

        <SignedOut>
          <NavbarMenuItem>
            <NextLink className="w-full" href={"/sign-in" as Route}>
              <Button fullWidth variant="flat">
                Sign In
              </Button>
            </NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <NextLink className="w-full" href={"/sign-up" as Route}>
              <Button fullWidth color="primary">
                Sign Up
              </Button>
            </NextLink>
          </NavbarMenuItem>
        </SignedOut>
      </NavbarMenu>
    </HeroUINavbar>
  );
}
