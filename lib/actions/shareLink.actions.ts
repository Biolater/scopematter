'use server';


import { handleAction } from "../http/action";
import { CreateShareLinkOutput, RevokeShareLinkParams } from "../types/shareLink.types";
import { CreateShareLinkSchemaType, createShareLinkSchema } from "../validation/shareLink.schema";

export const revokeShareLinkAction = async (payload: RevokeShareLinkParams) => {
    return await handleAction<RevokeShareLinkParams, void>({
        path: `/projects/${payload.projectId}/share-link/${payload.id}`,
        method: "DELETE",
        body: payload,
    });
}

export const createShareLinkAction = async (payload: CreateShareLinkSchemaType) => {
    return await handleAction<CreateShareLinkSchemaType, CreateShareLinkOutput>({
        schema: createShareLinkSchema,
        path: `/projects/${payload.projectId}/share-link`,
        method: "POST",
        body: payload,
    });
}