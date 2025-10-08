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
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
      id="hero"
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

      <div className="grid container mx-auto grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-6 lg:px-12 py-16 lg:py-24 relative">
        {/* Left: Copy + CTA */}
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
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
            <br className="hidden sm:block" /> Get paid for every change —{" "}
            <Highlight className="decoration-primary/50">
              automatically
            </Highlight>
            .
          </motion.h1>

          <motion.p
            className="mt-4 text-default-700 text-base lg:text-xl"
            variants={itemVariants}
          >
            Set a clear scope once. Every new client request is tracked,{" "}
            <span className="font-semibold text-foreground">priced</span>, and
            added to the project total — ready to invoice — without awkward
            money talks.
            <span className="font-semibold text-foreground">
              {" "}
              No more unpaid extra work.
            </span>
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            variants={itemVariants}
          >
            <Chip variant="flat" color="primary" radius="sm">
              📄 Clear Scope Agreements
            </Chip>
            <Chip variant="flat" color="secondary" radius="sm">
              💼 Change Requests Priced
            </Chip>
            <Chip variant="flat" color="default" radius="sm">
              🧾 Documented Approvals
            </Chip>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center gap-4"
            variants={itemVariants}
          >
            <Button
              as={Link}
              href="/sign-up"
              size="lg"
              className="btn-primary px-8 py-6"
            >
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

        {/* Right: Video Demo */}
        <motion.div
          className="relative w-full mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-xl bg-content1">
            <video
              src="/scopematter-compressed.mp4"
              poster="/scopematter-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-contain md:object-cover rounded-lg"
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
