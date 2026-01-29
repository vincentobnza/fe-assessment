import { FeaturedCarousel, FeaturedProviders } from "@/features/featured";
import { CategoriesBar } from "@/features/categories";
import { GamesGrid } from "@/features/games";

export default function Home() {
    return (
        <div className="w-full">
            <FeaturedCarousel />
            <FeaturedProviders />
            <CategoriesBar />
            <GamesGrid />
        </div>
    );
}
