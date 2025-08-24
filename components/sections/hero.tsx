"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";
import { Highlight } from "../ui/hero-highlight";
import Link from "next/link";

export default function HeroSection() {
  const [email, setEmail] = useState("");

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative m isolate overflow-hidden"
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
        <div className="max-w-2xl">
          <motion.h1
            id="hero-heading"
            className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Stop scope creep.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Get paid
            </span>{" "}
            for every hour of your work,{" "}
            <Highlight className="decoration-primary/50">guaranteed</Highlight>.
          </motion.h1>
          <motion.p
            className="mt-4 text-default-700 text-base lg:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Clients approve a clear project scope upfront. Any changes are
            tracked, quoted, and billed automatically.{" "}
            <span className="font-semibold text-foreground">
              No more free work or awkward conversations.
            </span>
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <Chip variant="flat" color="primary" radius="sm">
              📄 Clear Scope Agreements
            </Chip>
            <Chip variant="flat" color="secondary" radius="sm">
              🔄 Automated Change Requests
            </Chip>
            <Chip variant="flat" color="default" radius="sm">
              💰 Guaranteed Payments
            </Chip>
          </motion.div>
          <div className="mt-8 flex items-center gap-4">
             <Button
               as={Link}
               href="/waitlist"
               size="lg"
               className="btn-primary px-8 py-6"
             >
               Join Waitlist
             </Button>
            <Button as="a" href="#how" size="lg" variant="flat" color="primary">
              How it works
            </Button>
          </div>
        </div>

        <div className="relative h-[28rem]">
          {/* Stacked project flow cards */}
          <Card
            radius="lg"
            shadow="md"
            className="absolute left-6 right-6 top-6 lg:left-0 lg:right-16 lg:top-4 border border-default-200/60 bg-content1/95"
          >
            <CardHeader className="p-5 border-default-200/60">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-lg">Define Project Scope</p>
                <Chip size="sm" variant="flat" color="default">
                  Step 1
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-5 pb-5 space-y-3">
               <p className="text-sm text-default-600">
                Outline deliverables, timelines, and total cost. Your client gets a clear, professional proposal.
               </p>
            </CardBody>
          </Card>

          <Card
            radius="lg"
            shadow="md"
            className="absolute left-8 right-4 top-40 lg:left-10 lg:right-24 lg:top-40 border border-default-200/60 bg-content1/95"
          >
            <CardHeader className="p-5">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-lg">Client Approves</p>
                <Chip size="sm" variant="flat" color="secondary">
                  Step 2
                </Chip>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-5 pb-5 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-700">Status</span>
                <span className="font-medium text-success">Approved</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-default-700">Project Cost</span>
                <span className="font-medium">$5,000.00</span>
              </div>
            </CardBody>
          </Card>

          <Card
            radius="lg"
            shadow="md"
            className="absolute left-16 right-0 bottom-4 lg:left-24 lg:right-10 lg:bottom-6 border border-default-200/60 bg-content1/95"
          >
            <CardHeader className="p-5  border-default-200/60">
              <div className="flex items-baseline gap-2">
                <p className="font-semibold text-lg">Manage Change Requests</p>
                 <Chip size="sm" variant="flat" color="success">
                   Seamless
                 </Chip>
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
        </div>
      </div>
    </section>
  );
}
