import { useMemo, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useGames } from "../hooks/useGames"
import { useDebounce } from "@/hooks/useDebounce"
import { cn } from "@/lib/utils"
import type { Game } from "../types"

const HOT_BADGE_URL = "https://www.fun88.mx/assets/hot_badge-7eed8532.webp"

function HotBadge() {
    return (
        <img
            src={HOT_BADGE_URL}
            alt="Popular"
            className="absolute top-2 right-2 z-10 size-12 object-contain drop-shadow-sm xl:size-16"
        />
    )
}

const GRID_COLS = "grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"

const SEARCH_DEBOUNCE_MS = 300

export default function GamesGrid() {
    const [searchParams] = useSearchParams()
    const categorySlug = searchParams.get("category") ?? "inicio"
    const searchQuery = searchParams.get("search") ?? ""
    const debouncedSearch = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS)
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
                    <div className={cn("grid gap-3 sm:gap-4", GRID_COLS)}>
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
                <div className={cn("grid gap-3 sm:gap-4", GRID_COLS)}>
                    {filteredGames.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function GameCard({ game }: { game: Game }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link
            to={`/games/${game.slug}`}
            className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors hover:border-primary/30 hover:shadow-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-square w-full overflow-hidden bg-muted/30 relative rounded-t-xl" title={game.name}>
                <img
                    src={game.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                />
                {game.category === "popular" && <HotBadge />}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-200",
                        isHovered ? "opacity-100" : "opacity-0",
                    )}
                >
                    <img
                        src="https://www.fun88.mx/assets/play_game-4608cc12.webp"
                        alt=""
                        className="size-12 xl:size-14"
                    />
                </div>
            </div>

        </Link>
    )
}
