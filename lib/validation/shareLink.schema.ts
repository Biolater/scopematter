import z from "zod";

export const createShareLinkSchema = z.object({
    projectId: z.string().cuid(),        // include if you pass project ID
    expiresAt: z.date().optional(),      // JS Date, optional
    showScopeItems: z.boolean().optional().default(true),
    showRequests: z.boolean().optional().default(true),
    showChangeOrders: z.boolean().optional().default(true),
  });
  
  export type CreateShareLinkSchemaType = z.infer<typeof createShareLinkSchema>;