"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { motion } from "framer-motion";

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
      aria-labelledby="faq-heading"
      className="relative px-6 pb-24 md:px-12"
      id="faq"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
      />

      <div className="mx-auto w-full max-w-4xl">
        <motion.h2
          className="text-center text-2xl font-semibold md:text-3xl"
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          FAQ
        </motion.h2>
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
