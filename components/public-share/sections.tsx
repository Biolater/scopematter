"use client";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { changeOrderStatusMeta, requestStatusMeta, scopeStatusMeta } from "@/components/projects/project-detail/status-meta";
import { Row, EmptyRow } from "./share-row";
import type { ChangeOrderStatus, RequestStatus, ScopeItemStatus } from "@/lib/types/project.types";

export function ScopeSection({
  items,
}: {
  items: Array<{ id: string; name: string; description: string; status: ScopeItemStatus; createdAt?: string | null }>;
}) {
  return (
    <section aria-label="Scope Items" className="space-y-3">
      <h2 className="text-lg font-semibold text-default-900">Scope Items</h2>
      <Card className="border border-default-200 shadow-sm">
        <CardBody className="divide-y divide-default-200 p-0">
          {items.length === 0 ? (
            <EmptyRow label="No scope items available." />
          ) : (
            items.map((item) => {
              const meta = scopeStatusMeta[item.status];
              return (
                <Row
                  key={item.id}
                  title={item.name}
                  description={item.description}
                  right={<Chip size="sm" variant="flat" color={meta.color}>{meta.label}</Chip>}
                  subRight={item.createdAt ? <span className="text-xs text-default-400">{safeDate(item.createdAt)}</span> : null}
                />
              );
            })
          )}
        </CardBody>
      </Card>
    </section>
  );
}

export function RequestsSection({
  requests,
}: {
  requests: Array<{ id: string; description: string; status: RequestStatus; createdAt?: string | null }>;
}) {
  return (
    <section aria-label="Requests" className="space-y-3">
      <h2 className="text-lg font-semibold text-default-900">Requests</h2>
      <Card className="border border-default-200 shadow-sm">
        <CardBody className="divide-y divide-default-200 p-0">
          {requests.length === 0 ? (
            <EmptyRow label="No requests available." />
          ) : (
            requests.map((req) => {
              const meta = requestStatusMeta[req.status];
              return (
                <Row
                  key={req.id}
                  title={req.description}
                  right={<Chip size="sm" variant="flat" color={meta.color}>{meta.label}</Chip>}
                  subRight={req.createdAt ? <span className="text-xs text-default-400">{safeDate(req.createdAt)}</span> : null}
                />
              );
            })
          )}
        </CardBody>
      </Card>
    </section>
  );
}

export function ChangeOrdersSection({
  orders,
}: {
  orders: Array<{ id: string; priceUsd: string; extraDays?: number | null; status: ChangeOrderStatus; request?: { id: string; description: string } | null }>;
}) {
  return (
    <section aria-label="Change Orders" className="space-y-3">
      <h2 className="text-lg font-semibold text-default-900">Change Orders</h2>
      <Card className="border border-default-200 shadow-sm">
        <CardBody className="divide-y divide-default-200 p-0">
          {orders.length === 0 ? (
            <EmptyRow label="No change orders available." />
          ) : (
            orders.map((order) => {
              const meta = changeOrderStatusMeta[order.status];
              return (
                <Row
                  key={order.id}
                  title={order.request?.description ?? `Change Order #${order.id.slice(0, 6)}`}
                  description={order.extraDays ? `+${order.extraDays} days` : undefined}
                  right={
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-default-900">{order.priceUsd}</span>
                      <Chip size="sm" variant="flat" color={meta.color}>{meta.label}</Chip>
                    </div>
                  }
                />
              );
            })
          )}
        </CardBody>
      </Card>
    </section>
  );
}

function safeDate(input?: string | Date | null) {
  try {
    return new Date(input ?? "").toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return "--";
  }
}


