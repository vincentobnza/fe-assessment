

import { HiSun } from "react-icons/hi";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "./ui/button";
import { LuMoonStar } from "react-icons/lu";


export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <HiSun className="w-4 h-4" /> : <LuMoonStar className="w-4 h-4" />}
    </Button>;
}
