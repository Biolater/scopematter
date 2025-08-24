import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPaymentLinkBySlug } from "@/lib/data/payment-links";
import PayFormClient from "@/components/payment-links/pay-form-client";
import { GetPaymentLinkBySlugResponse } from "@/lib/types/payment-link.types";

export const revalidate = 60; // public page can be cached briefly

function usdString(v: any): string | null {
  if (v == null) return null;
  // Prisma Decimal, number, or string -> normalized string
  return typeof v === "string" ? v : v.toString();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const link = await getPaymentLinkBySlug(slug);

  if (!link.ok) {
    return {
      title: "Payment Link | PayLynk",
      description: "Secure payments to freelancers via PayLynk.",
    };
  }

  const data: GetPaymentLinkBySlugResponse = link.data;

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
    "https://paylynk.app";

  const title = `Pay ${data.user.username} • ${data.asset} on Ethereum | PayLynk`;
  const description =
    data.memo ??
    `Send a secure ${data.asset} payment on Ethereum to ${data.user.username}.`;
  const url = `${baseUrl}/p/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "PayLynk",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const link = await getPaymentLinkBySlug(slug).catch(() => null);

  if (!link?.ok) notFound();

  const amountUsd = usdString(link.ok ? link.data.amountUsd : null);

  return (
    <div className="mx-auto max-w-2xl p-6">
      <PayFormClient
        slug={link.ok ? link.data.slug : ""}
        username={link.ok ? link.data.user.username : ""}
        imageUrl={link.ok ? link.data.user.imageUrl : ""}
        chain={link.ok ? link.data.chain : "ETH_MAINNET"}
        asset={link.ok ? link.data.asset : "USDT"}
        walletAddress={link.ok ? link.data.wallet.address : ""}
        defaultAmountUsd={amountUsd}
        memo={link.ok ? (link.data.memo ?? "") : ""}
      />
    </div>
  );
}
