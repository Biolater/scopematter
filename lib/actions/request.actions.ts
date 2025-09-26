"use server";

import { handleAction } from "../http/action";
import { createRequestSchema, CreateRequestSchemaType, deleteRequestSchema, DeleteRequestSchemaType } from "../validation/request.schema";
import { ProjectRequest } from "../types/project.types";

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
