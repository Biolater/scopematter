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
      title: "1. Define the Project Scope",
      desc: "List deliverables, timelines, and pricing upfront. ScopeMatter keeps everything structured — so what’s agreed is always clear.",
      icon: "📝",
    },
    {
      title: "2. Track Requests & Scope Changes",
      desc: "As the project evolves, log any new client requests. Each one is marked as in-scope or out-of-scope — so you never lose track of unpaid work.",
      icon: "📋",
    },
    {
      title: "3. Share Read-Only Project Views",
      desc: "Generate a secure link your client can open anytime to see the agreed scope, current progress, and change orders — no login, no edits, full transparency.",
      icon: "🔗",
    },
    {
      title: "4. Convert Extras into Paid Change Orders",
      desc: "When a request is out of scope, quickly turn it into a formal change order with defined cost and delivery impact — ready to invoice.",
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
          A structured workflow that helps freelancers{" "}
          <span className="font-semibold text-foreground">
            define scope, document every change, and show clients exactly what’s included —
            without needing them to sign in.
          </span>
        </motion.p>

        <motion.div
          className="mt-10 grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
        >
          {steps.map((s) => (
            <motion.div key={s.title} variants={itemVariants} className="h-full">
              <Card className="h-full border-default-400 bg-content2">
                <CardHeader className="flex-row items-start gap-4 p-5 lg:p-6">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-default-900">{s.title}</h3>
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
