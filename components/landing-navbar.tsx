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
    /*     { href: "#support", label: "Support" }, */
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

  return isSignedIn ? (
    <></>
  ) : (
    <HeroUINavbar
      isBlurred
      isBordered
      id="site-navbar"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      position="sticky"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand className="-ml-3">
        <NextLink
          className="flex items-center font-semibold tracking-tight"
          href={isSignedIn ? "/dashboard" : "#hero"}
        >
          <img alt="Scopematter" className="h-12 w-auto" src="/scopematter-brand.png" />
          <p className="font-bold text-inherit -ml-1">Scopematter</p>
        </NextLink>
      </NavbarBrand>

      {/* Desktop nav */}
      <NavbarContent className="hidden md:flex gap-4" justify="end">
        <SignedOut>
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
          <NavbarItem>
            <Button as={NextLink} href="/waitlist" color="primary" variant="flat">
              Join Waitlist
            </Button>
          </NavbarItem>
          {/*           <NavbarItem>
            <Button as={NextLink} href="/sign-in" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={NextLink} color="primary" href="/sign-up">
              Sign Up
            </Button>
          </NavbarItem> */}
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
          <Button as={NextLink} href="/waitlist" color="primary" variant="flat">
            Join Waitlist
          </Button>
        {/*         <SignedOut>
          <NavbarMenuItem>
            <NextLink className="w-full" href="/sign-in">
              <Button fullWidth variant="flat">
                Sign In
              </Button>
            </NextLink>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <NextLink className="w-full" href="/sign-up">
              <Button fullWidth color="primary">
                Sign Up
              </Button>
            </NextLink>
          </NavbarMenuItem>
        </SignedOut> */}
      </NavbarMenu>
    </HeroUINavbar>
  );
}