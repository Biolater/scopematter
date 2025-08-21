import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ErrorDetail } from "@/lib/types/error.types";

export function applyFieldErrors<TForm extends FieldValues>(
  details: ErrorDetail[] | undefined,
  setError: UseFormSetError<TForm>
) {
  if (!details) return;
  details.forEach((d) => {
    if (d.field) {
      setError(d.field as Path<TForm>, {
        type: "server",
        message: d.message,
      });
    }
  });
}
