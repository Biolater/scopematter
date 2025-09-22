// Shared Framer Motion variants and motion props
// Keep this file dependency-free so both server and client components can import safely.

export const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export const listItemRise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export const hoverLiftProps = {
  whileHover: { y: -4 as number, scale: 1.02 as number },
  transition: { type: "spring" as const, stiffness: 200, damping: 15 },
};

export const popInProps = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring" as const, stiffness: 300 },
};


