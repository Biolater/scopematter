"use client";

import { Button } from "@heroui/button";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function CTAWaitlistSection() {
  return (
    <section
      id="waitlist"
      aria-labelledby="cta-heading"
      className="px-6 md:px-12 pb-12"
    >
      <motion.div
        className="w-full max-w-3xl text-center m-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.h3
          id="cta-heading"
          className="text-2xl md:text-3xl font-semibold text-default-900"
          variants={itemVariants}
        >
          Stop Giving Away Free Work
        </motion.h3>
        <motion.p className="mt-2 text-default-700" variants={itemVariants}>
          Join the waitlist and be the first to know when Scopematter is ready.
        </motion.p>
        <motion.div className="mt-6" variants={itemVariants}>
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
      </motion.div>
    </section>
  );
}