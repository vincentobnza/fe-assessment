export type Game = {
    id: string
    image: string
    name: string
    category: string
    slug: string
    provider: string
    featured?: boolean
}

export type GamesApiResponse = {
    meta: { status: number; message: string }
    data: { games: Game[] }
}
