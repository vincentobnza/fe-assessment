import { useQuery } from "@tanstack/react-query"
import { getFeaturedBanners, featuredKeys } from "../api/getFeaturedBanners"

const STALE_TIME_MS = 5 * 60 * 1000

export function useFeaturedBanners() {
    return useQuery({
        queryKey: featuredKeys.banners(),
        queryFn: getFeaturedBanners,
        staleTime: STALE_TIME_MS,
    })
}
