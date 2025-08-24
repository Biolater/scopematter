
"use server";

import { api } from "./api";

export type QueryResult<T> =
    | { ok: true; data: T }
    | { ok: false; message: string };

type QueryOptions = {
    revalidate?: number;
    tags?: string[];
    cache?: RequestCache;
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
