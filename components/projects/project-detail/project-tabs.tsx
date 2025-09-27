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
import TabContent from "./tab-content";
import TabTitle from "./tab-title";
import EditRequestDialog from "./dialogs/requests/edit-request-dialog";
import CreateChangeOrderDialog from "./dialogs/change-order/create-change-order-dialog";
import ChangeOrdersList from "./tables/change-order-list";
import DeleteChangeOrderDialog from "./dialogs/change-order/delete-change-order-dialog";
import EditChangeOrderDialog from "./dialogs/change-order/edit-change-order-dialog";

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
  const [deleteChangeOrderId, setDeleteChangeOrderId] = useState<string | null>(
    null
  );
  const [editChangeOrder, setEditChangeOrder] = useState<ChangeOrder | null>(
    null
  );
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
                setDeleteRequestId(id);
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
          <div className="mt-3 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-default-900">
                Change Orders
              </h3>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Plus className="size-4" />}
                onPress={() => setIsChangeOrderOpen(true)}
              >
                Create Change Order
              </Button>
            </div>

            <ChangeOrdersList
              orders={changeOrders}
              projectId={projectId}
              onDelete={(id) => {
                setDeleteChangeOrderId(id);
              }}
              onEdit={(order) => {
                setEditChangeOrder(order);
              }}
            />
          </div>
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
      <EditRequestDialog
        projectId={projectId}
        isOpen={!!editRequest}
        onOpenChange={(open) => setEditRequest(open ? editRequest : null)}
        request={editRequest}
      />
      <CreateChangeOrderDialog
        projectId={projectId}
        isOpen={isChangeOrderOpen}
        onOpenChange={setIsChangeOrderOpen}
        requestId={null}
        eligibleRequests={requests.filter(
          (req) => req.status === "OUT_OF_SCOPE" && req.changeOrder === null
        )}
      />
      <DeleteChangeOrderDialog
        deleteChangeOrderId={deleteChangeOrderId}
        onClose={() => setDeleteChangeOrderId(null)}
        projectId={projectId}
      />
      <EditChangeOrderDialog
        projectId={projectId}
        isOpen={!!editChangeOrder}
        onOpenChange={(open) =>
          setEditChangeOrder(open ? editChangeOrder : null)
        }
        order={editChangeOrder}
      />
    </>
  );
}
