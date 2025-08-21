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


export type WalletSchemaType = z.infer<typeof createWalletSchema>;
