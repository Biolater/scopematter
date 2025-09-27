"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";

import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";
import { createChangeOrderAction } from "@/lib/actions/changeOrder.actions";

import {
  createChangeOrderSchema,
  type CreateChangeOrderSchemaType,
} from "@/lib/validation/changeOrder.schema";
import type {
  CreateChangeOrderInput,
  CreateChangeOrderOutput,
} from "@/lib/types/changeOrder.types";
import type { ProjectRequest } from "@/lib/types/project.types";

type CreateChangeOrderDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  requestId?: string | null; // pre-fill when triggered from a request
  eligibleRequests: ProjectRequest[]; // OUT_OF_SCOPE & without change order
};

export default function CreateChangeOrderDialog({
  isOpen,
  onOpenChange,
  projectId,
  requestId,
  eligibleRequests,
}: CreateChangeOrderDialogProps) {
  const defaultValues: CreateChangeOrderSchemaType = {
    requestId: requestId ?? eligibleRequests[0]?.id ?? "",
    priceUsd: 0,
    extraDays: undefined,
  };

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<CreateChangeOrderSchemaType>({
    resolver: zodResolver(createChangeOrderSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      requestId: requestId ?? eligibleRequests[0]?.id ?? "",
      priceUsd: 0,
      extraDays: undefined,
    });
  }, [requestId, eligibleRequests, isOpen, reset]);

  const { runAction, isPending } = useServerAction<
    CreateChangeOrderInput,
    CreateChangeOrderOutput
  >(createChangeOrderAction, {
    onSuccess: () => {
      addToast({ title: "Change order created", color: "success" });
      onOpenChange(false);
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to create change order",
        color: "danger",
      });
      applyFieldErrors<CreateChangeOrderSchemaType>(err.details, setError);
    },
  });

  const submitting = isSubmitting || isPending;
  const selectedRequestId = watch("requestId");

  const onSubmit = async (data: CreateChangeOrderSchemaType) => {
    if (!data.requestId) return;
    await runAction({
      projectId,
      data: {
        requestId: data.requestId,
        priceUsd: data.priceUsd,
        extraDays: data.extraDays,
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      size="md"
    >
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          <ModalHeader className="flex flex-col gap-1">
            Create Change Order
            <span className="text-foreground-500 text-sm font-normal">
              Select an out-of-scope request and set price/timeline.
            </span>
          </ModalHeader>

          <ModalBody className="space-y-4">
            {/* Request selector */}
            <Controller
              name="requestId"
              control={control}
              render={({ field }) => (
                <Select
                  label="Request"
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) =>
                    field.onChange(Array.from(keys)[0] as string)
                  }
                  isRequired
                  isInvalid={!!errors.requestId}
                  errorMessage={errors.requestId?.message}
                  isDisabled={submitting || eligibleRequests.length === 0}
                >
                  {eligibleRequests.map((req) => (
                    <SelectItem key={req.id}>
                      {req.description.length > 50
                        ? req.description.slice(0, 50) + "..."
                        : req.description}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />

            {/* Price */}
            <Controller
              name="priceUsd"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label="Price (USD)"
                  placeholder="500"
                  value={field.value?.toString() ?? ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                  onBlur={field.onBlur}
                  isRequired
                  isInvalid={!!errors.priceUsd}
                  errorMessage={errors.priceUsd?.message}
                />
              )}
            />

            {/* Extra Days */}
            <Controller
              name="extraDays"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  label="Extra Days (optional)"
                  placeholder="e.g., 5"
                  value={field.value?.toString() ?? ""}
                  onValueChange={(val) =>
                    field.onChange(val ? Number(val) : undefined)
                  }
                  onBlur={field.onBlur}
                  isInvalid={!!errors.extraDays}
                  errorMessage={errors.extraDays?.message}
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
              isDisabled={
                submitting || !isValid || !isDirty || !selectedRequestId
              }
            >
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
