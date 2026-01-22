import { describe, it, expect } from "vitest";
import { ApiException } from "@/lib/http/exceptions";

describe("ApiException Infrastructure", () => {
  it("should construct with message and parameters", () => {
    const error = new ApiException({ message: "Network Error", code: "NETWORK_ERR" }, 500);

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Network Error");
    expect(error.code).toBe("NETWORK_ERR");
    expect(error.status).toBe(500);
  });

  it("should handle missing optional parameters", () => {
     const error = new ApiException({ message: "Generic Error" });
     expect(error.message).toBe("Generic Error");
     expect(error.code).toBeUndefined();
     expect(error.status).toBeUndefined();
  });

  it("should attach details to the exception object", () => {
      const details = [{ path: ["field"], message: "Invalid field", code: "invalid_type" }];
      const error = new ApiException({ message: "Validation Error", details }, 400);

      expect(error.details).toEqual(details);
  });
});
