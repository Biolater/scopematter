import { describe, it, expect, vi } from "vitest";
import { handleAction } from "../../lib/http/action";
import { z } from "zod";

// Mock the 'api' module since we don't want to make real network calls
vi.mock("../../lib/http/api", () => ({
  api: vi.fn(),
}));

describe("Gateway Pattern: handleAction", () => {
  const testSchema = z.object({
    email: z.string().email(),
    count: z.number().min(1),
  });

  it("should block invalid data BEFORE calling the API (Validation Guard)", async () => {
    // Act: Send invalid data (invalid email, count too low)
    const result = await handleAction({
      schema: testSchema,
      path: "/test",
      method: "POST",
      body: { email: "not-an-email", count: 0 },
    });

    // Assert: Expect validation error structure
    expect(result.ok).toBe(false);
    if (!result.ok) {
        expect(result.code).toBe("VALIDATION_ERROR");
        expect(result.details).toHaveLength(2); // Two errors
        expect(result.details?.[0].message).toBeDefined();
    }
  });

  it("should allow valid data to pass", async () => {
     // We need to mock the api implementation for the success path
     const { api } = await import("../../lib/http/api");
     (api as any).mockResolvedValue({ success: true, id: 123 });

    // Act
    const result = await handleAction({
        schema: testSchema,
        path: "/test",
        method: "POST",
        body: { email: "valid@example.com", count: 5 },
      });
  
    // Assert
    expect(result.ok).toBe(true);
  });
});
