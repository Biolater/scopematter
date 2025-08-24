"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";


export default function BenefitsSection() {
  const items = [
    {
      emoji: "✅",
      title: "Eliminate Scope Creep",
      desc: "Formalize the project scope upfront so there are no surprises or unpaid work.",
    },
    {
      emoji: "🤝",
      title: "Build Client Trust",
      desc: "Provide clients with a clear, professional process for managing project changes.",
    },
    {
      emoji: "💰",
      title: "Get Paid for Every Hour",
      desc: "Automate change requests and invoicing to ensure all your work is billed.",
    },
  ];

  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="px-6 lg:px-12"
    >
      <h2
        id="benefits-heading"
        className="text-2xl lg:text-3xl font-semibold text-center text-default-900"
      >
        Focus on Code, Not on Chasing Payments
      </h2>
      <div className="mt-8 grid gap-4 sm:gap-6 lg:grid-cols-3">
        {items.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
          >
            <Card className="h-full border-default-400 bg-content2">
              <CardHeader className="flex items-start gap-4 p-5 md:p-6">
                <div className="h-10 w-10 rounded-lg bg-secondary/15 text-secondary flex items-center justify-center text-xl flex-shrink-0">
                  <span aria-hidden>{b.emoji}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg text-default-900">
                    {b.title}
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-sm text-default-700">{b.desc}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
