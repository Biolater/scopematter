import { describe, it, expect } from "vitest";
import { createChangeOrderSchema } from "@/lib/validation/changeOrder.schema";

describe("Change Order Schema", () => {
    describe("createChangeOrderSchema", () => {
        it("should accept valid payload", () => {
            const validPayload = {
                requestId: "req_123",
                priceUsd: 150.50,
                extraDays: 5,
            };
            const result = createChangeOrderSchema.safeParse(validPayload);
            expect(result.success).toBe(true);
        });

        it("should reject negative price", () => {
            const payload = {
                requestId: "req_123",
                priceUsd: -100,
                extraDays: 5,
            };
            const result = createChangeOrderSchema.safeParse(payload);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Price must be greater than 0");
            }
        });

        it("should reject price with more than 2 decimal places", () => {
            const payload = {
                requestId: "req_123",
                priceUsd: 100.999,
                extraDays: 5,
            };
            const result = createChangeOrderSchema.safeParse(payload);
            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error.issues[0].message).toBe("Price must have at most 2 decimal places");
            }
        });

        it("should reject too high price", () => {
             const payload = {
                requestId: "req_123",
                priceUsd: 1000000,
                extraDays: 5,
            };
            const result = createChangeOrderSchema.safeParse(payload);
            expect(result.success).toBe(false);
             if (!result.success) {
                expect(result.error.issues[0].message).toBe("Price too high");
            }
        });

         it("should allow optional extraDays", () => {
            const validPayload = {
                requestId: "req_123",
                priceUsd: 150.50,
            };
            const result = createChangeOrderSchema.safeParse(validPayload);
            expect(result.success).toBe(true);
        });

        it("should reject non-integer extraDays", () => {
             const payload = {
                requestId: "req_123",
                priceUsd: 150,
                extraDays: 2.5
            };
            const result = createChangeOrderSchema.safeParse(payload);
            expect(result.success).toBe(false);
            if (!result.success) {
                 expect(result.error.issues[0].message).toBe("Must be an integer");
            }
        });
    });
});
