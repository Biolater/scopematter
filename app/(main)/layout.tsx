import { LandingNavbar } from "@/components/landing-navbar";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return    <>
    <LandingNavbar />
    {children}
    <Footer />
  </>;
}
