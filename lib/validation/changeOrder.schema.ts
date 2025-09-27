import z from "zod";

export const createChangeOrderSchema = z.object({
    requestId: z.string().min(1, "Request ID is required"),
    priceUsd: z
        .number({
            error: "Price is required",
        })
        .positive("Price must be greater than 0")
        .max(999999.99, "Price too high")
        .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
            message: "Price must have at most 2 decimal places",
        }),
    extraDays: z
        .number({
            error: "Extra days must be a number",
        })
        .int("Must be an integer")
        .min(1, "Must be at least 1 day")
        .max(365, "Must be at most 365 days")
        .optional(),
});

export const approveChangeOrderSchema = z.object({
    status: z.literal("APPROVED"),
});

export const rejectChangeOrderSchema = z.object({
    status: z.literal("REJECTED"),
});

export const deleteChangeOrderSchema = z.object({
    id: z.string().min(1, "Change order ID is required"),
});

export const editChangeOrderSchema = z.object({
    priceUsd: z.number().positive("Price must be greater than 0"),
    extraDays: z.number().int("Must be an integer").min(1, "Must be at least 1 day").max(365, "Must be at most 365 days").optional(),
});


export type CreateChangeOrderSchemaType = z.infer<typeof createChangeOrderSchema>;
export type ApproveChangeOrderSchemaType = z.infer<typeof approveChangeOrderSchema>;
export type RejectChangeOrderSchemaType = z.infer<typeof rejectChangeOrderSchema>;
export type DeleteChangeOrderSchemaType = z.infer<typeof deleteChangeOrderSchema>;
export type EditChangeOrderSchemaType = z.infer<typeof editChangeOrderSchema>;