import SectionHeader from "@/components/section-header";
import CreateWalletDialog from "@/components/wallet/create-wallet-dialog";
import WalletsSkeleton from "@/components/wallet/wallet-skeleton";
import Wallets from "@/components/wallet/wallets";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

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
