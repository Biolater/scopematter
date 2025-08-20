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

// You can expand later; for now keep in sync with your BE enums.
const CHAINS = [
  { key: "ETH_MAINNET", label: "Ethereum Mainnet" },
  // { key: "BASE_MAINNET", label: "Base Mainnet" },
];

// Optional, for TS friendliness
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
    };
  }
}

async function createWallet(payload: WalletSchemaType) {
  const res = await fetch("/api/wallets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Expecting your standard response envelope. Adjust as needed.
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.success === false) {
    const msg =
      json?.error?.message ||
      json?.message ||
      `Failed to create wallet (HTTP ${res.status})`;
    throw new Error(msg);
  }
  return json?.data ?? json;
}

const CreateWalletDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<WalletSchemaType>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      chain: "ETH_MAINNET",
      address: "",
      isPrimary: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: WalletSchemaType) => {
    setServerError(null);
    try {
      await createWallet(data);
      // success: reset and close
      reset();
      setIsOpen(false);
    } catch (err: any) {
      setServerError(err?.message ?? "Unexpected error");
    }
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

              {/* Wrap Body + Footer with Form so the footer button can submit */}
              <Form
                validationBehavior="aria"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSubmit(onSubmit)();
                }}
              >
                <ModalBody className="space-y-4 w-full">
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
                        value={field.value} // ensures RHF drives the input value
                        onChange={(e) => field.onChange(e.target.value)}
                        endContent={
                          <Button
                            size="sm"
                            variant="flat"
                            onPress={async () => {
                              setServerError(null);
                              try {
                                if (!window.ethereum) {
                                  setServerError(
                                    "MetaMask is not available in this browser."
                                  );
                                  return;
                                }
                                const accounts = await window.ethereum.request({
                                  method: "eth_requestAccounts",
                                });
                                if (!accounts?.[0]) {
                                  setServerError(
                                    "No accounts returned by MetaMask."
                                  );
                                  return;
                                }
                                field.onChange(accounts[0]); // update RHF + UI
                                await trigger("address");
                              } catch {
                                setServerError("Failed to connect MetaMask.");
                              }
                            }}
                            isDisabled={isSubmitting}
                          >
                            Use MetaMask
                          </Button>
                        }
                      />
                    )}
                  />

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

                  {serverError ? (
                    <div className="text-danger-500 text-sm">{serverError}</div>
                  ) : null}
                </ModalBody>

                <ModalFooter className="w-full">
                  <Button
                    variant="flat"
                    onPress={onClose}
                    isDisabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
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
