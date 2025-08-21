"use server";

import { handleAction } from "../http/action";
import { Wallet } from "../types/wallet.types";
import { createWalletSchema, WalletSchemaType } from "../validation/wallet.schema";

export async function createWalletAction(payload: WalletSchemaType) {
  return handleAction<WalletSchemaType, Wallet>({
    schema: createWalletSchema,
    path: "/wallets",
    method: "POST",
    body: payload,
  });
}
