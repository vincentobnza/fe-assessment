import { Link } from "react-router-dom"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useFeaturedProviders } from "../hooks/useFeaturedProviders"
import { useTheme } from "@/hooks/useTheme"
import { getResolvedTheme, getProviderImageUrl } from "../helpers/getProviderImage"
import { cn } from "@/lib/utils"

type CategoryModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

const GRID_COLS = "grid-cols-2"

export default function CategoryModal({ open, onOpenChange }: CategoryModalProps) {
    const { data: providers, isLoading, isError } = useFeaturedProviders()
    const { theme } = useTheme()
    const resolvedTheme = getResolvedTheme(theme)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={cn(
                    "sm:max-w-lg h-[60vh]! overflow-y-auto p-0 border-0 scrollbar-hide"
                )}
            >
                <DialogHeader className="p-5 bg-primary text-white">
                    <DialogTitle className="text-base md:text-lg font-medium  tracking-tight">
                        Proveedores de juego
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 min-h-0 overflow-y-auto">
                    {isLoading && (
                        <div className={cn("grid gap-3", GRID_COLS)}>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-video rounded-xl bg-muted animate-pulse"
                                />
                            ))}
                        </div>
                    )}

                    {isError || !providers || providers.length === 0 ? (
                        !isLoading && (
                            <p className="text-sm text-muted-foreground py-8 text-center">
                                No hay proveedores disponibles.
                            </p>
                        )
                    ) : (
                        <div className={cn("grid gap-3 sm:gap-4 px-4", GRID_COLS)}>
                            {providers.map((provider) => (
                                <Link
                                    key={provider.id}
                                    to={`/providers/${provider.slug}`}
                                    onClick={() => onOpenChange(false)}
                                    className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-colors hover:border-border"
                                >
                                    <div className="w-full flex items-center justify-center bg-muted/30 p-2">
                                        <img
                                            src={getProviderImageUrl(provider, resolvedTheme)}
                                            alt=""
                                            className="max-h-full w-auto object-contain"
                                            loading="lazy"
                                        />
                                    </div>

                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
