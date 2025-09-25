"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { Pencil, Trash2 } from "lucide-react";
import type { ScopeItem } from "@/lib/types/project.types";
import { scopeStatusMeta } from "../status-meta";

type ScopeItemsTableProps = {
  items: ScopeItem[];
  onAdd?: () => void;
  onEdit?: (item: ScopeItem) => void;
  onDelete?: (item: ScopeItem) => void;
};

type Column = { key: string; label: string; minWidth?: number };

const columns: Column[] = [
  { key: "name", label: "Name", minWidth: 160 },
  { key: "description", label: "Description", minWidth: 280 },
  { key: "status", label: "Status", minWidth: 120 },
  { key: "createdAt", label: "Created", minWidth: 140 },
  { key: "actions", label: "Actions", minWidth: 140 },
];

export default function ScopeItemsTable({
  items,
  onAdd,
  onEdit,
  onDelete,
}: ScopeItemsTableProps) {
  return (
    <Table
      aria-label="Project scope items"
      isStriped
      classNames={{
        table: "min-w-full",
        thead: "rounded-lg",
        wrapper: "shadow-sm border border-default-200 rounded-2xl",
      }}
      topContent={
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-default-900">
            Scope Items
          </h3>
          <Button color="primary" size="sm" onPress={onAdd}>
            Add Item
          </Button>
        </div>
      }
      topContentPlacement="inside"
    >
      <TableHeader columns={columns}>
        {(col: Column) => (
          <TableColumn
            key={col.key}
            width={col.minWidth}
            className="text-xs font-semibold text-default-600"
          >
            {col.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        items={items}
        emptyContent={
          <div className="text-default-500 text-sm">No scope items yet.</div>
        }
      >
        {(item: ScopeItem) => (
          <TableRow key={item.id}>
            <TableCell className="text-sm font-medium text-default-900">
              {item.name}
            </TableCell>

            <TableCell className="max-w-[520px]">
              <Tooltip content={item.description} placement="top" delay={300}>
                <span className="block truncate text-sm text-default-600">
                  {item.description}
                </span>
              </Tooltip>
            </TableCell>

            <TableCell>
              {(() => {
                const meta = scopeStatusMeta[item.status];
                return (
                  <Chip
                    size="sm"
                    variant="flat"
                    color={meta.color}
                    className="text-xs font-medium"
                  >
                    {meta.label}
                  </Chip>
                );
              })()}
            </TableCell>

            <TableCell className="text-sm text-default-500">
              {safeDate(item.createdAt)}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="light"
                  startContent={<Pencil className="size-4" />}
                  onPress={() => onEdit?.(item)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  color="danger"
                  startContent={<Trash2 className="size-4" />}
                  onPress={() => onDelete?.(item)}
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

function safeDate(input?: string | Date | null) {
  try {
    return new Date(input ?? "").toLocaleDateString(undefined, {
      dateStyle: "medium",
    });
  } catch {
    return "--";
  }
}
