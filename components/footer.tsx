import { Route } from "next";
import NextLink from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-divider">
      <div className="container mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        {/* Brand */}
        <NextLink
          href="#hero"
          className="flex items-center font-semibold tracking-tight"
        >
          <img
            src="/scopematter-brand.png"
            alt="ScopeMatter"
            className="h-10 w-auto"
          />
          <span className="ml-2 font-bold">ScopeMatter</span>
        </NextLink>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 text-default-600">
          <NextLink href="#how" className="hover:text-foreground">
            How it Works
          </NextLink>
          <NextLink href="#benefits" className="hover:text-foreground">
            Benefits
          </NextLink>
          <NextLink href="#faq" className="hover:text-foreground">
            FAQ
          </NextLink>
          <NextLink href="/terms" className="hover:text-foreground">
            Terms
          </NextLink>
          <NextLink href="/privacy" className="hover:text-foreground">
            Privacy
          </NextLink>
        </nav>

        {/* Contact + copyright */}
        <div className="text-center md:text-right">
          <a
            href="mailto:muradyusubovdev@icloud.com"
            className="block text-default-600 hover:text-foreground"
          >
            muradyusubovdev@icloud.com
          </a>
          <p className="text-default-500 mt-1">
            © {new Date().getFullYear()} ScopeMatter
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
