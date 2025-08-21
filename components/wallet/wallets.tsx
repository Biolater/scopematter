import { getWallets } from "@/lib/data/wallet";
import WalletsClient from "./wallets-client";

const Wallets = async () => {
  const wallets = await getWallets();

  if (!wallets.ok) {
    throw new Error(wallets.message);
  }

  return <WalletsClient wallets={wallets.data} />;
};

export default Wallets;
