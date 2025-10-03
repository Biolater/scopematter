"use server";

import { ZodSchema } from "zod";
import { revalidateTag } from "next/cache";
import { api } from "./api";
import { ApiException } from "./exceptions";
import { ErrorDetail } from "@/lib/types/error.types";

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; code?: string; details?: ErrorDetail[] };

type ActionOptions<TBody, TResponse> = {
  schema?: ZodSchema<TBody>;
  path: string;
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  body?: TBody;
  revalidateTags?: string[];
};

export async function handleAction<TBody, TResponse>({
  schema,
  path,
  method,
  body,
  revalidateTags,
}: ActionOptions<TBody, TResponse>): Promise<ActionResult<TResponse>> {
  if (schema) {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return {
        ok: false,
        message: "Validation failed",
        code: "VALIDATION_ERROR",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      };
    }
    body = parsed.data;
  }

  try {
    const data = await api<TResponse>(path, { method, body });

    if (revalidateTags) {
      revalidateTags.forEach((tag) => revalidateTag(tag));
    }

    return { ok: true, data };
  } catch (e) {
    console.error("💥 Error in handleAction:", e);

    if (e instanceof ApiException) {
      return {
        ok: false,
        message: e.message,
        code: e.code,
        details: e.details,
      };
    }

    // Return a more descriptive error message to the client
    const message =
      e instanceof Error ? e.message : "An unexpected error occurred.";
    return { ok: false, message };
  }
}