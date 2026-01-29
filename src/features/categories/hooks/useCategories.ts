import { useQuery } from "@tanstack/react-query"
import { getCategories, categoriesKeys } from "../api/getCategories"

const STALE_TIME_MS = 5 * 60 * 1000

export function useCategories() {
    return useQuery({
        queryKey: categoriesKeys.list(),
        queryFn: getCategories,
        staleTime: STALE_TIME_MS,
    })
}
