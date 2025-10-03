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
import { Input, Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";

import { createScopeItemAction } from "@/lib/actions/scopeItem.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";

import {
  createScopeItemSchema,
  type CreateScopeItemSchemaType,
} from "@/lib/validation/scopeItem.schema";
import type { ScopeItem } from "@/lib/types/project.types";
import { Plus } from "lucide-react";

type ScopeItemDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
};

export default function ScopeItemDialog({
  isOpen,
  onOpenChange,
  projectId,
}: ScopeItemDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CreateScopeItemSchemaType>({
    resolver: zodResolver(createScopeItemSchema),
    defaultValues: { name: "", description: "" },
    mode: "onSubmit",
  });

  const { runAction, isPending } = useServerAction<
    { projectId: string; data: CreateScopeItemSchemaType },
    ScopeItem
  >(createScopeItemAction, {
    onSuccess: () => {
      addToast({ title: "Scope item created", color: "success" });
      reset();
      onOpenChange(false);
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to create scope item",
        color: "danger",
      });
      applyFieldErrors<CreateScopeItemSchemaType>(err.details, setError);
    },
  });

  const submitting = useMemo(
    () => isSubmitting || isPending,
    [isSubmitting, isPending]
  );

  const onSubmit = async (data: CreateScopeItemSchemaType) => {
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
            Add Scope Item
            <span className="text-foreground-500 text-sm font-normal">
              Define a clear deliverable to keep scope tight.
            </span>
          </ModalHeader>

          <ModalBody className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Item name"
                  placeholder="Authentication page UI"
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

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Description"
                  placeholder="Build responsive login & signup screens with validation and Clerk integration."
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
              Add Item
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
