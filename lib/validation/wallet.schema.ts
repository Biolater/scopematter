import z from "zod";

    // EVM address validator (accepts 0x + 40 hex chars)
const evmAddress = z
  .string()
  .trim()
  .regex(/^0x[a-fA-F0-9]{40}$/, "Enter a valid EVM address (0x...)");

export const createWalletSchema = z.object({
  address: evmAddress,
  chain: z.enum(["ETH_MAINNET"], {
    error: "Please select a network",
  }),
  isPrimary: z.boolean(),
});

export const deleteWalletSchema = z.object({
  id: z.string(),
});


export type WalletSchemaType = z.infer<typeof createWalletSchema>;

export type DeleteWalletSchemaType = z.infer<typeof deleteWalletSchema>;

export const makePrimarySchema = z.object({
  id: z.string(),
});

export type MakePrimarySchemaType = z.infer<typeof makePrimarySchema>;