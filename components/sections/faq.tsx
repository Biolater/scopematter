"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const faqItems = [
  {
    key: "how-different",
    title: "How is this different from Jira, Trello, or other PM tools?",
    content:
      "Scopematter is not a task manager. It's a financial agreement tool. It focuses on locking in the initial project scope and providing a clear, billable trail for any approved changes, ensuring you get paid for all your work.",
  },
  {
    key: "client-experience",
    title: "Will my non-technical clients find this difficult to use?",
    content:
      "No. The client interface is designed to be extremely simple. They receive a clear proposal and approve changes with a click. It builds trust by framing scope changes professionally, rather than through messy email chains.",
  },
  {
    key: "payments",
    title: "How does this help me get paid?",
    content:
      "Scopematter creates a formal, e-signature-style agreement on the scope and any changes. This gives you a clear record of what the client approved, eliminating disputes over extra work and providing the documentation you need to invoice confidently.",
  },
  {
    key: "is-it-for-me",
    title: "Who is Scopematter for?",
    content:
      "Scopematter is built for freelance developers and small agencies who are tired of losing money and time to scope creep, especially when working with clients who may not be familiar with the development process.",
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
        <motion.div
          className="mt-8"
          variants={containerVariants}
        >
          <Accordion variant="splitted">
            {faqItems.map(({ key, title, content }) => (
              <motion.div key={key} variants={itemVariants}>
                <AccordionItem key={key} title={title}>
                  {content}
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}