import type { ChangeOrder } from "./project.types";
import { ApproveChangeOrderSchemaType, CreateChangeOrderSchemaType, DeleteChangeOrderSchemaType, EditChangeOrderSchemaType, RejectChangeOrderSchemaType } from "../validation/changeOrder.schema";

export interface CreateChangeOrderInput {
    projectId: string;
    data: CreateChangeOrderSchemaType;
}
export interface ApproveChangeOrderInput {
    projectId: string;
    id: string;
    data: ApproveChangeOrderSchemaType;
}

export interface RejectChangeOrderInput {
    projectId: string;
    id: string;
    data: RejectChangeOrderSchemaType;
}

export interface DeleteChangeOrderInput {
    projectId: string;
    data: DeleteChangeOrderSchemaType;
}

export interface EditChangeOrderInput {
    projectId: string;
    id: string;
    data: EditChangeOrderSchemaType;
}

export type CreateChangeOrderOutput = ChangeOrder;
export type ApproveChangeOrderOutput = ChangeOrder & {
    request: {
        id: string;
        description: string;
        status: string;
    };
};
export type RejectChangeOrderOutput = ChangeOrder & {
    request: {
        id: string;
        description: string;
        status: string;
    };
};

export type DeleteChangeOrderOutput = ChangeOrder;
export type EditChangeOrderOutput = ChangeOrder;