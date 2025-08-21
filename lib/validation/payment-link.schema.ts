import { z } from "zod";

export const createPaymentLinkSchema = z.object({
    walletId: z
        .string()
        .min(1, "Please provide a valid wallet id"),
    chain: z.enum(["ETH_MAINNET"], { error: "Unsupported chain. Please select a valid one" }),
    asset: z.enum(["ETH", "USDT"], { error: "Unsupported asset. Please select a valid one" }),
    amountUsd: z.number({ error: "Please provide a valid amount" }).min(1, "Please provide a valid amount").positive("Please provide a valid amount").optional(),
    memo: z.string({ error: "Please provide a valid memo" }).max(255).optional(),
})

export const deletePaymentLinkSchema = z.object({
    id: z.string().min(1, "Invalid payment link id"),
});

export const setPaymentLinkStatusSchema = z.object({
    id: z.string().min(1, "Invalid payment link id"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
});
export type SetPaymentLinkStatusSchemaType = z.infer<typeof setPaymentLinkStatusSchema>;

export type DeletePaymentLinkSchemaType = z.infer<typeof deletePaymentLinkSchema>;

export type CreatePaymentLinkSchemaType = z.infer<typeof createPaymentLinkSchema>;