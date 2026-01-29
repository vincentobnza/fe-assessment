import { NAVBAR_ITEMS } from "@/constants/navbar-items";
import Logo from '@/assets/fun_88_logo.webp'
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
    return <nav className="px-5 sm:px-16 w-full h-20 flex items-center justify-center border-b border-border sticky top-0 z-50 bg-background">
        <div className="container mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <HiOutlineMenuAlt2 className="w-6 h-6 sm:hidden text-primary" />
                    <img src={Logo} alt="logo" className="w-16 sm:w-24" />
                </div>
                <div className="hidden sm:flex items-center gap-4">
                    {NAVBAR_ITEMS.map((item) => (
                        <Link key={item.href} to={item.href} className="text-sm sm:text-base uppercase tracking-tight text-primary font-medium">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <Button>
                        ACCESSO
                    </Button>
                    <Button variant="secondary">
                        REGISTRATE
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    </nav>;
}
