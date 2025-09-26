"use server";

import { revalidateTag } from "next/cache";
import { handleAction } from "@/lib/http/action";
import { createScopeItemSchema, deleteScopeItemSchema, DeleteScopeItemSchemaType, updateScopeItemSchema, UpdateScopeItemSchemaType, type CreateScopeItemSchemaType } from "@/lib/validation/scopeItem.schema";
import type { ScopeItem } from "@/lib/types/project.types";
import { UpdateScopeItemInputFE, UpdateScopeItemOutput } from "../types/scopeItem.types";

export const createScopeItemAction = async (payload: {
    projectId: string;
    data: CreateScopeItemSchemaType;
}) => {
    const { projectId, data } = payload;

    return await handleAction<CreateScopeItemSchemaType, ScopeItem>({
        schema: createScopeItemSchema,
        path: `/projects/${projectId}/scope-items`,
        method: "POST",
        body: data,
        revalidateTags: ["projects", "dashboard"],
    });

}

export const deleteScopeItemAction = async (payload: DeleteScopeItemSchemaType) => {
    return await handleAction<DeleteScopeItemSchemaType, void>({
        schema: deleteScopeItemSchema,
        path: `/projects/${payload.projectId}/scope-items/${payload.id}`,
        method: "DELETE",
        body: payload,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const updateScopeItemAction = async (payload: UpdateScopeItemInputFE) => {
    return await handleAction<UpdateScopeItemSchemaType, UpdateScopeItemOutput>({
        schema: updateScopeItemSchema,
        path: `/projects/${payload.projectId}/scope-items/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}