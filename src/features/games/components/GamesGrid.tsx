import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { useGames } from "../hooks/useGames"
import { useDebounce } from "@/hooks/useDebounce"
import { cn } from "@/lib/utils"
import GameCard from "./GameCard"



export default function GamesGrid() {
    const [searchParams] = useSearchParams()
    const categorySlug = searchParams.get("category") ?? "inicio"
    const searchQuery = searchParams.get("search") ?? ""
    const debouncedSearch = useDebounce(searchQuery, 300)
    const { data: games, isLoading, isError } = useGames()

    const filteredGames = useMemo(() => {
        if (!games) return []
        let list = games
        if (categorySlug && categorySlug !== "inicio") {
            list = list.filter((game) => game.category === categorySlug)
        }
        const term = debouncedSearch.trim().toLowerCase()
        if (term) {
            list = list.filter(
                (game) =>
                    game.name.toLowerCase().includes(term) ||
                    game.provider.toLowerCase().includes(term)
            )
        }
        return list
    }, [games, categorySlug, debouncedSearch])

    if (isLoading) {
        return (
            <section className="w-full px-4 py-8 md:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="h-8 w-32 animate-pulse rounded bg-muted mb-6" />
                    <div className={cn(
                        "grid gap-3 sm:gap-4",
                        "grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
                    )}>
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-xl overflow-hidden bg-muted animate-pulse aspect-square"
                            />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (isError || !games) {
        return null
    }

    if (filteredGames.length === 0) {
        const hasSearch = debouncedSearch.trim().length > 0
        return (
            <section className="w-full px-2 py-8 md:px-6 lg:px-8 min-h-80 flex items-center justify-center flex-col">
                <img src={"https://cdn-icons-png.flaticon.com/128/17768/17768790.png"} alt="" className="size-20 mx-auto mb-4" />
                <div className="container mx-auto text-center text-muted-foreground">
                    {hasSearch
                        ? "No games match your search. Try a different term or category."
                        : "No games in this category yet."}
                </div>
            </section>
        )
    }

    return (
        <section className="w-full px-2 py-2 md:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className={cn(
                    "grid gap-3 sm:gap-4",
                    "grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6")}>
                    {filteredGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </section>
    )
}


