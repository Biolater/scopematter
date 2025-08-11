"use client";

import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative m isolate overflow-hidden" id="hero">
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
      <div className="grid container mx-auto grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-2xl">
          <motion.h1
            id="hero-heading"
            className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get paid in USDT/ETH from any client, instantly — no bank restrictions.
          </motion.h1>
          <motion.p
            className="mt-4 text-default-700 text-base md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Clients pay in USD via card or bank. You receive crypto directly in your wallet — fast, secure, and non‑custodial.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Chip variant="flat" color="primary" radius="sm">⚡ Instant payouts</Chip>
            <Chip variant="flat" color="secondary" radius="sm">🚫 No PayPal/Wise limits</Chip>
            <Chip variant="flat" color="default" radius="sm">🔐 Non‑custodial</Chip>
          </motion.div>
          <div className="mt-8 flex items-center gap-4">
            <a href="#waitlist" className="btn-primary px-8 py-6">Join Waitlist</a>
            <a href="#how" className="text-default-600 hover:text-foreground">How it works</a>
          </div>
        </div>

        <div className="relative h-[28rem]">
          {/* Stacked payment flow cards */}
          <Card radius="lg" shadow="sm" className="absolute left-6 right-6 top-6 md:left-0 md:right-16 md:top-4 border border-default-200/70 bg-content1">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Create payment link</p>
                <span className="text-xs text-default-500">Step 1</span>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-5 pb-5 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Chip size="sm" variant="flat" color="primary">USDT</Chip>
                <Chip size="sm" variant="flat" color="default">ETH</Chip>
                <Chip size="sm" variant="flat" color="secondary">Polygon</Chip>
              </div>
              <div className="rounded-lg border border-default-200/70 bg-content2 px-3 py-2 text-sm text-default-600">
                https://pay.chainpay.io/link/5JX9…
              </div>
            </CardBody>
          </Card>

          <Card radius="lg" shadow="sm" className="absolute left-8 right-4 top-40 md:left-10 md:right-24 md:top-40 border border-default-200/70 bg-content1">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Client pays</p>
                <span className="text-xs text-default-500">Step 2</span>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-5 pb-5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-700">Method</span>
                <span className="font-medium">Card / Bank</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-700">Amount</span>
                <span className="font-medium">$250.00</span>
              </div>
            </CardBody>
          </Card>

          <Card radius="lg" shadow="sm" className="absolute left-16 right-0 bottom-4 md:left-24 md:right-10 md:bottom-6 border border-default-200/70 bg-content1">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <p className="font-semibold">You receive</p>
                <span className="text-xs text-default-500">Instant</span>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-5 pb-5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-700">Asset</span>
                <span className="font-medium">0.14 ETH</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-700">To</span>
                <span className="font-medium truncate max-w-[10rem]">0xA2…e91C</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}


