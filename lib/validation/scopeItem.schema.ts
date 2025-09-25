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


export type CreateScopeItemSchemaType = z.infer<typeof createScopeItemSchema>;
export type DeleteScopeItemSchemaType = z.infer<typeof deleteScopeItemSchema>;