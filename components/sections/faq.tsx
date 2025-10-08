"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const faqItems = [
  {
    key: "how-different",
    title: "How is this different from Jira, Trello, or other PM tools?",
    content:
      "ScopeMatter isn’t a project-management board. It’s a scope-control layer that sits above your existing workflow. Instead of tracking tasks, it tracks agreements — what was originally included and what became an extra, with a record ready to invoice.",
  },
  {
    key: "client-experience",
    title: "Will my non-technical clients find this difficult to use?",
    content:
      "No. Clients don’t need an account or complex dashboards. You share a secure read-only link where they can see the agreed scope, new requests, and change orders — everything is transparent, nothing editable.",
  },
  {
    key: "payments",
    title: "How does this help me get paid?",
    content:
      "Every new request is categorized as in-scope or out-of-scope. Out-of-scope items are formalized into change orders with defined pricing and delivery impact, giving you a clean, documented trail for billing and preventing unpaid work.",
  },
  {
    key: "is-it-for-me",
    title: "Who is ScopeMatter for?",
    content:
      "ScopeMatter is built for freelance developers and small agencies who want a lightweight system to prevent scope creep, keep clients informed, and turn extra requests into clearly billable work — without switching to heavy PM software.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="px-6 md:px-12">
      <motion.div
        className="w-full max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          id="faq-heading"
          className="text-2xl md:text-3xl font-semibold text-center text-default-900"
          variants={itemVariants}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.div className="mt-8" variants={containerVariants}>
          <Accordion variant="splitted">
            {faqItems.map(({ key, title, content }) => (
              <AccordionItem key={key} title={title}>
                <p className="text-default-600">{content}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}
