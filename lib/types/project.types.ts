export type ProjectStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Project {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    userId: string;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    client: {
      id: string;
      name: string;
      email: string | null;
      company?: string | null; // 👈 add this
    };
    _count: {
      scopeItems: number;
      requests: number;
      changeOrders: number;
    };
  }
  
export interface CreateProjectOutput {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    userId: string;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface UpdateProjectOutput {
    id: string;
    name: string;
    description: string | null;
    status: ProjectStatus;
    userId: string;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
  }

export interface getProjectParams {
    id: string;
}

export type GetProjectsOutput = Project[];
export type ScopeItemStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export interface ScopeItem {
  id: string;
  name: string;
  description: string;
  status: ScopeItemStatus;
  createdAt: Date;
}

export type RequestStatus = "PENDING" | "IN_SCOPE" | "OUT_OF_SCOPE";
export interface ProjectRequest {
  id: string;
  description: string;
  status: RequestStatus;
  createdAt: Date;
  changeOrder: ChangeOrder | null;
  request: ProjectRequest | null;
}

export type ChangeOrderStatus = "PENDING" | "APPROVED" | "REJECTED";
export interface ChangeOrder {
  id: string;
  priceUsd: string; // display currency formatted by backend
  extraDays?: number | null;
  status: ChangeOrderStatus;
  request: ProjectRequest | null;
}

export interface ProjectDetail extends Project {
  scopeItems: ScopeItem[];
  requests: ProjectRequest[];
  changeOrders: ChangeOrder[];
}
