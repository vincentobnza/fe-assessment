import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Search, ChevronRight } from "lucide-react"
import { useCategories } from "../hooks/useCategories"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { GameCategory } from "../types"
import { CategoryModal } from "@/features/featured"

function CategoryBadgePill({ badge, gamesCount }: { badge?: GameCategory["badge"]; gamesCount?: number }) {
    if (gamesCount != null && gamesCount > 0) {
        return (
            <span className="absolute -top-1.5 -right-2 min-w-[1.25rem] rounded bg-primary px-1 text-xs font-medium text-primary-foreground">
                {gamesCount?.toLocaleString()}
            </span>
        )
    }
    if (badge === "hot") {
        return (
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center gap-0.5 rounded bg-amber-100 px-1 text-[9px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                HOT!
            </span>
        )
    }
    if (badge === "new") {
        return (
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 rounded bg-blue-100 px-1 text-[9px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                NEW
            </span>
        )
    }
    return null
}

export default function CategoriesBar() {
    const [searchParams, setSearchParams] = useSearchParams()
    const categoryParam = searchParams.get("category") ?? "inicio"
    const searchQuery = searchParams.get("search") ?? ""
    const { data: categories, isLoading, isError } = useCategories()
    const [activeSlug, setActiveSlug] = useState<string>(categoryParam)
    const [filterModalOpen, setFilterModalOpen] = useState(false)

    const handleSearchChange = (query: string) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev)
                if (query.trim()) next.set("search", query.trim())
                else next.delete("search")
                return next
            },
            { replace: true }
        )
    }

    useEffect(() => {
        setActiveSlug(categoryParam)
    }, [categoryParam])

    if (isLoading) {
        return (
            <section className="w-full border-b border-border bg-card">
                <div className="container mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-64 animate-pulse rounded-lg bg-muted" />
                        <div className="h-10 flex-1 max-w-sm animate-pulse rounded-lg bg-muted" />
                        <div className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
                    </div>
                </div>
            </section>
        )
    }

    if (isError || !categories || categories.length === 0) {
        return null
    }

    return (
        <section className="w-full border-b border-border bg-card p-2 md:py-4">
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-4 lg:gap-6">
                    {/* Categories strip: horizontal scroll */}
                    <div className="flex items-end gap-1 overflow-x-auto py-3 md:py-2 md:flex-1 md:min-w-0">
                        <div className="flex items-end gap-0.5 min-w-0">
                            {categories.map((category) => {
                                const isActive = activeSlug === category.slug
                                return (
                                    <Link
                                        key={category.id}
                                        to={
                                            searchQuery
                                                ? `/?category=${category.slug}&search=${encodeURIComponent(searchQuery)}`
                                                : `/?category=${category.slug}`
                                        }
                                        onClick={() => setActiveSlug(category.slug)}
                                        className={cn(
                                            "relative flex shrink-0 flex-col items-center gap-1 rounded-t-lg px-3 pt-2 pb-2.5  border-b-2 border-transparent hover:scale-105 transition-transform duration-500",
                                            "hover:bg-muted/50",
                                            isActive
                                                ? "bg-primary/5 text-primary border-primary"
                                                : "text-muted-foreground hover:text-foreground",
                                        )}
                                    >
                                        <CategoryBadgePill badge={category.badge} gamesCount={category.gamesCount} />
                                        <div className="relative flex h-8 w-8 items-center justify-center">
                                            <img
                                                src={category.image}
                                                alt=""
                                                className={cn(
                                                    "size-6 md:size-8 lg:size-10 xl:size-12 object-contain",
                                                    isActive && "brightness-90",
                                                )}
                                            />
                                        </div>
                                        <span
                                            className={cn(
                                                "ml-1 mt-1 text-xs md:text-sm font-medium uppercase tracking-tight",
                                                isActive && "font-semibold",
                                            )}
                                        >
                                            {category.name}
                                        </span>
                                    </Link>
                                )
                            })}
                            {/* More indicator */}
                            <div className="flex shrink-0 items-center pl-2 text-muted-foreground">
                                <ChevronRight className="h-5 w-5" aria-hidden />
                            </div>
                        </div>
                    </div>

                    {/* Search + Filter */}
                    <div className="flex flex-1 items-center gap-2 md:shrink-0 md:max-w-xs lg:max-w-sm">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Encuentra tu juego"
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full rounded-lg border border-input bg-background py-3.5 pl-9 pr-3 text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                aria-label="Buscar juego"
                            />
                        </div>
                        <Button
                            size="default"
                            className="h-12 border-0"
                            aria-label="Filtrar"
                            onClick={() => setFilterModalOpen(true)}
                        >
                            <img src="data:image/webp;base64,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" alt="filter-icon" className="w-8" />
                        </Button>
                    </div>
                </div>
            </div>
            <CategoryModal
                open={filterModalOpen}
                onOpenChange={setFilterModalOpen}
            />
        </section>
    )
}
