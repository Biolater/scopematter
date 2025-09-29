import { createQueryFactory } from "../../http/query-factory";
import { getShareLinks } from "../share-link";
import type { ShareLink } from "../../types/shareLink.types";

export const shareLinkQueries = createQueryFactory<ShareLink[], [string]>(
    (projectId) => ["projects", projectId, "share-links"],
    (projectId) => getShareLinks({ projectId })
);
