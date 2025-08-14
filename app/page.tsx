"use client";

import HeroSection from "@/components/sections/Hero";
import HowItWorksSection from "@/components/sections/HowItWorks";
import BenefitsSection from "@/components/sections/Benefits";
import SupportSection from "@/components/sections/Support";
import FAQSection from "@/components/sections/FAQ";
// import CTAWaitlistSection from "@/components/sections/CTAWaitlist";

export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-0">
      <HeroSection />
      <div className="container mx-auto flex flex-col gap-24">
        <HowItWorksSection />
        <BenefitsSection />
        <SupportSection />
        <FAQSection />
        {/* <CTAWaitlistSection /> */}
      </div>
    </div>
  );
}
