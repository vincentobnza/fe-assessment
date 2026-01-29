export type CategoryBadge = "hot" | "new"

export type GameCategory = {
    id: string
    name: string
    slug: string
    image: string
    featured?: boolean
    gamesCount?: number
    badge?: CategoryBadge
}

export type CategoriesApiResponse = {
    meta: { status: number; message: string }
    data: { categories: GameCategory[] }
}
