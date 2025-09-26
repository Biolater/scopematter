import z from "zod";

export const createRequestSchema = z.object({
    description: z
        .string()
        .min(1, "Description is required")
        .max(2000, "Description must be at most 2000 characters"),
});

export type CreateRequestSchemaType = z.infer<typeof createRequestSchema>;
