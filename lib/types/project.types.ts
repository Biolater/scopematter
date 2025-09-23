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

export type GetProjectsOutput = Project[];