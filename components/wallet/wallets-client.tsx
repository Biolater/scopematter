"use client";

import { Wallet } from "@/lib/types/wallet.types";
import WalletCard from "./wallet-card";
import { motion, AnimatePresence } from "framer-motion";

interface WalletsClientProps {
  wallets: Wallet[];
}

const WalletsClient = ({ wallets }: WalletsClientProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      initial="hidden"
      animate="show"
    >
      <AnimatePresence>
        {wallets.map((wallet, i) => (
          <motion.div
            key={wallet.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 100,
                delay: i * 0.1, // 👈 stagger per index
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -10,
              transition: { duration: 0.2 },
            }}
            layout
          >
            <WalletCard wallet={wallet} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default WalletsClient;
