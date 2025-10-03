import type { Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

/**
 * Strongly-types the zod resolver to the RHF form's input shape, avoiding
 * the common mismatch when schemas use preprocess.
 */
export const typedZodResolver = <T extends Record<string, any>>(
  schema: ZodType<T, any, any>
): Resolver<T> => {
  return zodResolver(schema) as Resolver<T>;
};
