"use client";

import { Accordion, AccordionItem } from "@heroui/accordion";


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
      <div className="w-full max-w-4xl mx-auto">
        <h2
          id="faq-heading"
          className="text-2xl md:text-3xl font-semibold text-center text-default-900"
        >
          Frequently Asked Questions
        </h2>
        <Accordion variant="splitted" className="mt-8">
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