import { httpClient } from "@/utils/httpClient"
import type { Game, GamesApiResponse } from "../types"

const ENDPOINT = "/mock/api.mock.json"

export const gamesKeys = {
    all: ["games"] as const,
    list: () => [...gamesKeys.all, "list"] as const,
    listByCategory: (category: string) => [...gamesKeys.all, "list", category] as const,
}

export async function getGames(): Promise<Game[]> {
    const { data } = await httpClient.get<GamesApiResponse>(ENDPOINT)
    if (!data?.data?.games) return []
    return data.data.games
}
