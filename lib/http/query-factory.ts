"use client";

import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from "@tanstack/react-query";

// Primitive parts only for stable keys
type KeyPart = string | number | boolean | null | undefined;

type Defaults =
  | {
      staleTime?: number;
      gcTime?: number;
      retry?: number | false;
      enabled?: boolean;
    }
  | ((params: any) => {
      staleTime?: number;
      gcTime?: number;
      retry?: number | false;
      enabled?: boolean;
    });

type CreateQueryFactoryConfig<TParams, TData> = {
  /** First segment of the key, used for broad invalidation */
  resource: string;
  /** Build key parts from params (excluding resource) */
  getKey: (p: TParams) => KeyPart[];
  /** The fetcher */
  queryFn: (p: TParams) => Promise<TData>;
  /** Static or param-derived defaults */
  defaults?: Defaults;
};

export function createQueryFactory<TParams extends Record<string, any>, TData>(
  config: CreateQueryFactoryConfig<TParams, TData>
) {
  const { resource, getKey, queryFn, defaults } = config;

  const keyOf = (params: TParams): QueryKey => [resource, ...getKey(params)];

  function resolvedDefaults(p: TParams) {
    const base =
      typeof defaults === "function" ? defaults(p) : (defaults ?? {});
    return {
      staleTime: base.staleTime ?? 5 * 60 * 1000,
      gcTime: base.gcTime ?? 5 * 60 * 1000,
      retry: base.retry ?? 1,
      enabled: base.enabled ?? true,
    };
  }

  function use(
    params: TParams,
    options?: Omit<UseQueryOptions<TData, Error, TData, QueryKey>, "queryKey" | "queryFn">
  ): UseQueryResult<TData, Error> {
    const d = resolvedDefaults(params);
    return useQuery<TData, Error>({
      queryKey: keyOf(params),
      queryFn: () => queryFn(params),
      staleTime: d.staleTime,
      gcTime: d.gcTime,
      retry: d.retry,
      enabled: d.enabled,
      ...options,
    });
  }

  function useInvalidate() {
    const qc = useQueryClient();
    return {
      /** Invalidate all queries for this resource */
      all: () => qc.invalidateQueries({ queryKey: [resource] }),
      /** Invalidate a specific paramized query (exact match) */
      params: (params: TParams) =>
        qc.invalidateQueries({ queryKey: keyOf(params), exact: true }),
      /** Expose key builder if needed elsewhere */
      keyOf,
      /** Expose client for advanced cases */
      client: qc,
    };
  }

  return { resource, keyOf, use, useInvalidate };
}
