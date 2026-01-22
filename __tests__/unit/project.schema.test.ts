import { describe, it, expect } from "vitest";
import { createProjectSchema } from "@/lib/validation/project.schema";

describe("Project Schema", () => {
  describe("createProjectSchema", () => {
    it("should accept valid project payload", () => {
      const validPayload = {
        name: "Website Redesign",
        description: "A complete overhaul",
        client: {
          name: "Acme Corp",
          email: "contact@acme.com",
          company: "Acme Inc.",
        },
      };

      const result = createProjectSchema.safeParse(validPayload);
      expect(result.success).toBe(true);
    });

    it("should require a project name", () => {
      const payload = {
        name: "",
        client: {
          name: "Acme Corp",
        },
      };
      const result = createProjectSchema.safeParse(payload);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Project name is required"); // Zod typically returns "String must contain at least 1 character(s)" unless custom message is set. Checked schema: it has custom message.
      }
    });

    it("should transform empty strings to undefined for optional fields (preprocess)", () => {
       const payload = {
        name: "Project X",
        description: "", // Should become undefined
        client: {
          name: "Client Y",
          email: "", // Should become undefined, then optional allows it
          company: "", // Should become undefined
        },
      };
      
      const result = createProjectSchema.safeParse(payload);
      expect(result.success).toBe(true);
      if(result.success) {
          expect(result.data.description).toBeUndefined();
          expect(result.data.client.email).toBeUndefined();
          expect(result.data.client.company).toBeUndefined();
      }
    });

    it("should validate email format if provided", () => {
         const payload = {
        name: "Project X",
        client: {
          name: "Client Y",
          email: "not-an-email", 
        },
      };
       const result = createProjectSchema.safeParse(payload);
       expect(result.success).toBe(false);
        if (!result.success) {
        expect(result.error.issues[0].message).toBe("Invalid email address");
      }
    });
  });
});
