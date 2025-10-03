"use client";

import { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { addToast } from "@heroui/toast";

import { createProjectAction } from "@/lib/actions/project.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { applyFieldErrors } from "@/lib/http/map-errors";

import {
  createProjectSchema,
  type CreateProjectSchemaType,
} from "@/lib/validation/project.schema";
import type { CreateProjectOutput } from "@/lib/types/project.types";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateProjectDialog = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      client: {
        name: "",
        email: "",
        company: "",
      },
    },
    mode: "onSubmit",
  });

  const { runAction, isPending } = useServerAction<
    CreateProjectSchemaType,
    CreateProjectOutput
  >(createProjectAction, {
    onSuccess: (data) => {
      addToast({
        title: "Project created successfully",
        color: "success",
      });
      router.push(`/projects/${data.id}`);
      reset();
      onClose();
    },
    onError: (err) => {
      addToast({
        title: err.message ?? "Failed to create project",
        color: "danger",
      });
      applyFieldErrors<CreateProjectSchemaType>(err.details, setError);
    },
  });

  const submitting = useMemo(
    () => isSubmitting || isPending,
    [isSubmitting, isPending]
  );

  const onSubmit = async (data: CreateProjectSchemaType) => {
    await runAction(data);
  };

  return (
    <>
      <Button
        color="primary"
        startContent={<PlusIcon className="size-4" />}
        onPress={onOpen}
      >
        Add Project
      </Button>

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
              Create New Project
              <span className="text-foreground-500 text-sm font-normal">
                Capture the basics and you can refine later.
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
                    value={(field.value as string) ?? ""}
                    onValueChange={field.onChange}
                    onBlur={field.onBlur}
                    isInvalid={!!errors.description}
                    errorMessage={errors.description?.message}
                  />
                )}
              />

              {/* Client Section */}
              <div className="mt-2">
                <div className="text-sm font-medium text-foreground-600 mb-2">
                  Client details
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {/* Client Name */}
                  <Controller
                    name="client.name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Client name"
                        placeholder="Acme Corp"
                        value={(field.value as string) ?? ""}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        isRequired
                        isInvalid={!!errors.client?.name}
                        errorMessage={errors.client?.name?.message}
                      />
                    )}
                  />

                  {/* Client Email */}
                  <Controller
                    name="client.email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Client email"
                        type="email"
                        placeholder="client@company.com"
                        value={(field.value as string) ?? ""}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        isInvalid={!!errors.client?.email}
                        errorMessage={errors.client?.email?.message}
                      />
                    )}
                  />

                  {/* Company */}
                  <Controller
                    name="client.company"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Company"
                        placeholder="Acme Ltd"
                        value={(field.value as string) ?? ""}
                        onValueChange={field.onChange}
                        onBlur={field.onBlur}
                        isInvalid={!!errors.client?.company}
                        errorMessage={errors.client?.company?.message}
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
                onPress={onClose}
                isDisabled={submitting}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                isLoading={submitting}
                isDisabled={submitting || !isValid}
              >
                Create Project
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectDialog;
