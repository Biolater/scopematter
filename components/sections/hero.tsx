"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";

import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);
  const demoLinkUrl = "https://pay.paylynk.io/link/5JX9ABCDE";
  const reduceMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
      id="hero"
    >
      <div className="absolute inset-0 -z-10">
        {reduceMotion ? (
          <div className="h-full w-full bg-gradient-to-br from-primary/30 via-fuchsia-500/20 to-background" />
        ) : (
          <BackgroundGradientAnimation
            className="h-full w-full"
            containerClassName="h-full w-full"
          />
        )}
        <div className="absolute inset-0 bg-black/20 [@media(prefers-color-scheme:light)]:bg-black/10" />
      </div>

      <div className="container relative z-10 mx-auto grid gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-12 min-h-[80svh] md:min-h-[calc(100svh-80px)]">
        {/* copy */}
        <div className="max-w-2xl">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold leading-tight tracking-tight md:text-6xl"
            id="hero-heading"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            Get paid in{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              USDT/ETH
            </span>{" "}
            from any client,{" "}
            <span className="underline decoration-primary/50 underline-offset-4">
              instantly
            </span>{" "}
            — no bank restrictions.
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-base text-default-700 md:text-xl"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Clients pay in USD via card or bank. You receive{" "}
            <span className="font-semibold text-foreground">
              crypto directly in your wallet
            </span>{" "}
            — fast, secure, and non‑custodial.
          </motion.p>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Chip
              className="transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              color="primary"
              radius="sm"
              variant="flat"
            >
              ⚡ Instant payouts
            </Chip>
            <Chip
              className="transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              color="secondary"
              radius="sm"
              variant="flat"
            >
              🚫 No PayPal/Wise limits
            </Chip>
            <Chip
              className="transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              color="default"
              radius="sm"
              variant="flat"
            >
              🔐 Non‑custodial
            </Chip>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* <Button
              as="a"
              href="#waitlist"
              size="lg"
              className="btn-primary px-8 py-6"
            >
              Join Waitlist
            </Button> */}
            <motion.a
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-white shadow-[0_0_20px_theme(colors.primary.DEFAULT)] transition hover:shadow-[0_0_30px_theme(colors.primary.DEFAULT)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              href="#how"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              How it works
            </motion.a>
          </motion.div>
        </div>

        {/* demo card stack */}
        <div className="relative h-[28rem]">
          {[0, 1, 2].map((i) => {
            const delays = [0, 0.1, 0.2];
            const cardInfo = [
              {
                header: (
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-lg">Create payment link</p>
                    <Chip color="default" size="sm" variant="flat">
                      Step 1
                    </Chip>
                  </div>
                ),
                body: (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {["USDT", "ETH", "Polygon"].map((t) => (
                        <Chip
                          key={t}
                          color={
                            t === "USDT"
                              ? "primary"
                              : t === "ETH"
                                ? "default"
                                : "secondary"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {t}
                        </Chip>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-default-300 bg-content2 px-3 py-2 text-sm text-default-600 transition-colors hover:border-default-400">
                      <span className="truncate">{demoLinkUrl}</span>
                      <Button
                        color={copied ? "success" : "primary"}
                        size="sm"
                        variant="light"
                        onPress={async () => {
                          try {
                            await navigator.clipboard.writeText(demoLinkUrl);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                          } catch {
                            // no-op
                          }
                        }}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                ),
                className:
                  "absolute left-6 right-6 top-6 lg:left-0 lg:right-16 lg:top-4 border border-default-200/60 bg-content1/95",
              },
              {
                header: (
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-lg">Client pays</p>
                    <Chip color="secondary" size="sm" variant="flat">
                      Step 2
                    </Chip>
                  </div>
                ),
                body: (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-default-700">Method</span>
                      <span className="font-medium">Card / Bank</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-default-700">Amount</span>
                      <span className="font-medium">$250.00</span>
                    </div>
                  </div>
                ),
                className:
                  "absolute left-8 right-4 top-40 lg:left-10 lg:right-24 lg:top-40 border border-default-200/60 bg-content1/95",
              },
              {
                header: (
                  <div className="flex items-baseline gap-2">
                    <p className="font-semibold text-lg">You receive</p>
                    <Chip color="success" size="sm" variant="flat">
                      Instant
                    </Chip>
                  </div>
                ),
                body: (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-default-700">Asset</span>
                      <span className="font-medium">0.14 ETH</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-default-700">To</span>
                      <span className="max-w-[10rem] truncate font-medium">
                        0xA2…e91C
                      </span>
                    </div>
                  </div>
                ),
                className:
                  "absolute left-16 right-0 bottom-4 lg:left-24 lg:right-10 lg:bottom-6 border border-default-200/60 bg-content1/95",
              },
            ][i];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: delays[i] }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className={cardInfo.className} radius="lg" shadow="md">
                  <CardHeader className="p-5 border-default-200/60">
                    {cardInfo.header}
                  </CardHeader>
                  <CardBody className="px-5 pb-5 pt-0 space-y-2">
                    {cardInfo.body}
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
