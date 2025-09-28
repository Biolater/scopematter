"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  ClipboardList,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { listContainer, listItemRise } from "@/lib/animations";
import { Tooltip } from "@heroui/tooltip";
import type { ChangeOrder } from "@/lib/types/project.types";
import { changeOrderStatusMeta } from "../status-meta";
import { useServerAction } from "@/lib/hooks/use-server-action";
import {
  approveChangeOrderAction,
  rejectChangeOrderAction,
} from "@/lib/actions/changeOrder.actions";
import { addToast } from "@heroui/toast";
import { fetchChangeOrderPdf } from "@/lib/actions/changeOrder.actions";
import { downloadBlob } from "@/lib/download";
import { useState } from "react";

type ChangeOrdersListProps = {
  orders: ChangeOrder[];
  projectId: string;
  onEdit: (order: ChangeOrder) => void;
  onDelete: (id: string) => void;
};

export default function ChangeOrdersList({
  orders,
  projectId,
  onEdit,
  onDelete,
}: ChangeOrdersListProps) {
  const [exportingId, setExportingId] = useState<string | null>(null);
  const { isPending: isApproving, runAction: runApproveAction } =
    useServerAction(approveChangeOrderAction, {
      onSuccess: () => {
        addToast({ title: "Change order approved", color: "success" });
      },
      onError: (err) => {
        addToast({
          title: err.message ?? "Failed to approve change order",
          color: "danger",
        });
      },
    });

  const { isPending: isRejecting, runAction: runRejectAction } =
    useServerAction(rejectChangeOrderAction, {
      onSuccess: () => {
        addToast({ title: "Change order rejected", color: "success" });
      },
      onError: (err) => {
        addToast({
          title: err.message ?? "Failed to reject change order",
          color: "danger",
        });
      },
    });
  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default-200 px-6 py-12 text-center text-sm text-default-600">
        No change orders yet.
      </div>
    );
  }

  return (
    <motion.div
      variants={listContainer}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {orders.map((order) => {
        const status = changeOrderStatusMeta[order.status];

        return (
          <motion.div
            key={order.id}
            variants={listItemRise}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card className="border border-default-200 shadow-sm">
              <CardBody className="flex flex-col gap-3">
                {/* Price + Status */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 text-sm text-default-600">
                    <span className="font-semibold text-base text-default-900">
                      ${order.priceUsd}
                    </span>
                    {order.extraDays && (
                      <Chip size="sm" variant="flat" color="default">
                        +{order.extraDays} days
                      </Chip>
                    )}
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={status.color}
                    className="text-xs font-medium"
                  >
                    {status.label}
                  </Chip>
                </div>

                {/* Linked request */}
                {order.request && (
                  <div className="flex items-center gap-1 text-sm text-default-500 leading-relaxed">
                    <ClipboardList className="size-3.5 text-default-400" />
                    <span>
                      From request:{" "}
                      <span className="text-default-600">
                        {order.request.description}
                      </span>
                    </span>
                  </div>
                )}
              </CardBody>

              <CardFooter className="flex gap-2 justify-end border-t border-divider pt-3">
                {order.status === "PENDING" && (
                  <>
                    <Tooltip content="Approve Change Order">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="success"
                        onPress={() =>
                          runApproveAction({
                            projectId,
                            id: order.id,
                            data: { status: "APPROVED" },
                          })
                        }
                        isLoading={isApproving}
                        isDisabled={isApproving || isRejecting}
                      >
                        <CheckCircle className="size-4" />
                      </Button>
                    </Tooltip>

                    <Tooltip content="Reject Change Order">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() =>
                          runRejectAction({
                            projectId,
                            id: order.id,
                            data: { status: "REJECTED" },
                          })
                        }
                        isLoading={isRejecting}
                        isDisabled={isApproving || isRejecting}
                      >
                        <XCircle className="size-4" />
                      </Button>
                    </Tooltip>

                    <Tooltip content="Edit Change Order">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(order)}
                        isDisabled={isApproving || isRejecting}
                      >
                        <Pencil className="size-4" />
                      </Button>
                    </Tooltip>

                    <Tooltip content="Delete Change Order">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => onDelete(order.id)}
                        isDisabled={isApproving || isRejecting}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </Tooltip>
                  </>
                )}
                <Tooltip content="Export Change Order">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    isLoading={exportingId === order.id}
                    isDisabled={exportingId === order.id}
                    onPress={async () => {
                      setExportingId(order.id);
                      const blob = await fetchChangeOrderPdf(
                        `/projects/${projectId}/change-orders/${order.id}/export`
                      );
                      downloadBlob(blob, `change-order-${order.id}.pdf`);
                      setExportingId(null);
                    }}
                  >
                    <Download className="size-4" />
                  </Button>
                </Tooltip>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
