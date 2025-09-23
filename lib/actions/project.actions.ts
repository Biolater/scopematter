"use server";

import { handleAction } from "../http/action";
import { CreateProjectOutput, UpdateProjectOutput } from "../types/project.types";
import { createProjectSchema, CreateProjectSchemaType, deleteProjectSchema, DeleteProjectSchemaType, updateProjectSchema, UpdateProjectSchemaType } from "../validation/project.schema";

export const deleteProjectAction = async (payload: DeleteProjectSchemaType) => {
    return handleAction<DeleteProjectSchemaType, void>({
        schema: deleteProjectSchema,
        path: `/projects/${payload.id}`,
        method: "DELETE",
        body: payload,
        revalidateTags: ["projects", "dashboard"],
    });
}

export const createProjectAction = async (payload: CreateProjectSchemaType) => {
    return handleAction<CreateProjectSchemaType, CreateProjectOutput>({
        schema: createProjectSchema,
        path: "/projects",
        method: "POST",
        body: payload,
        revalidateTags: ["projects", "dashboard"],
    })
}

export const editProjectAction = async (payload: { id: string, data: UpdateProjectSchemaType }) => {
    return handleAction<UpdateProjectSchemaType, UpdateProjectOutput>({
        schema: updateProjectSchema,
        path: `/projects/${payload.id}`,
        method: "PUT",
        body: payload.data,
        revalidateTags: ["projects", "dashboard"],
    })
}