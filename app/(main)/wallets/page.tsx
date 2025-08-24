import SectionHeader from "@/components/section-header";
import CreateWalletDialog from "@/components/wallet/create-wallet-dialog";
import WalletsSkeleton from "@/components/wallet/wallet-skeleton";
import Wallets from "@/components/wallet/wallets";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallets | PayLynk",
  description:
    "Manage the wallets where your freelance payments are received in USDT or ETH instantly with PayLynk.",
  openGraph: {
    title: "Wallets | PayLynk",
    description: "Manage your payout wallets for crypto payments.",
    url: "https://paylynk.xyz/wallets",
    siteName: "PayLynk",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Wallets | PayLynk",
    description: "Manage your payout wallets for crypto payments.",
  },
};
export const dynamic = "force-dynamic";

const WalletsPage = () => {
  return (
    <>
      <SectionHeader
        title="Wallets"
        description="Manage the wallets where your payments will be sent."
      >
        <CreateWalletDialog />
      </SectionHeader>
      <Suspense fallback={<WalletsSkeleton count={8} />}>
        <Wallets />
      </Suspense>
    </>
  );
};

export default WalletsPage;
