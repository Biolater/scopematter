"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import { CoinIcon, NetworkIcon, ShieldIcon } from "@/components/icons";

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-12">
      {/* Hero */}
      <section className="pt-2 relative">
        {/* Masked gradient background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 h-64 [mask-image:radial-gradient(closest-side,black,transparent)] bg-gradient-to-r from-primary/20 via-primary/10 to-transparent"
        />
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full border border-default-200/60 px-3 py-1 text-xs text-default-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Binance P2P playbook built‑in</span>
            <Link href="#" color="primary">
              See how
            </Link>
          </motion.div>

          <motion.h1
            className="mt-4 text-4xl md:text-6xl font-bold leading-tight"
            variants={fadeInUp}
          >
            Crypto payments{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              without the chaos
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 text-default-600 text-base md:text-lg"
            variants={fadeInUp}
          >
            ChainPay helps freelancers receive USDT/BTC and convert to cash via
            Binance P2P—fast, clean, safe.
          </motion.p>

          <motion.form
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            variants={fadeInUp}
          >
            <Input
              aria-label="Email address"
              className="flex-1"
              labelPlacement="outside"
              placeholder="you@company.com"
              type="email"
            />
            <Button
              color="primary"
              className="sm:shrink-0"
              size="lg"
              type="button"
            >
              Join Early Access
            </Button>
          </motion.form>

          <motion.div
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-default-500"
            variants={fadeInUp}
          >
            <div className="flex items-center justify-center gap-2">
              <NetworkIcon className="text-default-500" size={16} /> 30+
              countries
            </div>
            <div className="flex items-center justify-center gap-2">
              <CoinIcon className="text-default-500" size={16} /> USDT / BTC
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldIcon className="text-default-500" size={16} /> &lt;15 min
              P2P cash‑out
            </div>
          </motion.div>
        </motion.div>

        {/* Floating stickers */}
        <motion.div
          className="hidden md:block absolute left-8 top-8"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CoinIcon className="text-primary" size={28} />
        </motion.div>
        <motion.div
          className="hidden md:block absolute right-10 top-16"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <NetworkIcon className="text-primary" size={28} />
        </motion.div>
        <motion.div
          className="hidden md:block absolute right-24 -bottom-2"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <ShieldIcon className="text-primary" size={28} />
        </motion.div>
      </section>

      {/* Problems */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            emoji: "🧭",
            title: "Clients don’t know how to send crypto",
            desc: "Step-by-step instructions make it foolproof for clients.",
          },
          {
            emoji: "🛑",
            title: "Wrong network = lost money",
            desc: "We validate network and asset before payment is sent.",
          },
          {
            emoji: "⏱️",
            title: "Binance P2P is confusing and slow",
            desc: "Guided P2P cash‑out flow speeds up settlement.",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className="flex items-start gap-3 p-2 md:p-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
          >
            <div className="h-10 w-10 rounded-full bg-primary/15 text-primary flex items-center justify-center text-lg flex-shrink-0">
              <span aria-hidden>{card.emoji}</span>
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">
                {card.title}
              </h3>
              <p className="mt-1 text-sm text-default-600">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Solution Steps – timeline */}
      <section>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-sm font-semibold tracking-wider text-default-500">
            How it works
          </h2>
          <ol className="mt-6 relative grid gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Generate payment link",
                desc: "Exact amount, asset, and chain—no guesswork.",
              },
              {
                step: 2,
                title: "Client pays on correct network",
                desc: "Checks and inline tips keep them on track.",
              },
              {
                step: 3,
                title: "Cash‑out via Binance P2P",
                desc: "Guided flow to convert safely to local currency.",
              },
            ].map((s, i) => (
              <motion.li
                key={s.step}
                className="pl-0"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    {s.step}
                  </span>
                  <span className="font-semibold">{s.title}</span>
                </div>
                <p className="mt-2 text-sm text-default-600">{s.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              quote:
                "Before ChainPay, half my clients got stuck on networks. Now invoices get paid same day.",
              author: "Aisha, Designer (NG)",
            },
            {
              quote:
                "The P2P cash‑out guide is gold. No more guessing which ads to pick on Binance.",
              author: "Mehmet, Developer (TR)",
            },
          ].map((t, i) => (
            <motion.blockquote
              key={i}
              className="border-l-2 border-default-200 pl-4"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <p className="text-default-800">“{t.quote}”</p>
              <footer className="mt-2 text-sm text-default-500">
                — {t.author}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section>
        <div className="mx-auto max-w-3xl text-center">
          <motion.h3
            className="text-2xl md:text-3xl font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Want faster crypto payments?
          </motion.h3>
          <motion.p
            className="mt-2 text-default-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Request Early Access and be first to try ChainPay.
          </motion.p>
          <motion.form
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Input
              aria-label="Email address"
              className="flex-1"
              labelPlacement="outside"
              placeholder="you@company.com"
              type="email"
            />
            <Button
              color="primary"
              className="sm:shrink-0"
              size="lg"
              type="button"
            >
              Request Early Access
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}