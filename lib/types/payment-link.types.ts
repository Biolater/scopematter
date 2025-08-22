export type Chain = "ETH_MAINNET";
export type Asset = "USDT" | "ETH";
export type PaymentLinkStatus = "ACTIVE" | "INACTIVE";

export type PaymentLink = {
  id: string;
  slug: string;
  chain: Chain;
  asset: Asset;
  status: PaymentLinkStatus;
  amountUsd?: string | number | null;
  memo?: string | null;
  createdAt: string | Date;
  transactions: {
    id: string;
  }[]
  wallet: {
    address: string;
    chain: Chain;
    isPrimary: boolean;
  };
};
