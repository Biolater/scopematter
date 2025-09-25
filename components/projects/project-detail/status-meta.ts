import type { ChipProps } from "@heroui/chip";
import type {
  ChangeOrderStatus,
  ProjectStatus,
  RequestStatus,
  ScopeItemStatus,
} from "@/lib/types/project.types";

export type StatusMeta = { label: string; color: NonNullable<ChipProps["color"]> };

export const projectStatusMeta: Record<ProjectStatus, StatusMeta> = {
  PENDING: { label: "Pending", color: "warning" },
  IN_PROGRESS: { label: "In Progress", color: "primary" },
  COMPLETED: { label: "Completed", color: "success" },
};

export const scopeStatusMeta: Record<ScopeItemStatus, StatusMeta> = {
  PENDING: { label: "Pending", color: "warning" },
  IN_PROGRESS: { label: "In Progress", color: "primary" },
  COMPLETED: { label: "Completed", color: "success" },
};

export const requestStatusMeta: Record<RequestStatus, StatusMeta> = {
  PENDING: { label: "Pending", color: "warning" },
  IN_SCOPE: { label: "In Scope", color: "success" },
  OUT_OF_SCOPE: { label: "Out of Scope", color: "danger" },
};

export const changeOrderStatusMeta: Record<ChangeOrderStatus, StatusMeta> = {
  PENDING: { label: "Pending", color: "warning" },
  APPROVED: { label: "Approved", color: "success" },
  REJECTED: { label: "Rejected", color: "danger" },
};

