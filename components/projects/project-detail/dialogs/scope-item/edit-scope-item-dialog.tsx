"use client";

import { useEffect, useState } from "react";
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
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { addToast } from "@heroui/toast";

import { updateScopeItemAction } from "@/lib/actions/scopeItem.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";

import {
  updateScopeItemSchema,
  type UpdateScopeItemSchemaType,
} from "@/lib/validation/scopeItem.schema";
import type { ScopeItem } from "@/lib/types/project.types";
import { UpdateScopeItemInputFE } from "@/lib/types/scopeItem.types";

type EditScopeItemDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  item: ScopeItem | null; // pass the selected item
};

export default function EditScopeItemDialog({
  isOpen,
  onOpenChange,
  projectId,
  item,
}: EditScopeItemDialogProps) {
  const [selectOpen, setSelectOpen] = useState(false);
  const defaultValues: UpdateScopeItemSchemaType = {
    name: item?.name ?? "",
    description: item?.description ?? "",
    status: (item?.status as UpdateScopeItemSchemaType["status"]) ?? "PENDING",
  };

  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<UpdateScopeItemSchemaType>({
    resolver: zodResolver(updateScopeItemSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    // Refresh form values when the selected item changes or dialog opens
    reset({
      name: item?.name ?? "",
      description: item?.description ?? "",
      status:
        (item?.status as UpdateScopeItemSchemaType["status"]) ?? "PENDING",
    });
  }, [item, reset, isOpen]);

  const { runAction, isPending } = useServerAction<UpdateScopeItemInputFE, any>(
    updateScopeItemAction,
    {
      onSuccess: () => {
        addToast({ title: "Scope item updated", color: "success" });
        onOpenChange(false);
      },
      onError: (err) => {
        addToast({
          title: err.message ?? "Failed to update scope item",
          color: "danger",
        });
        applyFieldErrors<UpdateScopeItemSchemaType>(err.details, setError);
      },
    }
  );

  const submitting = isSubmitting || isPending;

  const onSubmit = async (data: UpdateScopeItemSchemaType) => {
    if (!item) return;
    await runAction({ projectId, id: item.id, data });
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
            Edit Scope Item
            <span className="text-foreground-500 text-sm font-normal">
              Update the scope item details.
            </span>
          </ModalHeader>

          <ModalBody className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Name"
                  placeholder="Auth module"
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isRequired
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Description"
                  placeholder="Implement login, registration, and session handling…"
                  minRows={3}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />

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
              isDisabled={submitting || !isValid || !isDirty || !item}
            >
              Save Changes
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
