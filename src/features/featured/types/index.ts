export type FeaturedBanner = {
    id: string
    image: string
}

export type FeaturedProvider = {
    id: string
    name: string
    slug: string
    image: [string, string]
    gamesCount?: number
}

export type FeaturedApiResponse = {
    meta: {
        status: number
        message: string
    }
    data: {
        featured: FeaturedBanner[]
        featuredProviders?: FeaturedProvider[]
    }
}
