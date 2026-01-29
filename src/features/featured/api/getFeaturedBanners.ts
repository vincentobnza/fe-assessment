import { httpClient } from "@/utils/httpClient"
import type { FeaturedBanner, FeaturedApiResponse } from "../types"

const FEATURED_ENDPOINT = "/mock/api.mock.json"

export const featuredKeys = {
    all: ["featured"] as const,
    banners: () => [...featuredKeys.all, "banners"] as const,
}
export async function getFeaturedBanners(): Promise<FeaturedBanner[]> {
    const { data } = await httpClient.get<FeaturedApiResponse>(FEATURED_ENDPOINT)
    if (!data?.data?.featured) {
        return []
    }
    return data.data.featured
}
