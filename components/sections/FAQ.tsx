"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="px-6 md:px-12">
      <div className="w-full max-w-4xl mx-auto">
        <h2 id="faq-heading" className="text-2xl md:text-3xl font-semibold text-center">FAQ</h2>
        <Accordion className="mt-4" variant="splitted">
          <AccordionItem key="fees" aria-label="What fees do you charge?" title="What fees do you charge?">
            1.5% per transaction + on-ramp costs (shown upfront).
          </AccordionItem>
          <AccordionItem key="client-crypto" aria-label="Does my client need crypto?" title="Does my client need crypto?">
            No, they pay in fiat.
          </AccordionItem>
          <AccordionItem key="safe" aria-label="Is it safe?" title="Is it safe?">
            Yes, funds go directly to your wallet.
          </AccordionItem>
          <AccordionItem key="launch" aria-label="When are you launching?" title="When are you launching?">
            Q4 2025 (beta).
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}


