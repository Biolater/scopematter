"use server";

import { handleAction } from "../http/action";
import { Wallet } from "../types/wallet.types";
import { createWalletSchema, deleteWalletSchema, DeleteWalletSchemaType, makePrimarySchema, MakePrimarySchemaType, WalletSchemaType } from "../validation/wallet.schema";

export async function createWalletAction(payload: WalletSchemaType) {
  return handleAction<WalletSchemaType, Wallet>({
    schema: createWalletSchema,
    path: "/wallets",
    method: "POST",
    body: payload,
    revalidateTags: ["wallets"],
  });
}

export async function deleteWalletAction(payload: DeleteWalletSchemaType) {
  return handleAction<DeleteWalletSchemaType, void>({
    schema: deleteWalletSchema,
    path: `/wallets/${payload.id}`,
    body: payload,
    method: "DELETE",
    revalidateTags: ["wallets"],
  });
}

export async function makePrimaryAction(payload: MakePrimarySchemaType) {
  return handleAction<MakePrimarySchemaType, Wallet>({
    schema: makePrimarySchema,
    path: `/wallets/${payload.id}/primary`,
    method: "PATCH",
    body: payload,
    revalidateTags: ["wallets"],
  });
}