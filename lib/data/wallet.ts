import { handleQuery } from "../http/query";
import { Wallet } from "../types/wallet.types";

export const getWallets = async () => {
    return await handleQuery<Wallet[]>("/wallets", {
        tags: ["wallets"],
        revalidate: 300,
    })
};
