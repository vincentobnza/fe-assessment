

import { HiSun } from "react-icons/hi";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "./ui/button";
import { LuMoonStar } from "react-icons/lu";
import { cn } from "@/lib/utils";


export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    return <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={cn("hidden md:flex", className)}>
        {theme === "dark" ? <HiSun className="w-4 h-4" /> : <LuMoonStar className="w-4 h-4" />}
    </Button>;
}
