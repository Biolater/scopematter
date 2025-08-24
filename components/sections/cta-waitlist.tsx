"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";

export default function CTAWaitlistSection() {
  return (
    <section
      id="waitlist"
      aria-labelledby="cta-heading"
      className="px-6 md:px-12 pb-12"
    >
      <div className="w-full max-w-3xl text-center m-auto">
        <motion.h3
          id="cta-heading"
          className="text-2xl md:text-3xl font-semibold text-default-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Stop Giving Away Free Work
        </motion.h3>
        <motion.p
          className="mt-2 text-default-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join the waitlist and be the first to know when Scopematter is ready.
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Button
            as="a"
            href="/waitlist"
            variant="solid"
            color="primary"
            size="lg"
          >
            Join the Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
}