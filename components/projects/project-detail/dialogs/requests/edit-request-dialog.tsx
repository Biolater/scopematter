"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";

import { editRequestAction } from "@/lib/actions/request.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";

import {
  editRequestSchema,
  EditRequestSchemaType,
} from "@/lib/validation/request.schema";
import type { ProjectRequest } from "@/lib/types/project.types";
import { EditRequestInput } from "@/lib/types/request.types";

type EditRequestDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  request: ProjectRequest | null;
};

export default function EditRequestDialog({
  isOpen,
  onOpenChange,
  projectId,
  request,
}: EditRequestDialogProps) {
  const defaultValues: EditRequestSchemaType = {
    description: request?.description ?? "",
  };

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<EditRequestSchemaType>({
    resolver: zodResolver(editRequestSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset({ description: request?.description ?? "" });
  }, [request, reset, isOpen]);

  const { runAction, isPending } = useServerAction<EditRequestInput, void>(
    editRequestAction,
    {
      onSuccess: () => {
        addToast({ title: "Request updated successfully", color: "success" });
        onOpenChange(false);
      },
      onError: (err) => {
        addToast({
          title: err.message ?? "Failed to update request",
          color: "danger",
        });
        applyFieldErrors<EditRequestSchemaType>(err.details, setError);
        onOpenChange(false);
      },
    }
  );

  const submitting = isSubmitting || isPending;

  const onSubmit = async (data: EditRequestSchemaType) => {
    if (!request) return;
    await runAction({ projectId, id: request.id, data });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          <ModalHeader className="flex flex-col gap-1">
            Edit Request
            <span className="text-foreground-500 text-sm font-normal">
              Update the request description.
            </span>
          </ModalHeader>

          <ModalBody className="space-y-4">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Description"
                  placeholder="Describe the client request…"
                  minRows={3}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isRequired
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
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
              isDisabled={submitting || !isValid || !isDirty || !request}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
