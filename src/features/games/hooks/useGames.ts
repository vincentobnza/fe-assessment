import { useQuery } from "@tanstack/react-query"
import { getGames, gamesKeys } from "../api/getGames"

const STALE_TIME_MS = 5 * 60 * 1000

export function useGames() {
    return useQuery({
        queryKey: gamesKeys.list(),
        queryFn: getGames,
        staleTime: STALE_TIME_MS,
    })
}
