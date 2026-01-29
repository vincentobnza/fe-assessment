import { useQuery } from "@tanstack/react-query"
import { getFeaturedProviders, featuredProvidersKeys } from "../api/getFeaturedProviders"

const STALE_TIME_MS = 5 * 60 * 1000

export function useFeaturedProviders() {
    return useQuery({
        queryKey: featuredProvidersKeys.list(),
        queryFn: getFeaturedProviders,
        staleTime: STALE_TIME_MS,
    })
}
