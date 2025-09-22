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
        name: string;
        id: string;
        email: string | null;
    };
    _count: {
        scopeItems: number;
        requests: number;
        changeOrders: number;
    };
}

export type GetProjectsOutput = Project[];