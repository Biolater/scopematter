"use client";

import { useState, useOptimistic, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addToast } from "@heroui/toast";
import PaymentLinkCard from "./link-card";
import DeletePaymentLinkDialog from "./delete-payment-link-dialog";
import type { PaymentLink } from "@/lib/types/payment-link.types";
import { useServerAction } from "@/lib/hooks/use-server-action";
import {
  deletePaymentLinkAction,
  setPaymentLinkStatusAction,
} from "@/lib/actions/payment-links.actions";

type OptimisticAction =
  | { type: "delete"; id: string }
  | { type: "setStatus"; id: string; status: "ACTIVE" | "INACTIVE" };

export default function PaymentLinksClient({
  links,
}: {
  links: PaymentLink[];
}) {
  const [selected, setSelected] = useState<PaymentLink | null>(null);

  const [optimisticLinks, dispatchOptimistic] = useOptimistic<
    PaymentLink[],
    OptimisticAction
  >(links, (current, action) => {
    switch (action.type) {
      case "delete":
        return current.filter((x) => x.id !== action.id);
      case "setStatus":
        return current.map((x) =>
          x.id === action.id ? { ...x, status: action.status } : x
        );
      default:
        return current;
    }
  });

  const { runAction: runDelete, isPending: deleting } = useServerAction(
    deletePaymentLinkAction,
    {
      onError: (err) =>
        addToast({
          title: err.message ?? "Failed to delete link",
          color: "danger",
        }),
    }
  );

  const { runAction: runSetStatus, isPending: toggling } = useServerAction(
    setPaymentLinkStatusAction,
    {
      onError: (err) =>
        addToast({
          title: err.message ?? "Failed to update status",
          color: "danger",
        }),
    }
  );

  const handleConfirmDelete = (id: string) => {
    if (deleting || !selected) return;

    // Only remove optimistically if this will be a true delete
    if (selected.transactions.length === 0) {
      startTransition(() => {
        dispatchOptimistic({ type: "delete", id });
      });
    }
    addToast({ title: "Payment link deleted", color: "success" });
    runDelete({ id });
    setSelected(null);
  };

  const handleToggleStatus = (
    id: string,
    nextStatus: "ACTIVE" | "INACTIVE"
  ) => {
    if (toggling) return;

    startTransition(() => {
      dispatchOptimistic({ type: "setStatus", id, status: nextStatus });
    });
    addToast({
      title: `Link ${nextStatus === "ACTIVE" ? "activated" : "deactivated"}`,
      color: "success",
    });
    runSetStatus({ id, status: nextStatus });
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {[...optimisticLinks]
          .sort(
            (a, b) =>
              new Date(b.createdAt as any).getTime() -
              new Date(a.createdAt as any).getTime()
          )
          .map((link, i) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { type: "spring", stiffness: 100, delay: i * 0.08 },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: -10,
                transition: { duration: 0.2 },
              }}
              layout
            >
              <PaymentLinkCard
                link={link}
                onDelete={() => setSelected(link)}
                onToggleStatus={handleToggleStatus}
              />
            </motion.div>
          ))}
      </AnimatePresence>

      <DeletePaymentLinkDialog
        slug={selected?.slug ?? null}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        onConfirm={() => handleConfirmDelete(selected?.id ?? "")}
      />
    </motion.div>
  );
}
