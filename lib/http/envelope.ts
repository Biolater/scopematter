import { ErrorDetail } from "@/lib/types/error.types";

export interface ApiSuccess<T> {
  success: true;
  data: T;
  error: null;
  meta: Record<string, unknown>;
}

export interface ApiError {
  success: false;
  data: null;
  error: {
    message: string;
    code: string;
    details?: ErrorDetail[];
  };
  meta: Record<string, unknown>;
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiError;
