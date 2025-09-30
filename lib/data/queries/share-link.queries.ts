import { createQueryFactory } from "../../http/query-factory";
import { getShareLinks } from "../share-link";
import type { ShareLink } from "../../types/shareLink.types";

type ShareLinkParams = { projectId: string };

export const shareLinkQueries = createQueryFactory<ShareLinkParams, ShareLink[]>({
    resource: "share-link",
    getKey: ({ projectId }) => [projectId],
    queryFn: ({ projectId }) => getShareLinks({ projectId }),
    defaults: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 5, retry: 1 },
});
