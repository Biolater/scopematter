"use client";

import { useMemo } from "react";
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

import { createRequestAction } from "@/lib/actions/request.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";

import {
  createRequestSchema,
  type CreateRequestSchemaType,
} from "@/lib/validation/request.schema";
import type { ProjectRequest } from "@/lib/types/project.types";
import { Plus } from "lucide-react";

type CreateRequestDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
};

export default function CreateRequestDialog({
  isOpen,
  onOpenChange,
  projectId,
}: CreateRequestDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateRequestSchemaType>({
    resolver: zodResolver(createRequestSchema),
    defaultValues: { description: "" },
    mode: "onSubmit",
  });

  const { runAction, isPending } = useServerAction<
    { projectId: string; data: CreateRequestSchemaType },
    ProjectRequest
  >(createRequestAction, {
    onSuccess: () => {
      addToast({ title: "Request created", color: "success" });
      reset();
      onOpenChange(false);
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to create request",
        color: "danger",
      });
      applyFieldErrors<CreateRequestSchemaType>(err.details, setError);
    },
  });

  const submitting = useMemo(
    () => isSubmitting || isPending,
    [isSubmitting, isPending]
  );

  const onSubmit = async (data: CreateRequestSchemaType) => {
    await runAction({ projectId, data });
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
            Add Request
            <span className="text-foreground-500 text-sm font-normal">
              Capture a new client request for review.
            </span>
          </ModalHeader>

          <ModalBody className="space-y-4">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Description"
                  placeholder="E.g. Add recurring payments feature"
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
              startContent={!submitting && <Plus className="size-4" />}
              isLoading={submitting}
              isDisabled={submitting || !isValid}
            >
              Add Request
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
