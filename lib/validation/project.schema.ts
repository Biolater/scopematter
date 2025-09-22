import z from "zod";

export const deleteProjectSchema = z.object({
  id: z.string(),
});

export type DeleteProjectSchemaType = z.infer<typeof deleteProjectSchema>;