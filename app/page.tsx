"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip } from "@heroui/chip";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    if (!email.trim() || !country.trim()) {
      setStatus({ type: "error", message: "Email and country are required." });
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || undefined, email, country }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus({ type: "success", message: "Thanks! You’re on the list." });
      setName("");
      setEmail("");
      setCountry("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-24 py-0" id="hero">
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative isolate overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/25 via-purple-600/20 to-transparent"
        />
        <svg
          aria-hidden
          className="absolute -top-24 -right-24 h-[52rem] w-[52rem] blur-3xl opacity-30"
          viewBox="0 0 600 600"
        >
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" fill="url(#g)" />
        </svg>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-6 md:px-12 py-16 md:py-24">
          <div className="max-w-2xl">
            <motion.h1
              id="hero-heading"
              className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Get paid in USDT/ETH from any client, instantly — no bank
              restrictions.
            </motion.h1>
            <motion.p
              className="mt-4 text-default-700 text-base md:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Clients pay in USD via card or bank. You receive crypto directly
              in your wallet — fast, secure, and non‑custodial.
            </motion.p>
            <motion.ul
              className="mt-6 space-y-2 text-default-700 text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <li className="flex items-start gap-2">
                <span aria-hidden>⚡</span>
                <span>Instant payouts</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden>🚫</span>
                <span>No PayPal/Wise limits</span>
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden>🔐</span>
                <span>Non‑custodial</span>
              </li>
            </motion.ul>
            <a href="#waitlist" className="inline-block mt-8">
              <Button size="lg" className="btn-primary px-8 py-6">Join Waitlist</Button>
            </a>
          </div>
          <div className="relative h-72 md:h-[28rem]">
            <div className="absolute inset-0 grid place-items-center">
              <div className="aspect-[5/3] w-full max-w-3xl rounded-3xl border border-token bg-card shadow-xl backdrop-blur-sm">
                <div className="h-full w-full grid grid-cols-3 gap-4 p-6">
                  <div className="rounded-2xl bg-gradient-to-b from-blue-500/20 to-purple-500/10 border border-token" />
                  <div className="rounded-2xl bg-gradient-to-b from-purple-500/20 to-blue-500/10 border border-token" />
                  <div className="rounded-2xl bg-gradient-to-b from-blue-500/20 to-purple-500/10 border border-token" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" aria-labelledby="how-heading" className="px-6 md:px-12">
        <div className="w-full">
          <h2
            id="how-heading"
            className="text-2xl md:text-3xl font-semibold text-center"
          >
            How it works
          </h2>
          <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
            {[
              {
                title: "Create payment link",
                desc: "Choose asset, network, and amount.",
                icon: "🧾",
              },
              {
                title: "Send to client",
                desc: "Client pays via card or bank.",
                icon: "📤",
              },
              {
                title: "Receive instantly",
                desc: "Funds go directly to your wallet.",
                icon: "🏦",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-default-600">{s.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="benefits"
        aria-labelledby="benefits-heading"
        className="px-6 md:px-12"
      >
        <h2
          id="benefits-heading"
          className="text-2xl md:text-3xl font-semibold text-center"
        >
          Benefits
        </h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              emoji: "⚡",
              title: "Instant payouts",
              desc: "No waiting days for transfers.",
            },
            {
              emoji: "🚫",
              title: "No PayPal/Wise limits",
              desc: "Works in restricted countries.",
            },
            {
              emoji: "🔐",
              title: "Non‑custodial",
              desc: "You hold the keys to your funds.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center text-lg flex-shrink-0">
                  <span aria-hidden>{b.emoji}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base md:text-lg">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm text-default-600">{b.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support */}
      <section
        id="support"
        aria-labelledby="support-heading"
        className="px-6 md:px-12"
      >
        <div className="w-full">
          <h2
            id="support-heading"
            className="text-2xl md:text-3xl font-semibold text-center"
          >
            Supported tokens & networks
          </h2>
          <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm">
              <p className="text-default-700 font-medium">Tokens</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["USDT", "ETH"].map((t) => (
                  <Chip key={t} variant="flat" color="primary" radius="sm">
                    {t}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-default-200/70 bg-default-50/40 p-5 md:p-6 shadow-sm">
              <p className="text-default-700 font-medium">Networks</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Polygon", "Tron", "Ethereum"].map((n) => (
                  <Chip key={n} variant="flat" color="secondary" radius="sm">
                    {n}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-heading" className="px-6 md:px-12">
        <div className="w-full max-w-4xl mx-auto">
          <h2
            id="faq-heading"
            className="text-2xl md:text-3xl font-semibold text-center"
          >
            FAQ
          </h2>
          <Accordion className="mt-4" variant="bordered">
            <AccordionItem
              key="fees"
              aria-label="What fees do you charge?"
              title="What fees do you charge?"
            >
              1.5% per transaction + on-ramp costs (shown upfront).
            </AccordionItem>
            <AccordionItem
              key="client-crypto"
              aria-label="Does my client need crypto?"
              title="Does my client need crypto?"
            >
              No, they pay in fiat.
            </AccordionItem>
            <AccordionItem
              key="safe"
              aria-label="Is it safe?"
              title="Is it safe?"
            >
              Yes, funds go directly to your wallet.
            </AccordionItem>
            <AccordionItem
              key="launch"
              aria-label="When are you launching?"
              title="When are you launching?"
            >
              Q4 2025 (beta).
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA / Waitlist */}
      <section
        id="waitlist"
        aria-labelledby="cta-heading"
        className="px-6 md:px-12 pb-12"
      >
        <div className="w-full max-w-3xl text-center m-auto">
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
            Join our waitlist and be the first to know when we launch in your
            country.
          </motion.p>
          <motion.form
            className="mt-6 grid gap-3 sm:grid-cols-2 text-left"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Input
              label="Name (optional)"
              placeholder="Your name"
              radius="sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="sm:col-span-1"
            />
            <Input
              type="email"
              label="Email"
              placeholder="you@email.com"
              radius="sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
              className="sm:col-span-1"
            />
            <Input
              label="Country"
              placeholder="e.g., Nigeria"
              radius="sm"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              isRequired
              className="sm:col-span-2"
            />
            <div className="sm:col-span-2">
              <Button
                color="primary"
                size="lg"
                type="submit"
                isLoading={isSubmitting}
                className="w-full from-blue-600 to-purple-600 bg-gradient-to-r text-white rounded-xl"
              >
                Join Waitlist
              </Button>
              <p className="mt-2 text-[13px] text-default-500">
                Powered by Onramper.
              </p>
            </div>
            {status && (
              <p
                role={status.type === "success" ? "status" : "alert"}
                className={
                  status.type === "success"
                    ? "text-success text-sm"
                    : "text-danger text-sm"
                }
              >
                {status.message}
              </p>
            )}
          </motion.form>
        </div>
      </section>
    </div>
  );
}
