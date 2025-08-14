"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Avatar } from "@heroui/avatar";
import { motion } from "framer-motion";
import { countries } from "@/lib/data/countries";

export default function CTAWaitlistSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(""); // stores ISO2 code
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    if (!email.trim() || !country.trim()) {
      setStatus({ type: "error", message: "Email and country are required." });
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || undefined, email, country }),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus({ type: "success", message: "Thanks! You’re on the list." });
      setName("");
      setEmail("");
      setCountry("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="waitlist"
      aria-labelledby="cta-heading"
      className="px-6 md:px-12 pb-12"
    >
      <div className="w-full max-w-3xl text-center m-auto">
        <motion.h3
          id="cta-heading"
          className="text-2xl md:text-3xl font-semibold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Start getting paid without borders
        </motion.h3>
        <motion.p
          className="mt-2 text-default-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join our waitlist and be the first to know when we launch in your
          country.
        </motion.p>
        <motion.form
          className="mt-6 grid gap-3 sm:grid-cols-2 text-left"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <Input
            label="Name (optional)"
            placeholder="Your name"
            radius="sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="sm:col-span-1"
          />
          <Input
            type="email"
            label="Email"
            placeholder="you@email.com"
            radius="sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
            className="sm:col-span-1"
          />
          <Autocomplete
            label="Country"
            placeholder="Search country"
            className="sm:col-span-2"
            selectedKey={country || undefined}
            onSelectionChange={(key) => setCountry(String(key ?? ""))}
            allowsCustomValue={false}
            isRequired
            radius="sm"
          >
            {countries.map((c) => (
              <AutocompleteItem
                key={c.code}
                textValue={c.name}
                startContent={
                  <Avatar
                    className="w-6 h-6"
                    alt={c.name}
                    // use flagcdn with iso2 if available; fallback to emoji avatar
                    src={`https://flagcdn.com/${c.code}.svg`}
                  >
                    {c.emoji}
                  </Avatar>
                }
              >
                {c.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <div className="sm:col-span-2">
            <Button
              size="lg"
              type="submit"
              isLoading={isSubmitting}
              className="w-full btn-primary"
            >
              Join Waitlist
            </Button>
            <p className="mt-2 text-[13px] text-default-500">
              Powered by Onramper.
            </p>
          </div>
          {status && (
            <p
              role={status.type === "success" ? "status" : "alert"}
              className={
                status.type === "success"
                  ? "text-success text-sm"
                  : "text-danger text-sm"
              }
            >
              {status.message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
