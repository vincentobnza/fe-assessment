import { httpClient } from "@/utils/httpClient"
import type { FeaturedProvider, FeaturedApiResponse } from "../types"

const FEATURED_ENDPOINT = "/mock/api.mock.json"

export const featuredProvidersKeys = {
    all: ["featured-providers"] as const,
    list: () => [...featuredProvidersKeys.all, "list"] as const,
}

export async function getFeaturedProviders(): Promise<FeaturedProvider[]> {
    const { data } = await httpClient.get<FeaturedApiResponse>(FEATURED_ENDPOINT)

    if (!data?.data?.featuredProviders) {
        return []
    }

    return data.data.featuredProviders
}
