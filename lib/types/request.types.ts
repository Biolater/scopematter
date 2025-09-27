import { EditRequestSchemaType, MarkRequestInScopeSchemaType, MarkRequestOutOfScopeSchemaType, MarkRequestPendingSchemaType } from "../validation/request.schema";

export type MarkRequestInScopeInput = {
    projectId: string;
    id: string;
    data: MarkRequestInScopeSchemaType;
}

export type MarkRequestOutOfScopeInput = {
    projectId: string;
    id: string;
    data: MarkRequestOutOfScopeSchemaType;
}

export type MarkRequestPendingInput = {
    projectId: string;
    id: string;
    data: MarkRequestPendingSchemaType;
}

export type EditRequestInput = {
    projectId: string;
    id: string;
    data: EditRequestSchemaType;
}
