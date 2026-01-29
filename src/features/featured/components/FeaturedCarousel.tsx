import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import { useFeaturedBanners } from "../hooks/useFeaturedBanners"

export default function FeaturedCarousel() {
    const { data, isLoading, isError } = useFeaturedBanners()
    if (isLoading) {
        return (
            <section className="w-full">
                <div className="container mx-auto">
                    <div className="h-40 md:h-60 lg:h-70 w-full animate-pulse rounded-2xl bg-muted" />
                </div>
            </section>
        )
    }
    if (isError || !data || data.length === 0) {
        return null
    }
    return (
        <section className="mt-2 md:mt-4 lg:mt-6 w-full py-8 p-2 md:p-0">
            <div className="container mx-auto">
                <Carousel className="w-full">
                    <CarouselContent>
                        {data.map((banner) => (
                            <CarouselItem key={banner.id}>
                                <div className="relative w-full rounded-2xl overflow-hidden">
                                    <img
                                        src={banner.image}
                                        alt=""
                                        className="h-40 md:h-60 lg:h-70 w-full rounded-none object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    )
}
