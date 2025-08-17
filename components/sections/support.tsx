"use client";

import { motion } from "framer-motion";

export default function SupportSection() {
  const tokens = ["USDT", "ETH"];
  const networks = ["Polygon", "Tron", "Ethereum"];

  return (
    <section
      aria-labelledby="support-heading"
      className="px-6 lg:px-12"
      id="support"
    >
      <div className="w-full">
        <h2
          className="text-2xl lg:text-3xl font-semibold text-center"
          id="support-heading"
        >
          Supported tokens & networks
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center">
            <h3 className="mb-4 font-medium text-default-700">Tokens</h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {tokens.map((t, i) => (
                <motion.li
                  key={t}
                  className="rounded-full border border-default-300/70 bg-content1 px-5 py-2 text-sm shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="mb-4 font-medium text-default-700">Networks</h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {networks.map((n, i) => (
                <motion.li
                  key={n}
                  className="rounded-full border border-default-300/70 bg-content1 px-5 py-2 text-sm shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  {n}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
