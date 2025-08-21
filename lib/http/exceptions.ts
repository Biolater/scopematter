import { ErrorDetail } from "@/lib/types/error.types";

export class ApiException extends Error {
  code?: string;
  details?: ErrorDetail[];
  status?: number;

  constructor(error: { message: string; code?: string; details?: any[] }, status?: number) {
    super(error.message);
    this.code = error.code;
    this.details = error.details;
    this.status = status;
  }
}
