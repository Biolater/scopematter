"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";

export default function BenefitsSection() {
  const items = [
    {
      emoji: "⚡",
      title: "Get paid in minutes",
      desc: "Clients pay in fiat, you receive crypto directly to your wallet.",
    },
    {
      emoji: "🛠️",
      title: "No crypto setup for clients",
      desc: "Clients can pay without a wallet or any crypto knowledge.",
    },
    {
      emoji: "🔐",
      title: "You control your funds",
      desc: "Non-custodial — we never hold your crypto.",
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
        className="text-2xl lg:text-3xl font-semibold text-center"
      >
        Benefits
      </h2>
      <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-3">
        {items.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
          >
            <Card radius="lg" shadow="sm">
              <CardHeader className="flex items-start gap-3 p-5 md:p-6">
                <div className="h-10 w-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-lg flex-shrink-0">
                  <span aria-hidden>{b.emoji}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">
                    {b.title}
                  </h3>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-5 md:px-6 pb-5 md:pb-6">
                <p className="text-sm text-default-600">{b.desc}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
