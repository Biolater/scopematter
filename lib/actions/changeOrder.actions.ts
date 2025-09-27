'use server';

import { handleAction } from "../http/action";
import { approveChangeOrderSchema, ApproveChangeOrderSchemaType, createChangeOrderSchema, type CreateChangeOrderSchemaType, rejectChangeOrderSchema, RejectChangeOrderSchemaType, deleteChangeOrderSchema, DeleteChangeOrderSchemaType, EditChangeOrderSchemaType, editChangeOrderSchema } from "../validation/changeOrder.schema";
import { ApproveChangeOrderInput, ApproveChangeOrderOutput, DeleteChangeOrderInput, DeleteChangeOrderOutput, EditChangeOrderInput, EditChangeOrderOutput, RejectChangeOrderInput, RejectChangeOrderOutput, type CreateChangeOrderInput, type CreateChangeOrderOutput } from "../types/changeOrder.types";

export const createChangeOrderAction = async (payload: CreateChangeOrderInput) => {
    return await handleAction<CreateChangeOrderSchemaType, CreateChangeOrderOutput>({
        schema: createChangeOrderSchema,
        path: `/projects/${payload.projectId}/change-orders`,
        method: "POST",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const approveChangeOrderAction = async (payload: ApproveChangeOrderInput) => {
    return await handleAction<ApproveChangeOrderSchemaType, ApproveChangeOrderOutput>({
        schema: approveChangeOrderSchema,
        path: `/projects/${payload.projectId}/change-orders/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const rejectChangeOrderAction = async (payload: RejectChangeOrderInput) => {
    return await handleAction<RejectChangeOrderSchemaType, RejectChangeOrderOutput>({
        schema: rejectChangeOrderSchema,
        path: `/projects/${payload.projectId}/change-orders/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const deleteChangeOrderAction = async (payload: DeleteChangeOrderInput) => {
    return await handleAction<DeleteChangeOrderSchemaType, DeleteChangeOrderOutput>({
        path: `/projects/${payload.projectId}/change-orders/${payload.data.id}`,
        method: "DELETE",
        revalidateTags: ["projects", "dashboard"],
    });
}

export const editChangeOrderAction = async (payload: EditChangeOrderInput) => {
    return await handleAction<EditChangeOrderSchemaType, EditChangeOrderOutput>({
        schema: editChangeOrderSchema,
        path: `/projects/${payload.projectId}/change-orders/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    });
}