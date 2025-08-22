"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { LinkIcon, Wallet as WalletIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput } from "@heroui/number-input";
import { Switch } from "@heroui/switch";
import { Form } from "@heroui/form";
import { addToast } from "@heroui/toast";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { applyFieldErrors } from "@/lib/http/map-errors";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { createPaymentLinkAction } from "@/lib/actions/payment-links.actions";
import {
  createPaymentLinkSchema,
  type CreatePaymentLinkSchemaType,
} from "@/lib/validation/payment-link.schema";
import type { Wallet } from "@/lib/types/wallet.types";
import { shortAddr } from "@/lib/utils/wallet.utils";

const ASSETS = [
  { key: "USDT", label: "USDT (Tether)" },
  { key: "ETH", label: "ETH (Ethereum)" },
];

const FIXED_CHAIN = "ETH_MAINNET" as const;

interface CreatePaymentLinkDialogProps {
  wallets: Wallet[];
}

const CreatePaymentLinkDialog = ({ wallets }: CreatePaymentLinkDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const primary = useMemo(
    () => wallets.find((w) => w.isPrimary) ?? wallets[0],
    [wallets]
  );

  const {
    control,
    handleSubmit,
    reset,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePaymentLinkSchemaType>({
    resolver: zodResolver(createPaymentLinkSchema),
    defaultValues: {
      walletId: primary?.id ?? "",
      asset: "USDT",
      chain: FIXED_CHAIN,
      amountUsd: undefined,
      memo: "",
    },
    mode: "onBlur",
  });

  const hasFixedAmount = watch("amountUsd") !== undefined;

  const { state, runAction, isPending } = useServerAction<
    CreatePaymentLinkSchemaType,
    { id: string; slug: string }
  >(createPaymentLinkAction, {
    onSuccess: (pl) => {
      addToast({
        title: "Payment link created",
        description: `Slug: ${pl.slug}`,
        color: "success",
      });
      reset({
        walletId: primary?.id ?? "",
        asset: "USDT",
        chain: FIXED_CHAIN,
        amountUsd: undefined,
        memo: "",
      });
      setIsOpen(false);
    },
    onError: (err) => {
      applyFieldErrors<CreatePaymentLinkSchemaType>(err.details, setError);
    },
  });

  const onSubmit = (data: CreatePaymentLinkSchemaType) => {
    runAction({
      ...data,
      chain: FIXED_CHAIN,
      amountUsd: hasFixedAmount ? data.amountUsd : undefined,
    });
  };

  return (
    <>
      <Button
        color="primary"
        startContent={<LinkIcon className="size-4" />}
        onPress={() => setIsOpen(true)}
      >
        Create Payment Link
      </Button>

      <Modal
        scrollBehavior="inside"
        backdrop="blur"
        size="lg"
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <LinkIcon className="size-5" />
                New Payment Link
              </ModalHeader>

              <ModalBody>
                <Form
                  validationBehavior="aria"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void handleSubmit(onSubmit)();
                  }}
                  className="space-y-4"
                >
                  {/* Wallet Select */}
                  <Controller
                    control={control}
                    name="walletId"
                    render={({ field }) => (
                      <Select
                        label="Wallet"
                        isRequired
                        selectedKeys={new Set(field.value ? [field.value] : [])}
                        onSelectionChange={(keys) => {
                          const v = Array.from(keys)[0] as string | undefined;
                          field.onChange(v ?? "");
                        }}
                        isInvalid={!!errors.walletId}
                        errorMessage={errors.walletId?.message}
                      >
                        {wallets.map((w) => (
                          <SelectItem
                            key={w.id}
                            startContent={<WalletIcon className="size-4" />}
                            description={`${w.chain} • ${shortAddr(
                              w.address
                            )}${w.isPrimary ? " • Primary" : ""}`}
                          >
                            {w.address ?? "Wallet"}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  {/* Asset Select */}
                  <Controller
                    control={control}
                    name="asset"
                    render={({ field }) => (
                      <Select
                        label="Asset"
                        isRequired
                        selectedKeys={new Set([field.value])}
                        onSelectionChange={(keys) => {
                          const v = Array.from(keys)[0] as string | undefined;
                          field.onChange(v ?? "USDT");
                        }}
                        isInvalid={!!errors.asset}
                        errorMessage={errors.asset?.message}
                      >
                        {ASSETS.map((a) => (
                          <SelectItem key={a.key}>{a.label}</SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  {/* Chain (fixed) */}
                  <Input
                    label="Network"
                    value="Ethereum Mainnet"
                    isReadOnly
                    description="We support Ethereum only"
                  />

                  {/* Fixed Amount Toggle + Number */}
                  <div className="space-y-2">
                    <Switch
                      isSelected={hasFixedAmount}
                      onValueChange={(on) => {
                        if (!on) {
                          setValue("amountUsd", undefined, {
                            shouldValidate: true,
                          });
                        } else {
                          setValue("amountUsd", 1, {
                            shouldValidate: true,
                          });
                        }
                      }}
                    >
                      Lock amount in USD (optional)
                    </Switch>

                    <Controller
                      control={control}
                      name="amountUsd"
                      render={({ field }) => (
                        <NumberInput
                          label="Amount (USD)"
                          description="Leave off to let the client enter any amount"
                          isDisabled={!hasFixedAmount}
                          minValue={1}
                          step={1}
                          value={field.value ?? ("" as unknown as number)}
                          onValueChange={(val) => {
                            field.onChange(val === null ? undefined : val);
                          }}
                          isInvalid={!!errors.amountUsd}
                          errorMessage={errors.amountUsd?.message}
                        />
                      )}
                    />
                  </div>

                  {/* Memo */}
                  <Controller
                    control={control}
                    name="memo"
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Memo (optional)"
                        placeholder="E.g., Project Alpha – milestone 1"
                        maxLength={255}
                        isInvalid={!!errors.memo}
                        errorMessage={errors.memo?.message}
                      />
                    )}
                  />

                  {/* General error */}
                  {state.ok === false && !state.details && (
                    <div className="text-danger-500 text-sm">
                      {state.message}
                    </div>
                  )}
                </Form>
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" onPress={onClose} isDisabled={isPending}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  isLoading={isPending}
                  isDisabled={isPending}
                  onPress={() => void handleSubmit(onSubmit)()}
                >
                  Create Link
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePaymentLinkDialog;
