import { handleAction } from "../http/action";
import { RevokeShareLinkParams } from "../types/shareLink.types";

export const revokeShareLinkAction = async (payload: RevokeShareLinkParams) => {
    return await handleAction<RevokeShareLinkParams, void>({
        path: `/projects/${payload.projectId}/share-links/${payload.id}`,
        method: "DELETE",
        body: payload,
        revalidateTags: [`share-link-${payload.projectId}`],
    });
}