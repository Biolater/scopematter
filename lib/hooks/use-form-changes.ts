import { useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createChangeDetector, processFormData } from "@/lib/utils/form.utils";

/**
 * Custom hook for handling form changes and dirty state.
 * It is agnostic to Zod and works with the RHF form values you pass.
 */
export function useFormChanges<T extends Record<string, any>>(
  defaultValues: T,
  options?: Parameters<typeof useForm<T>>[0]
) {
  const form = useForm<T>({
    mode: "onSubmit",
    ...options,
  });

  const changeDetector = useMemo(() => createChangeDetector<T>(), []);

  /**
   * Gets only the changed fields from the form.
   */
  const getChangedFields = () => {
    const currentValues = form.getValues();
    return changeDetector.getChangedFields(currentValues, defaultValues);
  };

  /**
   * Checks if form has any changes.
   */
  const hasChanges = useCallback(() => {
    const currentValues = form.getValues();
    return changeDetector.hasChanges(currentValues, defaultValues);
  }, [form, changeDetector, defaultValues]);

  /**
   * Processes and returns only changed fields for submission.
   * Useful when your server expects partial updates.
   */
  const getChangedFieldsForSubmission = () => {
    const changedFields = getChangedFields();
    return processFormData(changedFields);
  };

  return {
    ...form,
    getChangedFields,
    hasChanges,
    getChangedFieldsForSubmission,
    // Expose isDirty from form state for reactive UI updates
    isDirty: form.formState.isDirty,
  };
}
