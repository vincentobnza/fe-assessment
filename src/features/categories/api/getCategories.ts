import { httpClient } from "@/utils/httpClient"
import type { GameCategory, CategoriesApiResponse } from "../types"

const ENDPOINT = "/mock/api.mock.json"

export const categoriesKeys = {
    all: ["categories"] as const,
    list: () => [...categoriesKeys.all, "list"] as const,
}

export async function getCategories(): Promise<GameCategory[]> {
    const { data } = await httpClient.get<CategoriesApiResponse>(ENDPOINT)
    if (!data?.data?.categories) return []
    return data.data.categories
}
