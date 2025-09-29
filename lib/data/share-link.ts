import { handleQueryOrThrow } from "../http/query";
import { GetShareLinksParams, ShareLink } from "../types/shareLink.types";
export const getShareLinks = async (params: GetShareLinksParams) => {
    return await handleQueryOrThrow<ShareLink[]>(`/projects/${params.projectId}/share-link`, {
        tags: ["share-link", `share-link-${params.projectId}`],
        revalidate: 300,
        cache: "force-cache"
    })
}
