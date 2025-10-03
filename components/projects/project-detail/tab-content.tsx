import { Button } from "@heroui/button";
import { Plus } from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { listContainer, listItemRise } from "@/lib/animations";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function TabContent<T>({
  title,
  buttonLabel,
  emptyText,
  items,
  renderItem,
  getKey,
  onAdd,
}: {
  title: string;
  buttonLabel: string;
  emptyText: string;
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey?: (item: T) => string | number;
  onAdd: () => void;
}) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-default-900">{title}</h3>
        <Button
          size="sm"
          variant="flat"
          color="primary"
          startContent={<Plus className="size-4" />}
          onPress={onAdd}
        >
          {buttonLabel}
        </Button>
      </div>
      <Card className="border border-default-200 shadow-sm">
        <CardBody className="space-y-4">
          {items.length ? (
            <motion.div
              variants={listContainer}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {items.map((item, index) => (
                <motion.div
                  key={getKey ? getKey(item) : index}
                  variants={listItemRise}
                  className="rounded-2xl border border-default-200 bg-default-50/60 p-4 shadow-sm"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  {renderItem(item)}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-default-200 px-6 py-12 text-sm text-default-500">
              {emptyText}
            </div>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
}
