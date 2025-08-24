"use server";

import { handleAction } from "../http/action";
import {
  createPaymentLinkSchema,
  type CreatePaymentLinkSchemaType,
  deletePaymentLinkSchema,
  type DeletePaymentLinkSchemaType,
  setPaymentLinkStatusSchema,
  type SetPaymentLinkStatusSchemaType,
} from "../validation/payment-link.schema";

// you already wired create
export async function createPaymentLinkAction(payload: CreatePaymentLinkSchemaType) {
  return handleAction<CreatePaymentLinkSchemaType, { id: string; slug: string }>({
    schema: createPaymentLinkSchema,
    path: "/payment-links",
    method: "POST",
    body: payload,
    revalidateTags: ["payment-links"],
  });
}

export async function deletePaymentLinkAction(payload: DeletePaymentLinkSchemaType) {
  return handleAction<DeletePaymentLinkSchemaType, void>({
    schema: deletePaymentLinkSchema,
    path: `/payment-links/${payload.id}`,
    method: "DELETE",
    body: payload,
    revalidateTags: ["payment-links"],
  });
}

export async function setPaymentLinkStatusAction(payload: SetPaymentLinkStatusSchemaType) {
  return handleAction<SetPaymentLinkStatusSchemaType, { id: string; status: "ACTIVE" | "INACTIVE" }>({
    schema: setPaymentLinkStatusSchema,
    path: `/payment-links/${payload.id}/status`,
    method: "PATCH",
    body: payload,
    revalidateTags: ["payment-links"],
  });
}
