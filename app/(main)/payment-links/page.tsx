import SectionHeader from "@/components/section-header";
import CreateLinkDialog from "@/components/payment-links/create-link-dialog";
import { Metadata } from "next";
import { getWallets } from "@/lib/data/wallet";
import { Suspense } from "react";
import PaymentLinksSkeleton from "@/components/payment-links/payment-links-skeleton";
import PaymentLinks from "@/components/payment-links/payment-links";

export const metadata: Metadata = {
  title: "Payment Links | PayLynk",
  description:
    "Generate secure payment links to receive freelance payments instantly in USDT or ETH — no crypto knowledge required.",
  openGraph: {
    title: "Payment Links | PayLynk",
    description:
      "Easily create and share payment links so clients can pay in USD while you receive crypto directly to your wallet.",
    url: "https://paylynk.xyz/payment-links",
    siteName: "PayLynk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Links | PayLynk",
    description:
      "Create and share secure payment links for instant USDT/ETH payouts.",
  },
};

export const dynamic = "force-dynamic";

const PaymentLinksPage = async () => {
  const wallets = await getWallets();
  if (!wallets.ok) {
    throw new Error(wallets.message);
  }

  return (
    <>
      <SectionHeader
        title="Payment Links"
        description="Generate and manage links to get paid in USDT or ETH instantly."
      >
        <CreateLinkDialog wallets={wallets.data} />
      </SectionHeader>
      <Suspense fallback={<PaymentLinksSkeleton count={8} />}>
        <PaymentLinks />
      </Suspense>
    </>
  );
};

export default PaymentLinksPage;
