"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    { title: "Create payment link", desc: "Choose asset, network, and amount.", icon: "🧾" },
    { title: "Send to client", desc: "Client pays via card or bank.", icon: "📤" },
    { title: "Receive instantly", desc: "Funds go directly to your wallet.", icon: "🏦" },
  ];

  return (
         <section id="how" aria-labelledby="how-heading" className="px-6 lg:px-12">
      <div className="w-full">
                 <h2 id="how-heading" className="text-2xl lg:text-3xl font-semibold text-center">How it works</h2>
                 <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i * 0.05 }}>
              <Card radius="lg" shadow="sm">
                                 <CardHeader className="flex items-start gap-3 p-5 lg:p-6">
                  <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">{s.icon}</div>
                  <div><h3 className="font-semibold">{s.title}</h3></div>
                </CardHeader>
                                 <CardBody className="pt-0 px-5 lg:px-6 pb-5 lg:pb-6">
                  <p className="text-sm text-default-600">{s.desc}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


