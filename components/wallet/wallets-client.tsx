"use client";

import { useState, useOptimistic, startTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addToast } from "@heroui/toast";
import { useServerAction } from "@/lib/hooks/use-server-action";
import {
  deleteWalletAction,
  makePrimaryAction,
} from "@/lib/actions/wallet.actions";
import DeleteWalletDialog from "./delete-wallet-dialog";
import WalletCard from "./wallet-card";
import { Wallet } from "@/lib/types/wallet.types";

// optimistic reducer
type OptimisticAction =
  | { type: "delete"; id: string }
  | { type: "makePrimary"; id: string };

export default function WalletsClient({ wallets }: { wallets: Wallet[] }) {
  const [selected, setSelected] = useState<Wallet | null>(null);

  // useOptimistic layered directly over server-provided wallets
  const [optimisticWallets, dispatchOptimistic] = useOptimistic<
    Wallet[],
    OptimisticAction
  >(wallets, (current, action) => {
    switch (action.type) {
      case "delete":
        return current.filter((w) => w.id !== action.id);
      case "makePrimary":
        return current.map((w) => ({
          ...w,
          isPrimary: w.id === action.id,
        }));
      default:
        return current;
    }
  });

  // Delete action
  const { runAction: runDelete, isPending: deleting } = useServerAction(
    deleteWalletAction,
    {
      onError: (err) =>
        addToast({
          title: err.message ?? "Failed to delete wallet",
          color: "danger",
        }),
    }
  );

  // Make primary action
  const { runAction: runMakePrimary, isPending: makingPrimary } =
    useServerAction(makePrimaryAction, {
      onError: (err) =>
        addToast({
          title: err.message ?? "Failed to make primary",
          color: "danger",
        }),
    });

  const handleConfirmDelete = (id: string) => {
    if (deleting || !selected) return;
    if (selected.isPrimary) {
      addToast({ title: "Primary wallet cannot be deleted", color: "warning" });
      return;
    }

    // optimistic remove
    startTransition(() => {
      dispatchOptimistic({ type: "delete", id });
    });
    addToast({ title: "Wallet deleted successfully", color: "success" });

    // backend call
    runDelete({ id });

    // close dialog
    setSelected(null);
  };

  const handleMakePrimary = (id: string) => {
    if (makingPrimary) return;

    // optimistic toggle
    startTransition(() => {
      dispatchOptimistic({ type: "makePrimary", id });
    });

    addToast({ title: "Wallet made primary successfully", color: "success" });
    // backend call
    runMakePrimary({ id });
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {[...optimisticWallets]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((w, i) => (
            <motion.div
              key={w.id}
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
              <WalletCard
                wallet={w}
                onDelete={() => setSelected(w)}
                onMakePrimary={handleMakePrimary}
              />
            </motion.div>
          ))}
      </AnimatePresence>

      <DeleteWalletDialog
        wallet={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        onConfirm={(id) => handleConfirmDelete(id)}
      />
    </motion.div>
  );
}
