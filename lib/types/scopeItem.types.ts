import type { UpdateScopeItemSchemaType } from "@/lib/validation/scopeItem.schema";
import type { ScopeItemStatus } from "./project.types";

export type UpdateScopeItemInputFE = {
  projectId: string;
  id: string;
  data: UpdateScopeItemSchemaType;
};

export type UpdateScopeItemOutput = {
  id: string;
  projectId: string;
  name: string;
  description: string;
  status: ScopeItemStatus;
  createdAt: string;
  updatedAt: string;
};
