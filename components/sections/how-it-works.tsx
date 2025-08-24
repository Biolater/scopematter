"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion } from "framer-motion";


function HowItWorksSection() {
  const steps = [
    {
      title: "Define the Project Scope",
      desc: "Quickly build a detailed proposal outlining all deliverables, timelines, and costs. No more ambiguity.",
      icon: "📝",
    },
    {
      title: "Client Reviews & Approves",
      desc: "Your client receives a professional, easy-to-understand scope. They approve it with a click, locking it in.",
      icon: "👍",
    },
    {
      title: "Manage Changes & Get Paid",
      desc: "Any new request is a formal change order. You provide a quote, the client approves, and it's added to the invoice.",
      icon: "💸",
    },
  ];

  return (
    <section id="how" aria-labelledby="how-heading">
      <div className="container mx-auto px-6 lg:px-12">
        <h2
          id="how-heading"
          className="text-2xl lg:text-3xl font-semibold text-center text-default-900"
        >
          How Knot Protects Your Time
        </h2>
        <div className="mt-8 grid gap-4 sm:gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <Card className="h-full border-default-400 bg-content2">
                <CardHeader className="flex-row items-start gap-4 p-5 lg:p-6">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-default-900">{s.title}</h3>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 px-5 lg:px-6 pb-5 lg:pb-6">
                  <p className="text-sm text-default-700">{s.desc}</p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;