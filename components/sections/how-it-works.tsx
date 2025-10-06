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

function HowItWorksSection() {
  const steps = [
    {
      title: "Set the Project Scope",
      desc: "Create a clear proposal with deliverables, timelines, and costs. Everything defined upfront — no room for confusion.",
      icon: "📝",
    },
    {
      title: "Client Clicks Approve",
      desc: "Your client gets a simple, professional scope. One click to approve, and it’s locked in — no disputes later.",
      icon: "✅",
    },
    {
      title: "Every Change = Paid Work",
      desc: "New requests become formal change orders. You quote, client approves, and the updated cost is added to the project total — ready to invoice.",
      icon: "💸",
    },
  ];

  return (
    <section id="how" aria-labelledby="how-heading">
      <motion.div
        className="container mx-auto px-6 lg:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2
          id="how-heading"
          className="text-2xl lg:text-3xl font-semibold text-center text-default-900"
          variants={itemVariants}
        >
          How ScopeMatter Works
        </motion.h2>
        <motion.p
          className="mt-3 text-center text-balance text-default-600 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          A simple 3-step flow that keeps projects clear and ensures{" "}
          <span className="font-semibold text-foreground">
          every extra hour is tracked, approved, and ready to be billed.
          </span>
        </motion.p>

        <motion.div
          className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-3"
          variants={containerVariants}
        >
          {steps.map((s) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              className="h-full"
            >
              <Card className="h-full border-default-400 bg-content2">
                <CardHeader className="flex-row items-start gap-4 p-5 lg:p-6">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-default-900">
                      {s.title}
                    </h3>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 px-5 lg:px-6 pb-5 lg:pb-6">
                  <p className="text-sm text-default-700">{s.desc}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HowItWorksSection;
