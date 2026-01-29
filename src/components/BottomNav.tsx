import { NavLink } from "react-router-dom"
import { BOTTOM_NAV_ITEMS } from "@/constants/bottom-nav-items"
import { cn } from "@/lib/utils"

export default function BottomNav() {
    return (
        <nav
            className={cn(
                "fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card",
                "md:hidden",
                "pb-[env(safe-area-inset-bottom)]",
            )}
        >
            <div className="flex items-center justify-around h-16">
                {BOTTOM_NAV_ITEMS.map((item) => {
                    const isExpand = item.id === "expandir"
                    if (isExpand) {
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    if (!document.fullscreenElement) {
                                        document.documentElement.requestFullscreen?.()
                                    } else {
                                        document.exitFullscreen?.()
                                    }
                                }}
                                className="flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label={item.label}
                            >
                                <item.icon className="size-5" />
                                <span className="text-[10px] font-medium uppercase tracking-tight truncate max-w-full">
                                    {item.label}
                                </span>
                            </button>
                        )
                    }

                    return (
                        <NavLink
                            key={item.id}
                            to={item.href}
                            className={({ isActive: active }) =>
                                cn(
                                    "flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 transition-colors",
                                    active
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground",
                                )
                            }
                            end={item.href === "/"}
                        >
                            <item.icon className="h-6 w-6 shrink-0" />
                            <span className="text-[10px] font-medium uppercase tracking-wide truncate max-w-full">
                                {item.label}
                            </span>
                        </NavLink>
                    )
                })}
            </div>
        </nav>
    )
}
