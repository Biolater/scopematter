import NextLink from "next/link";

const Footer = () => {
  return (
    <footer className="w-full py-8 border-t border-divider">
      <div className="container items-center mx-auto max-w-7xl px-6 flex justify-between flex-wrap gap-6 text-sm">
        <div>
          <NextLink
            href="#hero"
            className="flex items-center font-semibold tracking-tight"
          >
            <img
              src="/scopematter-brand.png"
              alt="Scopematter"
              className="h-12 w-auto"
            />
            <p className="font-bold text-inherit -ml-1">Scopematter</p>
          </NextLink>
        </div>
        <div className="text-center">
          <p className="text-default-600">muradyusubovdev@icloud.com</p>
        </div>
        <div className="md:text-right">
          <p className="text-default-600">© 2025 Scopematter</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;