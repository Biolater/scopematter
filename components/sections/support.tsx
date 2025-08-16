"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";

export default function SupportSection() {
  return (
         <section id="support" aria-labelledby="support-heading" className="px-6 lg:px-12">
      <div className="w-full">
                 <h2 id="support-heading" className="text-2xl lg:text-3xl font-semibold text-center">Supported tokens & networks</h2>
                 <div className="mt-6 grid gap-4 sm:gap-6 lg:grid-cols-2">
          <Card radius="lg" shadow="sm">
                         <CardHeader className="p-5 lg:p-6 text-default-700 font-medium">Tokens</CardHeader>
            <CardBody className="pt-0 px-5 lg:px-6 pb-5 lg:pb-6">
              <div className="mt-1 flex flex-wrap gap-2">
                {["USDT", "ETH"].map((t) => (
                  <Chip key={t} variant="flat" color="primary" radius="sm">{t}</Chip>
                ))}
              </div>
            </CardBody>
          </Card>
          <Card radius="lg" shadow="sm">
            <CardHeader className="p-5 lg:p-6 text-default-700 font-medium">Networks</CardHeader>
            <CardBody className="pt-0 px-5 lg:px-6 pb-5 lg:pb-6">
              <div className="mt-1 flex flex-wrap gap-2">
                {["Polygon", "Tron", "Ethereum"].map((n) => (
                  <Chip key={n} variant="flat" color="secondary" radius="sm">{n}</Chip>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}


