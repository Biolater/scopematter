
"use server";

import { api } from "./api";

export type QueryResult<T> =
    | { ok: true; data: T }
    | { ok: false; message: string };

type QueryOptions = {
    revalidate?: number;
    tags?: string[];
    cache?: RequestCache;
    isPublicApi?: boolean;
};

/**
 * Centralized GET wrapper.
 * - Wraps api<T>() in a safe {ok,data|message} union.
 * - Supports Next.js cache control via revalidate & tags.
 */
export async function handleQuery<T>(
    path: string,
    opts: QueryOptions = {}
): Promise<QueryResult<T>> {
    try {
        const data = await api<T>(path, {
            method: "GET",
            ...opts,
        } as any);
        return { ok: true, data };
    } catch (e: any) {
        return { ok: false, message: e.message ?? "Failed to fetch" };
    }
}

/**
 * Throwing variant for GET queries.
 * - Returns data directly on success
 * - Throws the original error (ApiException/Error) on failure
 */
export async function handleQueryOrThrow<T>(
    path: string,
    opts: QueryOptions = {}
): Promise<T> {
    // api<T> already throws ApiException on non-2xx or envelope error
    const data = await api<T>(path, {
        method: "GET",
        ...opts,
    } as any);
    return data;
}