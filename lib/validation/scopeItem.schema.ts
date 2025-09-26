import z from "zod";

export const createScopeItemSchema = z.object({
  name: z
    .string()
    .min(1, "Item name is required")
    .max(100, "Item name must be at most 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description must be at most 1000 characters"),
});

export const deleteScopeItemSchema = z.object({
  id: z.string(),
  projectId: z.string(),
});


export const scopeItemStatusEnum = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]);

export const updateScopeItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description too long"),
  status: scopeItemStatusEnum,
});




export type UpdateScopeItemSchemaType = z.infer<typeof updateScopeItemSchema>;
export type CreateScopeItemSchemaType = z.infer<typeof createScopeItemSchema>;
export type DeleteScopeItemSchemaType = z.infer<typeof deleteScopeItemSchema>;