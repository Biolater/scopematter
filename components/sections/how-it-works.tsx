"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Create your payment link",
      desc: "Select asset, network, and amount in your dashboard.",
      icon: "🧾",
    },
    {
      title: "Share with your client",
      desc: "They pay in fiat via Onramper (card or bank transfer).",
      icon: "📤",
    },
    {
      title: "Get paid instantly",
      desc: "Funds are sent directly to your wallet once payment clears.",
      icon: "🏦",
    },
  ];

  return (
    <section aria-labelledby="how-heading" className="px-6 lg:px-12" id="how">
      <div className="w-full">
        <h2
          className="text-2xl lg:text-3xl font-semibold text-center"
          id="how-heading"
        >
          How it works
        </h2>

        <div className="relative mx-auto mt-10 max-w-3xl">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-primary/50 to-transparent sm:block" />

          <ul className="space-y-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className="relative pl-16 sm:pl-20"
                initial={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true, amount: 0.4 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-2xl">
                  {s.icon}
                </span>
                {i < steps.length - 1 && (
                  <span className="absolute left-6 top-12 hidden h-full w-px bg-gradient-to-b from-primary/40 to-transparent sm:block" />
                )}
                <h3 className="font-semibold text-lg">{s.title}</h3>
                <p className="mt-1 text-sm text-default-600">{s.desc}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
