import { useState } from "react"
import { Link } from "react-router-dom"
import { useGames } from "../hooks/useGames"
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

export default function GamesGrid() {
    const { data: games, isLoading, isError } = useGames()
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

    if (isError || !games || games.length === 0) {
        return null
    }

    return (
        <section className="w-full px-4 py-8 md:px-6 lg:px-8">
            <div className="container mx-auto">
                <div className={cn("grid gap-3 sm:gap-4", GRID_COLS)}>
                    {games.map((game) => (
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
