"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { PlusIcon, Wallet as WalletIcon } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Input } from "@heroui/input";
import { Checkbox } from "@heroui/checkbox";
import { Select, SelectItem } from "@heroui/select";
import { Form } from "@heroui/form";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWalletSchema,
  WalletSchemaType,
} from "@/lib/validation/wallet.schema";
import { createWalletAction } from "@/lib/actions/wallet.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { Wallet } from "@/lib/types/wallet.types";
import { applyFieldErrors } from "@/lib/http/map-errors";

// Chains list (MVP = ETH only)
const CHAINS = [{ key: "ETH_MAINNET", label: "Ethereum Mainnet" }];

// Add MetaMask typings
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

const CreateWalletDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    trigger,
    formState: { errors },
  } = useForm<WalletSchemaType>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      chain: "ETH_MAINNET",
      address: "",
      isPrimary: false,
    },
    mode: "onBlur",
  });

  const { state, runAction, isPending } = useServerAction<
    WalletSchemaType,
    Wallet
  >(createWalletAction, {
    onSuccess: () => {
      reset();
      setIsOpen(false);
    },
    onError: (err) => {
      if (!err.ok) {
        applyFieldErrors<WalletSchemaType>(err.details, setError);
      }
    },
  });

  const onSubmit = async (data: WalletSchemaType) => {
    console.log("onSubmit", data);
    runAction(data);
  };

  return (
    <>
      <Button
        color="primary"
        startContent={<PlusIcon className="size-4" />}
        onPress={() => setIsOpen(true)}
      >
        Add Wallet
      </Button>

      <Modal backdrop="blur" size="lg" isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center gap-2">
                <WalletIcon className="size-5" />
                Add Wallet
              </ModalHeader>

              <Form
                validationBehavior="aria"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSubmit(onSubmit)();
                }}
              >
                <ModalBody className="space-y-4 w-full">
                  {/* Chain select */}
                  <Controller
                    control={control}
                    name="chain"
                    render={({ field }) => (
                      <Select
                        label="Network"
                        isRequired
                        selectedKeys={new Set([field.value])}
                        onSelectionChange={(keys) => {
                          const v = Array.from(keys)[0] as string | undefined;
                          field.onChange(v ?? "");
                        }}
                        isInvalid={!!errors.chain}
                        errorMessage={errors.chain?.message}
                      >
                        {CHAINS.map((c) => (
                          <SelectItem key={c.key}>{c.label}</SelectItem>
                        ))}
                      </Select>
                    )}
                  />

                  {/* Wallet address */}
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Wallet Address"
                        placeholder="0x..."
                        description="Paste your EVM wallet address or use MetaMask."
                        isRequired
                        isInvalid={!!errors.address}
                        errorMessage={errors.address?.message}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        endContent={
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            className="min-w-fit"
                            onPress={async () => {
                              try {
                                if (!window.ethereum) {
                                  setError("address", {
                                    type: "manual",
                                    message: "MetaMask not available",
                                  });
                                  return;
                                }
                                const accounts = await window.ethereum.request({
                                  method: "eth_requestAccounts",
                                });
                                if (!accounts?.[0]) {
                                  setError("address", {
                                    type: "manual",
                                    message: "No account returned",
                                  });
                                  return;
                                }
                                field.onChange(accounts[0]);
                                await trigger("address");
                              } catch {
                                setError("address", {
                                  type: "manual",
                                  message: "Failed to connect MetaMask",
                                });
                              }
                            }}
                            isDisabled={isPending}
                          >
                            Use MetaMask
                          </Button>
                        }
                      />
                    )}
                  />

                  {/* Primary checkbox */}
                  <Controller
                    control={control}
                    name="isPrimary"
                    render={({ field }) => (
                      <Checkbox
                        isSelected={field.value}
                        onValueChange={field.onChange}
                      >
                        Set as primary wallet
                      </Checkbox>
                    )}
                  />

                  {/* General error */}
                  {state.ok === false && !state.details && (
                    <div className="text-danger-500 text-sm">
                      {state.message}
                    </div>
                  )}
                </ModalBody>

                <ModalFooter className="w-full">
                  <Button
                    variant="flat"
                    onPress={onClose}
                    isDisabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isPending}
                    isDisabled={isPending}
                  >
                    Add Wallet
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateWalletDialog;
