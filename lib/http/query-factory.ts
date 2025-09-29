import {
    useQuery,
    useQueryClient,
    UseQueryOptions,
    UseQueryResult,
    QueryKey,
} from "@tanstack/react-query";

/**
 * Creates a query factory for a resource.
 *
 * @param keyBuilder - builds the queryKey from params
 * @param fetchFn    - the server function that performs the request
 */
export function createQueryFactory<TData, TParams extends any[]>(
    keyBuilder: (...params: TParams) => QueryKey,
    fetchFn: (...params: TParams) => Promise<TData>
) {
    function use(
        params: [...TParams],
        options?: Omit<
            UseQueryOptions<TData, Error, TData, QueryKey>,
            "queryKey" | "queryFn"
        >
    ): UseQueryResult<TData, Error> {
        return useQuery<TData, Error>({
            queryKey: keyBuilder(...params),
            queryFn: () => fetchFn(...params),
            ...options,
        });
    }

    function useInvalidate() {
        const qc = useQueryClient();
        return {
            all: async () => {
                await qc.invalidateQueries({ queryKey: keyBuilder(...([] as any)) });
            },
            one: async (...params: TParams) => {
                await qc.invalidateQueries({ queryKey: keyBuilder(...params) });
            },
        };
    }

    return { key: keyBuilder, use, useInvalidate };
}
