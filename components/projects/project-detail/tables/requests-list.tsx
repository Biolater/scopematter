"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Pencil, Trash2, CheckCircle, XCircle, RotateCcw, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { listContainer, listItemRise } from "@/lib/animations";
import type { ProjectRequest } from "@/lib/types/project.types";
import { requestStatusMeta } from "../status-meta";
import { Tooltip } from "@heroui/tooltip";

export default function RequestsList({
  requests,
  onAdd,
  onEdit,
  onDelete,
  onMarkInScope,
  onMarkOutOfScope,
  onMarkPending,
  loadingRequestId,
  loadingAction,
}: {
  requests: ProjectRequest[];
  onAdd: () => void;
  onEdit: (req: ProjectRequest) => void;
  onDelete: (id: string) => void;
  onMarkInScope: (id: string) => void;
  onMarkOutOfScope: (id: string) => void;
  onMarkPending: (id: string) => void;
  loadingRequestId: string | null;
  loadingAction: "IN_SCOPE" | "OUT_OF_SCOPE" | "PENDING" | null;
}) {
  if (!requests.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-default-200 px-6 py-12 text-center text-sm text-default-600">
        No requests yet.
        <Button
          className="mt-4"
          size="sm"
          variant="flat"
          color="primary"
          onPress={onAdd}
        >
          Add your first Request
        </Button>
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
      {requests.map((req) => {
        const status = requestStatusMeta[req.status];
        const isLoading = loadingRequestId === req.id;

        return (
          <motion.div
            key={req.id}
            variants={listItemRise}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Card className="border border-default-200 shadow-sm">
              <CardBody className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
  <div className="flex flex-col gap-1">
    <p className="text-sm leading-relaxed text-default-600">
      {req.description}
    </p>

    {req.changeOrder && (
      <div className="flex items-center gap-1 text-xs text-default-600">
        <FileText className="size-3.5 text-default-600" />
        <span>
          Change Order ·{" "}
          <span
            className={
              req.changeOrder.status === "APPROVED"
                ? "text-success-500 font-medium"
                : req.changeOrder.status === "REJECTED"
                ? "text-danger-500 font-medium"
                : "text-warning-500 font-medium"
            }
          >
            {req.changeOrder.status.charAt(0) +
              req.changeOrder.status.slice(1).toLowerCase()}
          </span>
        </span>
      </div>
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
                {req.createdAt && (
                  <p className="text-xs text-default-600">
                    Created {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                )}
              </CardBody>

              <CardFooter className="flex gap-2 justify-end border-t border-divider pt-3">
                {req.status === "PENDING" && (
                  <>
                    <Tooltip content="Mark as In Scope">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="success"
                        onPress={() => onMarkInScope(req.id)}
                        isLoading={isLoading && loadingAction === "IN_SCOPE"}
                        isDisabled={isLoading && loadingAction !== "IN_SCOPE"}
                      >
                        <CheckCircle className="size-4" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Mark as Out of Scope">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => onMarkOutOfScope(req.id)}
                        isLoading={isLoading && loadingAction === "OUT_OF_SCOPE"}
                        isDisabled={isLoading && loadingAction !== "OUT_OF_SCOPE"}
                      >
                        <XCircle className="size-4" />
                      </Button>
                    </Tooltip>
                  </>
                )}

                {req.status === "IN_SCOPE" && (
                  <>
                    <Tooltip content="Move to Out of Scope">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => onMarkOutOfScope(req.id)}
                        isLoading={isLoading && loadingAction === "OUT_OF_SCOPE"}
                        isDisabled={isLoading && loadingAction !== "OUT_OF_SCOPE"}
                      >
                        <XCircle className="size-4" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Reset to Pending">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onMarkPending(req.id)}
                        isLoading={isLoading && loadingAction === "PENDING"}
                        isDisabled={isLoading && loadingAction !== "PENDING"}
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    </Tooltip>
                  </>
                )}

                {req.status === "OUT_OF_SCOPE" && (
                  <>
                    <Tooltip content="Move to In Scope">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="success"
                        onPress={() => onMarkInScope(req.id)}
                        isLoading={isLoading && loadingAction === "IN_SCOPE"}
                        isDisabled={isLoading && loadingAction !== "IN_SCOPE"}
                      >
                        <CheckCircle className="size-4" />
                      </Button>
                    </Tooltip>
                    <Tooltip content="Reset to Pending">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => onMarkPending(req.id)}
                        isLoading={isLoading && loadingAction === "PENDING"}
                        isDisabled={isLoading && loadingAction !== "PENDING"}
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    </Tooltip>
                  </>
                )}

                <Tooltip content="Edit Request">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => onEdit(req)}
                    isDisabled={isLoading}
                  >
                    <Pencil className="size-4" />
                  </Button>
                </Tooltip>
                <Tooltip content="Delete Request">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => onDelete(req.id)}
                    isDisabled={isLoading}
                  >
                    <Trash2 className="size-4" />
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
