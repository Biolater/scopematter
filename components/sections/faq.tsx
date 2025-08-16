"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";

const faqItems = [
  {
    key: "fees",
    title: "What fees do you charge?",
    content:
      "1.5% PayLynk fee + on-ramp fees (shown before payment) + standard network gas.",
  },
  {
    key: "client-crypto",
    title: "Does my client need crypto?",
    content:
      "No. They pay in fiat via Onramper (card/bank transfer), KYC may apply.",
  },
  {
    key: "custody",
    title: "Is PayLynk custodial?",
    content:
      "No. Funds go directly from the on-ramp to your wallet — we never hold them.",
  },
  {
    key: "speed",
    title: "How fast will I get paid?",
    content:
      "Usually within minutes of on-ramp approval, subject to provider checks/network load.",
  },
  {
    key: "tokens",
    title: "Which tokens/networks are supported?",
    content:
      "USDT (Ethereum ERC-20, Tron TRC-20) and ETH (Ethereum) at launch.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="px-6 md:px-12 pb-24"
    >
      <div className="w-full max-w-4xl mx-auto">
        <h2
          id="faq-heading"
          className="text-2xl md:text-3xl font-semibold text-center"
        >
          FAQ
        </h2>
        <Accordion className="mt-4" variant="splitted">
          {faqItems.map(({ key, title, content }) => (
            <AccordionItem key={key} title={title}>
              {content}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
