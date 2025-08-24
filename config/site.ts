export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Knot",
  description:
    "Get paid globally, instantly — without the payment barriers. Clients pay by card/bank; you receive USDT or ETH direct to your wallet.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/your-org/knot",
    twitter: "https://twitter.com/knot",
    docs: "https://docs.knot.example",
    discord: "https://discord.gg/knot",
    sponsor: "https://buymeacoffee.com/knot",
  },
};
