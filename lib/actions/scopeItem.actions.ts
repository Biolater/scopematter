"use server";

import { revalidateTag } from "next/cache";
import { handleAction } from "@/lib/http/action";
import { createScopeItemSchema, deleteScopeItemSchema, DeleteScopeItemSchemaType, updateScopeItemSchema, UpdateScopeItemSchemaType, type CreateScopeItemSchemaType } from "@/lib/validation/scopeItem.schema";
import type { ScopeItem } from "@/lib/types/project.types";
import { UpdateScopeItemInputFE, UpdateScopeItemOutput } from "../types/scopeItem.types";
import { env } from "@/config/env";
import { auth } from "@clerk/nextjs/server";

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


export async function fetchScopeItemPdf(path: string): Promise<Blob> {
   const { getToken } = await auth();
   const token = await getToken();
    const res = await fetch(`${env.API_URL}${path}`, {
        method: "GET",
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
                   "Accept": "application/pdf",
        },
        cache: "no-store",
    });

    if (!res.ok) throw new Error(`Failed to fetch PDF (${res.status})`);

    const arrayBuffer = await res.arrayBuffer();
    return new Blob([arrayBuffer], { type: "application/pdf" });
}