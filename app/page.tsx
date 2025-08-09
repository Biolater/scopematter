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
      <section aria-labelledby="hero-heading" className="pt-2 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-10 h-64 [mask-image:radial-gradient(closest-side,black,transparent)] bg-gradient-to-r from-primary/25 via-secondary/25 to-transparent"
        />
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-default-200/60 px-3 py-1 text-xs text-default-600"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span>Non‑custodial • Global • Instant</span>
            </motion.div>

            <motion.h1
              id="hero-heading"
              className="mt-4 text-4xl md:text-6xl font-bold leading-tight"
              variants={fadeInUp}
            >
              Get paid globally, instantly —
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                without the payment barriers
              </span>
            </motion.h1>
            <motion.p
              className="mt-4 text-default-600 text-base md:text-lg"
              variants={fadeInUp}
            >
              Clients pay by card or bank transfer through our on‑ramp partner;
              you receive USDT or ETH directly to your wallet.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={fadeInUp}
            >
              <Button color="primary" size="lg" className="sm:shrink-0">
                Sign Up
              </Button>
              <Link href="#how" color="secondary">
                Learn how it works
              </Link>
            </motion.div>

            <motion.div
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-default-500"
              variants={fadeInUp}
            >
              <div className="flex items-center justify-center gap-2">
                <NetworkIcon className="text-default-500" size={16} /> Global
                coverage
              </div>
              <div className="flex items-center justify-center gap-2">
                <CoinIcon className="text-default-500" size={16} /> USDT / ETH
              </div>
              <div className="flex items-center justify-center gap-2">
                <ShieldIcon className="text-default-500" size={16} /> Non‑custodial
              </div>
            </motion.div>
          </motion.div>

          {/* Hero illustration */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/hero.svg"
              alt="Illustration of freelancers receiving crypto payments"
              className="w-full h-auto"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" aria-labelledby="how-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="how-heading" className="text-sm font-semibold tracking-wider text-default-500">
            How it works
          </h2>
          <ol className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Create a payment link",
                desc: "Choose asset (USDT/ETH), network, and amount—then share.",
              },
              {
                step: 2,
                title: "Send to your client",
                desc: "Client pays by card or bank via our on‑ramp partner.",
              },
              {
                step: 3,
                title: "Receive crypto instantly",
                desc: "Funds arrive directly to your wallet; you're in control.",
              },
            ].map((s, i) => (
              <motion.li
                key={s.step}
                className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
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

      {/* Key Benefits */}
      <section aria-labelledby="benefits-heading">
        <h2 id="benefits-heading" className="sr-only">Key benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              emoji: "⚡",
              title: "Instant payouts",
              desc: "Receive crypto to your own wallet as soon as clients pay.",
            },
            {
              emoji: "🚫",
              title: "No PayPal/Wise limits",
              desc: "Bypass regional restrictions and card declines.",
            },
            {
              emoji: "🔐",
              title: "Non‑custodial",
              desc: "You hold the keys. We never custody your funds.",
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-lg flex-shrink-0">
                  <span aria-hidden>{card.emoji}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">{card.title}</h3>
                  <p className="mt-1 text-sm text-default-600">{card.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Supported Tokens & Networks */}
      <section aria-labelledby="support-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="support-heading" className="text-sm font-semibold tracking-wider text-default-500">
            Supported tokens & networks
          </h2>
          <div className="mt-4 grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm">
              <p className="text-default-700 font-medium">Tokens</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['USDT', 'ETH'].map((t) => (
                  <span key={t} className="inline-flex items-center rounded-full border border-default-200 bg-background px-3 py-1 text-sm">
                    <CoinIcon className="mr-2 text-primary" size={18} /> {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm">
              <p className="text-default-700 font-medium">Networks</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Polygon', 'Tron', 'Ethereum'].map((n) => (
                  <span key={n} className="inline-flex items-center rounded-full border border-default-200 bg-background px-3 py-1 text-sm">
                    <NetworkIcon className="mr-2 text-secondary" size={18} /> {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="testimonials-heading">
        <h2 id="testimonials-heading" className="sr-only">Testimonials</h2>
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {[
            {
              quote:
                "Before ChainPay, clients struggled to pay me from abroad. Now payouts arrive in minutes.",
              author: "Aisha, Designer (NG)",
            },
            {
              quote:
                "My US clients pay by card, I receive ETH instantly. Zero PayPal headaches.",
              author: "Mehmet, Developer (TR)",
            },
          ].map((t, i) => (
            <motion.blockquote
              key={i}
              className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <p className="text-default-800">“{t.quote}”</p>
              <footer className="mt-2 text-sm text-default-500">— {t.author}</footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h3
            id="cta-heading"
            className="text-2xl md:text-3xl font-semibold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Start getting paid without borders
          </motion.h3>
          <motion.p
            className="mt-2 text-default-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Sign up today or join the waitlist—we’ll notify you as we launch in more regions.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Button color="primary" size="lg">Sign Up</Button>
            <Button color="secondary" variant="bordered" size="lg">Join Waitlist</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}