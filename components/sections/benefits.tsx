"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
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

export default function BenefitsSection() {
  const items = [
    {
      emoji: "🛡️",
      title: "Lock the Scope",
      desc: "Define deliverables, timelines, and acceptance criteria upfront. Extras are out-of-scope by default—no free work.",
    },
    {
      emoji: "🤝",
      title: "Transparent for Clients",
      desc: "Simple approvals and a clear audit trail build trust and end debates. Point to the system, not to a chat thread.",
    },
    {
      emoji: "💸",
      title: "Every Change = Paid",
      desc: "New requests turn into quotes and approved line items automatically, so every extra hour is tracked, approved, and ready to be billed.",
    },
  ];

  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="px-6 lg:px-12"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          id="benefits-heading"
          className="text-2xl lg:text-3xl font-semibold text-center text-default-900"
          variants={itemVariants}
        >
          Ship faster. Get paid fairly.
        </motion.h2>
        <motion.p
          className="mt-3 text-center text-balance text-default-600 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          ScopeMatter removes ambiguity, automates change orders, and makes sure{" "}
          <span className="font-semibold text-foreground">
            every extra hour is tracked, approved, and ready to be billed.
          </span>
        </motion.p>

        <motion.div
          className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-3"
          variants={containerVariants}
        >
          {items.map((b) => (
            <motion.div
              key={b.title}
              variants={itemVariants}
              className="h-full"
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
        </motion.div>
      </motion.div>
    </section>
  );
}
