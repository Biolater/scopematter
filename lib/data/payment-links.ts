import { handleQuery } from "../http/query";
import type { PaymentLink } from "../types/payment-link.types";

export const getPaymentLinks = async () => {
  return await handleQuery<PaymentLink[]>("/payment-links", {
    tags: ["payment-links"],
    revalidate: 300,
  });
};
