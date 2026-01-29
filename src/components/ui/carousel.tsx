import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import { HiArrowLeft, HiArrowRight } from "react-icons/hi"

type CarouselApi = UseEmblaCarouselType[1]

type CarouselProps = {
    opts?: Parameters<typeof useEmblaCarousel>[0]
    plugins?: Parameters<typeof useEmblaCarousel>[1]
    className?: string
} & React.HTMLAttributes<HTMLDivElement>

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0]
    api: CarouselApi
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
    const context = React.useContext(CarouselContext)

    if (!context) {
        throw new Error("useCarousel must be used within a <Carousel />")
    }

    return context
}

export function Carousel({
    className,
    opts,
    plugins,
    children,
    ...props
}: CarouselProps) {
    const [carouselRef, api] = useEmblaCarousel(
        {
            loop: true,
            ...opts,
        },
        plugins ?? [Autoplay({ delay: 4000 })],
    )

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api,
                opts,
                plugins,
                className,
                ...props,
            }}
        >
            <div className={cn("relative w-full", className)} {...props}>
                {children}
            </div>
        </CarouselContext.Provider>
    )
}

export const CarouselContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(function CarouselContent({ className, ...props }, ref) {
    const { carouselRef } = useCarousel()

    return (
        <div ref={carouselRef} className="overflow-hidden">
            <div
                ref={ref}
                className={cn("flex touch-pan-y touch-pinch-zoom -ml-2", className)}
                {...props}
            />
        </div>
    )
})

export const CarouselItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(function CarouselItem({ className, ...props }, ref) {
    return (
        <div
            ref={ref}
            className={cn("min-w-0 shrink-0 grow-0 basis-full pl-2", className)}
            {...props}
        />
    )
})

export const CarouselPrevious = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(function CarouselPrevious({ className, ...props }, ref) {
    const { api } = useCarousel()

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => api?.scrollPrev()}
            className={cn(
                "absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow hover:bg-background",
                className,
            )}
            {...props}
        >
            <span className="sr-only">Previous slide</span>
            <HiArrowLeft className="w-4 h-4" />
        </button>
    )
})

export const CarouselNext = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(function CarouselNext({ className, ...props }, ref) {
    const { api } = useCarousel()

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => api?.scrollNext()}
            className={cn(
                "absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/80 text-foreground shadow hover:bg-background",
                className,
            )}
            {...props}
        >
            <span className="sr-only">Next slide</span>
            <HiArrowRight className="w-4 h-4" />
        </button>
    )
})

