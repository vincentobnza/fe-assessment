import { useState, memo } from "react"
import { Link } from "react-router-dom"
import type { Game } from "../types"
import { cn } from "@/lib/utils"


function HotBadge() {
    return (
        <img
            src={"https://www.fun88.mx/assets/hot_badge-7eed8532.webp"}
            alt="Popular"
            className="absolute top-1 right-1 md:top-2 md:right-2 z-10 size-10 object-contain drop-shadow-sm xl:size-16"
        />
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

export default memo(GameCard)