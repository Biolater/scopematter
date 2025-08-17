"use client";

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
      aria-labelledby="benefits-heading"
      className="px-6 lg:px-12"
      id="benefits"
    >
      <h2
        className="text-2xl lg:text-3xl font-semibold text-center"
        id="benefits-heading"
      >
        Benefits
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {items.map((b, i) => (
          <motion.div
            key={b.title}
            className="relative rounded-xl bg-content1/70 p-px backdrop-blur-md"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="h-full rounded-xl bg-content1 p-6 shadow-sm transition-shadow hover:shadow-lg">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/15 text-2xl">
                  {b.emoji}
                </span>
                <h3 className="font-semibold text-lg">{b.title}</h3>
              </div>
              <p className="mt-4 text-sm text-default-600">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
