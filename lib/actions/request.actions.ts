"use server";

import { handleAction } from "../http/action";
import { createRequestSchema, CreateRequestSchemaType, deleteRequestSchema, DeleteRequestSchemaType, markRequestInScopeSchema, MarkRequestInScopeSchemaType, markRequestOutOfScopeSchema, MarkRequestOutOfScopeSchemaType, markRequestPendingSchema, MarkRequestPendingSchemaType } from "../validation/request.schema";
import { ProjectRequest } from "../types/project.types";
import { MarkRequestInScopeInput, MarkRequestOutOfScopeInput, MarkRequestPendingInput } from "../types/request.types";

export const createRequestAction = async (payload: {
    projectId: string;
    data: CreateRequestSchemaType;
}) => {
    return await handleAction<CreateRequestSchemaType, ProjectRequest>({
        schema: createRequestSchema,
        path: `/projects/${payload.projectId}/requests`,
        method: "POST",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const deleteRequestAction = async (payload: {
    projectId: string;
    data: DeleteRequestSchemaType;
}) => {
    return await handleAction<DeleteRequestSchemaType, void>({
        schema: deleteRequestSchema,
        path: `/projects/${payload.projectId}/requests/${payload.data.id}`,
        method: "DELETE",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const markRequestInScopeAction = async (payload: MarkRequestInScopeInput) => {
    return await handleAction<MarkRequestInScopeSchemaType, void>({
        schema: markRequestInScopeSchema,
        path: `/projects/${payload.projectId}/requests/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const markRequestOutOfScopeAction = async (payload: MarkRequestOutOfScopeInput) => {
    return await handleAction<MarkRequestOutOfScopeSchemaType, void>({
        schema: markRequestOutOfScopeSchema,
        path: `/projects/${payload.projectId}/requests/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const markRequestPendingAction = async (payload: MarkRequestPendingInput) => {
    return await handleAction<MarkRequestPendingSchemaType, void>({
        schema: markRequestPendingSchema,
        path: `/projects/${payload.projectId}/requests/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}