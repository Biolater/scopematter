import { handleQueryOrThrow } from "../http/query";
import { GetShareLinksParams, GetShareLinkParams, ShareLink } from "../types/shareLink.types";

export const getShareLinks = async (params: GetShareLinksParams) => {
    return await handleQueryOrThrow<ShareLink[]>(`/projects/${params.projectId}/share-link`)
}

export const getShareLink = async (params: GetShareLinkParams) => {
    return await handleQueryOrThrow<ShareLink>(`/share/${params.token}`, {
        cache: "no-store",
       isPublicApi: true
    })
}