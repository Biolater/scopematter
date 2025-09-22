"use server";

import { handleAction } from "../http/action";
import { deleteProjectSchema, DeleteProjectSchemaType } from "../validation/project.schema";

export const deleteProjectAction = async (payload: DeleteProjectSchemaType) => {
    return handleAction<DeleteProjectSchemaType, void>({
        schema: deleteProjectSchema,
        path: `/projects/${payload.id}`,
        method: "DELETE",
        body: payload,
        revalidateTags: ["projects", "dashboard"],
    });
}