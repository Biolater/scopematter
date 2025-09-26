"use client";

import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { FileText, ListChecks, MessageSquare, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { listContainer, listItemRise } from "@/lib/animations";
import { useState, type ReactNode } from "react";

import type {
  ChangeOrder,
  ProjectRequest,
  ScopeItem,
} from "@/lib/types/project.types";
import { changeOrderStatusMeta } from "./status-meta";

import ScopeItemDialog from "./dialogs/scope-item/scope-item-dialog";
import ScopeItemsTable from "./tables/scope-item-table";
import DeleteScopeItemDialog from "./dialogs/scope-item/delete-scope-item-dialog";
import EditScopeItemDialog from "./dialogs/scope-item/edit-scope-item-dialog";
import RequestsList from "./tables/requests-list";
import CreateRequestDialog from "./dialogs/requests/create-request-dialog";
import DeleteRequestDialog from "./dialogs/requests/delete-request-dialog";

import {
  markRequestInScopeAction,
  markRequestOutOfScopeAction,
  markRequestPendingAction,
  deleteRequestAction,
} from "@/lib/actions/request.actions";
import { useServerAction } from "@/lib/hooks/use-server-action";
import { addToast } from "@heroui/toast";

export default function ProjectTabs({
  scopeItems,
  requests,
  changeOrders,
  projectId,
}: {
  scopeItems: ScopeItem[];
  requests: ProjectRequest[];
  changeOrders: ChangeOrder[];
  projectId: string;
}) {
  const [isScopeOpen, setIsScopeOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [isChangeOrderOpen, setIsChangeOrderOpen] = useState(false);
  const [editItem, setEditItem] = useState<ScopeItem | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [deleteRequestId, setDeleteRequestId] = useState<string | null>(null);
  const [editRequest, setEditRequest] = useState<ProjectRequest | null>(null);

  const [loadingRequestId, setLoadingRequestId] = useState<string | null>(null);
  const [loadingAction, setLoadingAction] = useState<
    "IN_SCOPE" | "OUT_OF_SCOPE" | "PENDING" | null
  >(null);

  const { runAction: runInScope } = useServerAction(markRequestInScopeAction, {
    onSuccess: () => addToast({ title: "Marked In Scope", color: "success" }),
    onError: (err) =>
      addToast({ title: err.message ?? "Failed to update", color: "danger" }),
    onSettled: () => {
      setLoadingRequestId(null);
      setLoadingAction(null);
    },
  });

  const { runAction: runOutOfScope } = useServerAction(
    markRequestOutOfScopeAction,
    {
      onSuccess: () =>
        addToast({ title: "Marked Out of Scope", color: "warning" }),
      onError: (err) =>
        addToast({ title: err.message ?? "Failed to update", color: "danger" }),
      onSettled: () => {
        setLoadingRequestId(null);
        setLoadingAction(null);
      },
    }
  );

  const { runAction: runPending } = useServerAction(markRequestPendingAction, {
    onSuccess: () => addToast({ title: "Reset to Pending", color: "default" }),
    onError: (err) =>
      addToast({ title: err.message ?? "Failed to update", color: "danger" }),
    onSettled: () => {
      setLoadingRequestId(null);
      setLoadingAction(null);
    },
  });

  const { runAction: runDelete } = useServerAction(deleteRequestAction, {
    onSuccess: () => addToast({ title: "Request deleted", color: "success" }),
    onError: (err) =>
      addToast({ title: err.message ?? "Failed to delete", color: "danger" }),
    onSettled: () => {
      setLoadingRequestId(null);
      setLoadingAction(null);
    },
  });

  return (
    <>
      <Tabs
        defaultSelectedKey="scope"
        color="primary"
        variant="underlined"
        classNames={{
          tab: "px-4 py-2 rounded-xl data-[hover=true]:bg-primary/10",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        {/* Scope Items tab */}
        <Tab
          key="scope"
          title={
            <TabTitle
              icon={<ListChecks className="size-4" />}
              label="Scope Items"
              count={scopeItems.length}
            />
          }
        >
          <div className="mt-3">
            <ScopeItemsTable
              items={scopeItems}
              onAdd={() => setIsScopeOpen(true)}
              onEdit={(item) => setEditItem(item)}
              onDelete={(item) => setDeleteItemId(item.id)}
            />
          </div>
        </Tab>

        {/* Requests tab */}
        <Tab
          key="requests"
          title={
            <TabTitle
              icon={<MessageSquare className="size-4" />}
              label="Requests"
              count={requests.length}
            />
          }
        >
          <div className="mt-3 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-default-900">
                Requests
              </h3>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Plus className="size-4" />}
                onPress={() => setIsRequestOpen(true)}
              >
                Add Request
              </Button>
            </div>

            <RequestsList
              requests={requests}
              onAdd={() => setIsRequestOpen(true)}
              onEdit={(req) => setEditRequest(req)}
              onDelete={(id) => {
                setLoadingRequestId(id);
                runDelete({ projectId, data: { id } });
              }}
              onMarkInScope={(id) => {
                setLoadingRequestId(id);
                setLoadingAction("IN_SCOPE");
                runInScope({ projectId, id, data: { status: "IN_SCOPE" } });
              }}
              onMarkOutOfScope={(id) => {
                setLoadingRequestId(id);
                setLoadingAction("OUT_OF_SCOPE");
                runOutOfScope({
                  projectId,
                  id,
                  data: { status: "OUT_OF_SCOPE" },
                });
              }}
              onMarkPending={(id) => {
                setLoadingRequestId(id);
                setLoadingAction("PENDING");
                runPending({ projectId, id, data: { status: "PENDING" } });
              }}
              loadingRequestId={loadingRequestId}
              loadingAction={loadingAction}
            />
          </div>
        </Tab>

        {/* Change Orders tab */}
        <Tab
          key="changes"
          title={
            <TabTitle
              icon={<FileText className="size-4" />}
              label="Change Orders"
              count={changeOrders.length}
            />
          }
        >
          <TabContent
            onAdd={() => setIsChangeOrderOpen(true)}
            title="Change Orders"
            buttonLabel="Create Change Order"
            emptyText="No change orders yet."
            items={changeOrders}
            getKey={(i) => i.id}
            renderItem={(order) => {
              const status = changeOrderStatusMeta[order.status];
              return (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-default-600">
                    <span className="font-medium text-default-900">
                      {order.priceUsd}
                    </span>
                    <span>
                      {order.extraDays
                        ? `+${order.extraDays} days`
                        : "No timeline impact"}
                    </span>
                  </div>
                  <Chip
                    variant="flat"
                    color={status.color}
                    className="w-fit text-xs font-medium"
                  >
                    {status.label}
                  </Chip>
                </div>
              );
            }}
          />
        </Tab>
      </Tabs>

      {/* Dialogs */}
      <ScopeItemDialog
        projectId={projectId}
        isOpen={isScopeOpen}
        onOpenChange={setIsScopeOpen}
      />
      <DeleteScopeItemDialog
        deleteItemId={deleteItemId}
        onClose={() => setDeleteItemId(null)}
        projectId={projectId}
      />
      <EditScopeItemDialog
        projectId={projectId}
        isOpen={!!editItem}
        onOpenChange={(open) => setEditItem(open ? editItem : null)}
        item={editItem}
      />
      <CreateRequestDialog
        projectId={projectId}
        isOpen={isRequestOpen}
        onOpenChange={setIsRequestOpen}
      />
      <DeleteRequestDialog
        deleteRequestId={deleteRequestId}
        onClose={() => setDeleteRequestId(null)}
        projectId={projectId}
      />
    </>
  );
}

function TabTitle({
  icon,
  label,
  count,
}: {
  icon: ReactNode;
  label: string;
  count: number;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      {icon}
      <span>{label}</span>
      <span className="rounded-full bg-primary/10 px-2 text-xs text-primary">
        {count}
      </span>
    </div>
  );
}

function TabContent<T>({
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
