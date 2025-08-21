import SectionHeader from "@/components/section-header";
import CreateWalletDialog from "@/components/wallet/create-wallet-dialog";
import Wallets from "@/components/wallet/wallets";
import { Suspense } from "react";

const WalletsPage = () => {
  return (
    <>
      <SectionHeader
        title="Wallets"
        description="Manage the wallets where your payments will be sent."
      >
        <CreateWalletDialog />
      </SectionHeader>
      <Suspense fallback={<div>Loading...</div>}>
        <Wallets />
      </Suspense>
    </>
  );
};

export default WalletsPage;
