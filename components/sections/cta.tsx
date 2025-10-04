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

export default function CTASection() {
  return (
    <section
      id="cta"
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
          Stop Losing Hours to Scope Creep
        </motion.h3>

        <motion.p className="mt-2 text-default-700" variants={itemVariants}>
          Sign up for free and start managing projects with clear boundaries and
          no unpaid work.
        </motion.p>

        <motion.div className="mt-6" variants={itemVariants}>
          <Button
            as="a"
            href="/sign-up"
            variant="solid"
            color="primary"
            size="lg"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
