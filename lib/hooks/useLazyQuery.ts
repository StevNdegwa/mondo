import { useQuery, QueryFunctionContext, UseQueryResult, RefetchOptions, QueryObserverResult } from "react-query";

export function useLazyQuery<TData>(key: string | unknown[], fn: (context: QueryFunctionContext) => Promise<TData>, options = {}):
    [((options?: RefetchOptions | undefined) => Promise<QueryObserverResult<TData, unknown>>), UseQueryResult<TData, unknown>] {

    const query = useQuery(key, fn, {
        ...options,
        enabled: false
    })


    return [
        query.refetch,
        query
    ]
}