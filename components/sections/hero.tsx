"use client";

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Highlight } from "../ui/hero-highlight";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden" id="hero">
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

      <div className="grid container mx-auto grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-6 lg:px-12 py-16 lg:py-24 relative">
        {/* Left: Copy + CTA */}
        <motion.div className="max-w-2xl" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            id="hero-heading"
            className="text-3xl lg:text-5xl text-balance font-bold leading-tight tracking-tight"
            variants={itemVariants}
          >
            Never lose money to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              scope creep
            </span>{" "}
            again.
            <br className="hidden sm:block" />
            {" "}
            Get paid for every change —{" "}
            <Highlight className="decoration-primary/50">automatically</Highlight>.
          </motion.h1>

          <motion.p className="mt-4 text-default-700 text-base lg:text-xl" variants={itemVariants}>
            Set a clear scope once. Every new client request is tracked,{" "}
            <span className="font-semibold text-foreground">priced</span>, and added to the project total —
            ready to invoice — without awkward money talks.
            <span className="font-semibold text-foreground"> No more unpaid extra work.</span>
          </motion.p>

          <motion.div className="mt-6 flex flex-wrap gap-2" variants={itemVariants}>
            <Chip variant="flat" color="primary" radius="sm">📄 Clear Scope Agreements</Chip>
            <Chip variant="flat" color="secondary" radius="sm">💼 Change Requests Priced</Chip>
            <Chip variant="flat" color="default" radius="sm">🧾 Documented Approvals</Chip>
          </motion.div>

          <motion.div className="mt-8 flex items-center gap-4" variants={itemVariants}>
            <Button as={Link} href="/sign-up" size="lg" className="btn-primary px-8 py-6">
              Get Started
            </Button>
          </motion.div>

          {/* Optional tiny link for explorers; keeps hero CTA singular */}
          <motion.div className="mt-3" variants={itemVariants}>
            <a
              href="#how"
              className="text-sm text-default-600 hover:text-foreground underline underline-offset-4"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Stacked illustrative cards */}
        <motion.div className="relative h-[28rem]" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={cardVariants} className="absolute left-6 right-6 top-6 lg:left-0 lg:right-16 lg:top-12 z-30">
            <Card radius="lg" shadow="md" className="border border-default-200/60 bg-content1/95">
              <CardHeader className="p-5 border-default-200/60">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold text-lg">Define Project Scope</p>
                  <Chip size="sm" variant="flat" color="default">Step 1</Chip>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-5 pb-5 space-y-3">
                <p className="text-sm text-default-600">
                  Outline deliverables, timelines, and total cost. Your client receives a clear, professional proposal.
                </p>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} className="absolute left-8 right-4 top-40 lg:left-10 lg:right-24 lg:top-40 z-20">
            <Card radius="lg" shadow="md" className="border border-default-200/60 bg-content1/95">
              <CardHeader className="p-5">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold text-lg">Client Approves</p>
                  <Chip size="sm" variant="flat" color="secondary">Step 2</Chip>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-5 pb-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-default-700">Status</span>
                  <span className="font-medium text-success">Approved</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-default-700">Project Total</span>
                  <span className="font-medium">$5,000.00</span>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants} className="absolute left-16 right-0 top-72 lg:left-24 lg:right-10 lg:top-72 z-10">
            <Card radius="lg" shadow="md" className="border border-default-200/60 bg-content1/95">
              <CardHeader className="p-5 border-default-200/60">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold text-lg">Manage Change Requests</p>
                  <Chip size="sm" variant="flat" color="success">Ready to Invoice</Chip>
                </div>
              </CardHeader>
              <CardBody className="pt-0 px-5 pb-5 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-default-700">New Request</span>
                  <span className="font-medium">Add Dark Mode</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-default-700">Additional Cost</span>
                  <span className="font-medium">$750.00</span>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
