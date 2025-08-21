import { getPaymentLinks } from "@/lib/data/payment-links";
import PaymentLinksClient from "./payment-links-client";

const PaymentLinks = async () => {
  const res = await getPaymentLinks();
  if (!res.ok) throw new Error(res.message);

  return <PaymentLinksClient links={res.data} />;
};

export default PaymentLinks;
