import { handleQuery } from "../http/query";
import type { GetPaymentLinkBySlugResponse, PaymentLink } from "../types/payment-link.types";

export const getPaymentLinks = async () => {
  return await handleQuery<PaymentLink[]>("/payment-links", {
    tags: ["payment-links"],
    revalidate: 300,
  });
};

export const getPaymentLinkBySlug = async (slug: string) => {
  return await handleQuery<GetPaymentLinkBySlugResponse>(`/payment-links/${slug}`);
};