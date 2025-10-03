"use client";

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";
import { Select, SelectItem } from "@heroui/select";

import { editProjectAction } from "@/lib/actions/project.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";
import { useFormChanges } from "@/lib/hooks/use-form-changes";
import { typedZodResolver } from "@/lib/validation/typed-resolver";

import {
  updateProjectSchema,
  type UpdateProjectFormValues, // RHF input type
  type UpdateProjectDTO, // Server payload type
} from "@/lib/validation/project.schema";

import type { Project, UpdateProjectOutput } from "@/lib/types/project.types";

type EditProjectDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
};

export default function EditProjectDialog({
  isOpen,
  onOpenChange,
  project,
}: EditProjectDialogProps) {
  const [selectOpen, setSelectOpen] = useState(false);

  // IMPORTANT: default values must follow the INPUT shape
  // (email/company can be empty string; preprocess will convert "" -> undefined).
  const defaultValues: UpdateProjectFormValues = {
    name: project?.name ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "PENDING",
    client: {
      name: project?.client?.name ?? "",
      email: project?.client?.email ?? "", // empty string ok for input
      company: project?.client?.company ?? "", // empty string ok for input
    },
  };

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
    getChangedFieldsForSubmission,
  } = useFormChanges<UpdateProjectFormValues>(defaultValues, {
    resolver: typedZodResolver<UpdateProjectFormValues>(updateProjectSchema),
  });

  useEffect(() => {
    reset(defaultValues);
  }, [project, reset]);

  const { runAction, isPending } = useServerAction<
    { id: string; data: UpdateProjectDTO }, // server expects parsed OUTPUT
    UpdateProjectOutput
  >(editProjectAction, {
    onSuccess: () => {
      addToast({
        title: "Project updated successfully",
        color: "success",
      });
      reset(defaultValues);
      onOpenChange(false);
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to update project",
        color: "danger",
      });
      // Field errors should match the INPUT shape used by the form
      applyFieldErrors<UpdateProjectFormValues>(err.details, setError);
    },
  });

  const submitting = isSubmitting || isPending;

  // Receive parsed OUTPUT values from RHF+resolver, but we still limit submission
  // to changed fields (computed from current INPUT values). Cast is safe here since
  // server will validate again and fields are a subset of the schema.
  const onSubmit = async () => {
    const changedFields = getChangedFieldsForSubmission() as UpdateProjectDTO;

    if (Object.keys(changedFields).length === 0) {
      addToast({
        title: "No changes detected",
        color: "warning",
      });
      return;
    }

    await runAction({ id: project.id, data: changedFields });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="md"
      scrollBehavior="inside"
      isDismissable={!selectOpen}
      isKeyboardDismissDisabled={selectOpen}
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          <ModalHeader className="flex flex-col gap-1">
            Edit Project
            <span className="text-foreground-500 text-sm font-normal">
              Update the details and save your changes.
            </span>
          </ModalHeader>

          <ModalBody className="space-y-4">
            {/* Project Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Project name"
                  placeholder="Website redesign for Acme Inc."
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isRequired
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                  isDisabled={submitting}
                />
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Description"
                  placeholder="Short summary of project goals…"
                  minRows={3}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                  isDisabled={submitting}
                />
              )}
            />

            {/* Status */}
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  label="Status"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const val = Array.from(keys)[0] as
                      | "PENDING"
                      | "IN_PROGRESS"
                      | "COMPLETED";
                    field.onChange(val);
                  }}
                  onOpenChange={setSelectOpen}
                  isInvalid={!!errors.status}
                  errorMessage={errors.status?.message}
                  isDisabled={submitting}
                >
                  <SelectItem key="PENDING">Pending</SelectItem>
                  <SelectItem key="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem key="COMPLETED">Completed</SelectItem>
                </Select>
              )}
            />

            {/* Client Section */}
            <div className="mt-2">
              <div className="text-sm font-medium text-foreground-600 mb-2">
                Client details
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Controller
                  name="client.name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Client name"
                      placeholder="Acme Corp"
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      onBlur={field.onBlur}
                      isRequired
                      isInvalid={!!errors.client?.name}
                      errorMessage={errors.client?.name?.message}
                      isDisabled={submitting}
                    />
                  )}
                />

                <Controller
                  name="client.email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Client email"
                      type="email"
                      placeholder="client@company.com"
                      value={(field.value as string) ?? ""} // ✅ force to string
                      onValueChange={(val) => field.onChange(val ?? "")} // ✅ normalize
                      onBlur={field.onBlur}
                      isInvalid={!!errors.client?.email}
                      errorMessage={(errors.client?.email as any)?.message}
                      isDisabled={submitting}
                    />
                  )}
                />

                <Controller
                  name="client.company"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Company"
                      placeholder="Acme Ltd"
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                      onBlur={field.onBlur}
                      isInvalid={!!errors.client?.company}
                      errorMessage={errors.client?.company?.message}
                      isDisabled={submitting}
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="light"
              color="danger"
              onPress={() => onOpenChange(false)}
              isDisabled={submitting}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={submitting}
              isDisabled={submitting || !isValid || !isDirty}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
