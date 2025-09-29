export interface GetShareLinksParams {
    projectId: string;
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