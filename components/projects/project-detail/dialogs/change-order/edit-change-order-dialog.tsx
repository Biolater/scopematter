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
import { Input } from "@heroui/input";
import { addToast } from "@heroui/toast";

import { editChangeOrderAction } from "@/lib/actions/changeOrder.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";

import {
  editChangeOrderSchema,
  EditChangeOrderSchemaType,
} from "@/lib/validation/changeOrder.schema";
import type { ChangeOrder } from "@/lib/types/project.types";

type EditChangeOrderDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  order: ChangeOrder | null;
};

export default function EditChangeOrderDialog({
  isOpen,
  onOpenChange,
  projectId,
  order,
}: EditChangeOrderDialogProps) {
  const defaultValues: EditChangeOrderSchemaType = {
    priceUsd: order?.priceUsd ? Number(order.priceUsd) : 0,
    extraDays: order?.extraDays ?? undefined,
  };

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<EditChangeOrderSchemaType>({
    resolver: zodResolver(editChangeOrderSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      priceUsd: order?.priceUsd ? Number(order.priceUsd) : 0,
      extraDays: order?.extraDays ?? undefined,
    });
  }, [order, reset, isOpen]);

  const { runAction, isPending } = useServerAction<
    { projectId: string; id: string; data: EditChangeOrderSchemaType },
    ChangeOrder
  >(editChangeOrderAction, {
    onSuccess: () => {
      addToast({ title: "Change order updated", color: "success" });
      onOpenChange(false);
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to update change order",
        color: "danger",
      });
      applyFieldErrors<EditChangeOrderSchemaType>(err.details, setError);
    },
  });

  const submitting = isSubmitting || isPending;

  const onSubmit = async (data: EditChangeOrderSchemaType) => {
    if (!order) return;
    await runAction({ projectId, id: order.id, data });
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
            Edit Change Order
            <span className="text-foreground-500 text-sm font-normal">
              Update the price, timeline of this change order.
            </span>
          </ModalHeader>

          <ModalBody className="space-y-4">
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
              isDisabled={submitting || !isValid || !isDirty || !order}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
