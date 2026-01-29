import { Link } from "react-router-dom"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { useFeaturedProviders } from "../hooks/useFeaturedProviders"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/useTheme"
import { getResolvedTheme, getProviderImageUrl } from "../helpers/getProviderImage"
import { PiGameControllerDuotone } from "react-icons/pi"

export default function FeaturedProviders() {
    const { data: providers, isLoading, isError } = useFeaturedProviders()
    const { theme } = useTheme()
    const resolvedTheme = getResolvedTheme(theme)

    if (isLoading) {
        return (
            <section className="w-full px-4 py-8 md:px-6 lg:px-8">
                <div className="container mx-auto">
                    <div className="h-8 w-48 animate-pulse rounded bg-muted mb-6" />
                    <div className="flex gap-2 overflow-hidden">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="aspect-video w-[20%] shrink-0 animate-pulse rounded-xl bg-muted"
                            />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (isError || !providers || providers.length === 0) {
        return null
    }

    return (
        <section className="w-full px-4 py-8 md:px-6 lg:px-8">
            <div className="container mx-auto">
                <Carousel
                    opts={{
                        loop: true,
                        align: "start",
                        containScroll: "trimSnaps",
                        skipSnaps: true,
                        dragFree: true,

                    }}
                    plugins={[]}
                    className="w-full"
                >
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <h2 className="text-sm md:text-base lg:text-lg text-foreground tracking-tight">
                            Proveedores de juego
                        </h2>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button variant="outline" asChild>
                                <Link to="/providers">MÁS</Link>
                            </Button>
                            <CarouselPrevious
                                className="static translate-y-0 left-0 right-auto size-9 rounded-lg border border-input text-foreground"
                                aria-label="Anterior"
                            />
                            <CarouselNext
                                className="static translate-y-0 left-0 right-auto size-9 rounded-lg border border-input text-foreground"
                                aria-label="Siguiente"
                            />
                        </div>
                    </div>

                    <CarouselContent className="-ml-1 gap-3 sm:-ml-1 sm:gap-3 md:-ml-2 md:gap-4">
                        {providers.map((provider) => (
                            <CarouselItem
                                key={provider.id}
                                className={cn(
                                    "min-w-0 pl-0 pr-0",
                                    "basis-[48%] sm:basis-[33.333%] md:basis-[25%] lg:basis-[20%]",
                                )}
                            >
                                <Link
                                    to={`/providers/${provider.slug}`}
                                    className="group flex flex-col h-full rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-colors hover:shadow-md"
                                >
                                    <div className="w-full flex items-center justify-center bg-muted p-3 sm:p-2">
                                        <img
                                            src={getProviderImageUrl(provider, resolvedTheme)}
                                            alt=""
                                            className="max-w-full h-16 sm:h-20 object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-2 sm:p-3 text-center space-y-0.5">
                                        <h1 className="text-sm md:text-base tracking-tight font-medium text-foreground line-clamp-1">
                                            {provider.name}
                                        </h1>
                                        <div className="flex self-center justify-center items-center gap-1">
                                            <PiGameControllerDuotone className="size-3 md:size-4 text-muted-foreground" />
                                            <p className="text-xs md:text-sm tracking-tight text-muted-foreground">
                                                {provider.gamesCount ?? 0} Juegos
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
