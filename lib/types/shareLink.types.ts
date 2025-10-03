import { ChangeOrderStatus, ProjectStatus, RequestStatus, ScopeItemStatus } from "./project.types";

export interface GetShareLinksParams {
    projectId: string;
}

export interface GetShareLinkParams {
    token: string;
}

export interface ShareLink {
    id: string;
    projectId: string;
    expiresAt?: string | null;
    revokedAt?: string | null;
    isActive: boolean;
    viewCount: number;
    lastViewedAt?: string | null;
    createdAt: string;
    updatedAt: string;

    permissions: {
        showScopeItems: boolean;
        showRequests: boolean;
        showChangeOrders: boolean;
    };
}


export interface RevokeShareLinkParams {
    projectId: string;
    id: string;
}

export interface CreateShareLinkOutput {
    id: string;
    url: string;
    expiresAt: Date | null;
    showScopeItems: boolean;
    showRequests: boolean;
    showChangeOrders: boolean;
    createdAt: Date;
}

// Public share response shape returned by GET /share/:token
// Contains a subset of project data safe for client viewing
export interface ShareLinkDetail {
    link: ShareLink;
    project: {
        id: string;
        name: string;
        description: string | null;
        status: ProjectStatus;
        client?: {
            name: string;
            company?: string | null;
        } | null;
        createdAt: string;
        updatedAt: string;
    };
    scopeItems?: Array<{
        id: string;
        name: string;
        description: string;
        status: ScopeItemStatus;
        createdAt?: string | null;
    }>;
    requests?: Array<{
        id: string;
        description: string;
        status: RequestStatus;
        createdAt?: string | null;
        changeOrder?: {
            id: string | null;
            status: ChangeOrderStatus | null;
        } | null;
    }>;
    changeOrders?: Array<{
        id: string;
        priceUsd: string;
        extraDays?: number | null;
        status: ChangeOrderStatus;
        request?: {
            id: string;
            description: string;
        } | null;
    }>;
}