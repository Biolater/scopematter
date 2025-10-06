import { Button } from "@heroui/button";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen py-10">
      <Button
        as={Link}
        href="/"
        variant="light"
        className="absolute top-4 left-4 flex items-center z-10"
      >
        <img
          src="/scopematter-brand.png"
          alt="ScopeMatter"
          className="h-12 -ml-3 w-auto"
        />
        <p className="font-bold -ml-3 text-inherit">ScopeMatter</p>
      </Button>
      {children}
    </div>
  );
}