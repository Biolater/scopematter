import z from "zod";

export const createRequestSchema = z.object({
    description: z
        .string()
        .min(1, "Description is required")
        .max(2000, "Description must be at most 2000 characters"),
});

export const deleteRequestSchema = z.object({
    id: z.string(),
});

export const markRequestInScopeSchema = z.object({
    status: z.literal("IN_SCOPE"),
});

export const markRequestOutOfScopeSchema = z.object({
    status: z.literal("OUT_OF_SCOPE"),
});

export const markRequestPendingSchema = z.object({
    status: z.literal("PENDING"),
});

export const editRequestSchema = z.object({
    description: z
        .string()
        .min(1, "Description is required")
        .max(2000, "Description must be at most 2000 characters"),
});

export type CreateRequestSchemaType = z.infer<typeof createRequestSchema>;
export type DeleteRequestSchemaType = z.infer<typeof deleteRequestSchema>;
export type MarkRequestInScopeSchemaType = z.infer<typeof markRequestInScopeSchema>;
export type MarkRequestOutOfScopeSchemaType = z.infer<typeof markRequestOutOfScopeSchema>;
export type MarkRequestPendingSchemaType = z.infer<typeof markRequestPendingSchema>;
export type EditRequestSchemaType = z.infer<typeof editRequestSchema>;