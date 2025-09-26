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
import { changeOrderStatusMeta, requestStatusMeta } from "./status-meta";

import ScopeItemDialog from "./dialogs/scope-item-dialog";
import ScopeItemsTable from "./tables/scope-item-table";
import DeleteScopeItemDialog from "./dialogs/delete-scope-item-dialog";
import EditScopeItemDialog from "./dialogs/edit-scope-item-dialog";
import RequestsList from "./tables/requests-list";

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
              onEdit={(req) => console.log("edit", req)}
              onDelete={(id) => console.log("delete", id)}
              onMarkInScope={(id) => console.log("mark in-scope", id)}
              onMarkOutOfScope={(id) => console.log("mark out-of-scope", id)}
              onMarkPending={(id) => console.log("mark pending", id)}
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
      {/* <RequestDialog isOpen={isRequestOpen} onOpenChange={setIsRequestOpen} /> */}
      {/* <ChangeOrderDialog isOpen={isChangeOrderOpen} onOpenChange={setIsChangeOrderOpen} /> */}
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
