"use server";

import { revalidateTag } from "next/cache";
import { handleAction } from "@/lib/http/action";
import { createScopeItemSchema, deleteScopeItemSchema, DeleteScopeItemSchemaType, type CreateScopeItemSchemaType } from "@/lib/validation/scopeItem.schema";
import type { ScopeItem } from "@/lib/types/project.types";

export async function createScopeItemAction(payload: {
    projectId: string;
    data: CreateScopeItemSchemaType;
}) {
    const { projectId, data } = payload;

    return await handleAction<CreateScopeItemSchemaType, ScopeItem>({
        schema: createScopeItemSchema,
        path: `/projects/${projectId}/scope-items`,
        method: "POST",
        body: data,
        revalidateTags: ["projects", "dashboard"],
    });

}

export async function deleteScopeItemAction(payload: DeleteScopeItemSchemaType) {
    return await handleAction<DeleteScopeItemSchemaType, void>({
        schema: deleteScopeItemSchema,
        path: `/projects/${payload.projectId}/scope-items/${payload.id}`,
        method: "DELETE",
        body: payload,
        revalidateTags: ["projects", "dashboard"],
    });
}   