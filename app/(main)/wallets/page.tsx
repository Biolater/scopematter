import SectionHeader from "@/components/section-header";
import CreateWalletDialog from "@/components/wallet/create-wallet-dialog";

const WalletsPage = () => {
  return (
    <>
      <SectionHeader
        title="Wallets"
        description="Manage the wallets where your payments will be sent."
      >
        <CreateWalletDialog />
      </SectionHeader>
    </>
  );
};

export default WalletsPage;
