import z from "zod";

export const deleteProjectSchema = z.object({
  id: z.string(),
});

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100, "Project name must be at most 100 characters"),
  description: z
    .preprocess((val) => (val === "" ? undefined : val),
      z.string().max(500, "Description must be at most 500 characters").optional()
    ),
  client: z.object({
    name: z.string().min(1, "Client name is required"),
    email: z.preprocess(
      (val) => (val === "" ? undefined : val),
      z.email({ error: "Invalid email address" }).optional()
    ),
    company: z.preprocess((val) => (val === "" ? undefined : val), z.string().optional()),
  }),
});
export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(100, "Project name must be at most 100 characters")
    .optional(),

  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),

  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]).optional(),


  client: z
    .object({
      name: z
        .string()
        .min(1, "Client name is required")
        .optional(),



      email: z
        .email({ message: "Invalid email address" })
        .optional(),

      company: z
        .string()
        .optional(),
    })
    .optional(),
});


export type UpdateProjectSchemaType = z.infer<typeof updateProjectSchema>;
export type DeleteProjectSchemaType = z.infer<typeof deleteProjectSchema>;
export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;
