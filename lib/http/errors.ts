import { ApiException } from "./exceptions";
import { ErrorDetail } from "@/lib/types/error.types";

export function normalizeError(e: unknown) {
  if (e instanceof ApiException) {
    return {
      message: e.message,
      code: e.code,
      details: e.details ?? [],
    };
  }
  if (e instanceof Error) {
    return { message: e.message, code: undefined, details: [] };
  }
  return { message: "Unknown error", code: undefined, details: [] };
}

export function detailsToRHF(details: ErrorDetail[]) {
  const result: Record<string, { type: string; message: string }> = {};
  for (const d of details) {
    if (d.field) {
      result[d.field] = { type: "server", message: d.message };
    }
  }
  return result;
}
