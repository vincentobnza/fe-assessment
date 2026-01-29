import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { FOOTER_SECTIONS } from "@/constants/footer-items"


export default function Footer() {
    return (
        <footer className="w-full border-t border-border bg-card pb-10">
            <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
                <div
                    className={cn(
                        "grid gap-8",
                        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
                    )}
                >
                    {FOOTER_SECTIONS.map((section) => (
                        <div key={section.title} className="min-w-0">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            to={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>





            </div>
        </footer>
    )
}
