"use client";

import HeroSection from "@/components/sections/hero";
import HowItWorksSection from "@/components/sections/how-it-works";
import BenefitsSection from "@/components/sections/benefits";
import SupportSection from "@/components/sections/support";
import FAQSection from "@/components/sections/faq";
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
