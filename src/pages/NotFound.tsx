import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { GrHome } from "react-icons/gr";

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
            <p className="text-7xl font-bold text-primary md:text-8xl">404</p>
            <h1 className="mt-4 text-xl font-semibold text-foreground md:text-2xl">
                Page not found
            </h1>
            <p className="mt-6 max-w-md rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
                This site is for assessment purposes only. It is not a production application.
            </p>
            <Button asChild className="mt-8" size="lg">
                <Link to="/">
                    <GrHome className="mr-2 h-4 w-4" aria-hidden />
                    Back to home
                </Link>
            </Button>
        </div>
    )
}
