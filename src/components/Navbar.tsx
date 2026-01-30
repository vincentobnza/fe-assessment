import { useState } from "react";
import { NAVBAR_ITEMS } from "@/constants/navbar-items";
import Logo from '@/assets/fun_88_logo.webp'
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { HiOutlineMenuAlt2, HiOutlineX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="px-5 sm:px-16 w-full min-h-18 md:min-h-20 flex items-center justify-center border-b border-border sticky top-0 z-50 bg-background">
            <div className="container mx-auto w-full min-w-0">
                <div className="flex items-center justify-between gap-2 md:gap-4">
                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            className="lg:hidden p-2 -ml-2 rounded-md text-primary hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-expanded={mobileMenuOpen}
                            aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
                        >
                            {mobileMenuOpen ? (
                                <HiOutlineX className="w-6 h-6" />
                            ) : (
                                <HiOutlineMenuAlt2 className="w-6 h-6" />
                            )}
                        </button>
                        <img src={Logo} alt="logo" className="w-16 sm:w-24" />
                    </div>
                    <div className="hidden lg:flex items-center gap-3 md:gap-4 min-w-0 overflow-x-auto py-2">
                        {NAVBAR_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className="text-sm sm:text-base uppercase tracking-tight text-primary font-medium whitespace-nowrap shrink-0"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 shrink-0">
                        <Button className="text-xs md:text-sm">
                            ACCESSO
                        </Button>
                        <Button variant="secondary" className="text-xs md:text-sm">
                            REGISTRATE
                        </Button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            <div
                className={`lg:hidden absolute left-0 right-0 top-full z-40 border-b border-border bg-background shadow-lg transition-[visibility,opacity] duration-200 ${mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
                    }`}
                aria-hidden={!mobileMenuOpen}
            >
                <div className="container mx-auto px-5 sm:px-16 py-4 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        {NAVBAR_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={closeMobileMenu}
                                className="py-3 px-2 text-base uppercase tracking-tight text-primary font-medium hover:bg-accent rounded-md"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1 pt-2 border-t border-border">
                        <Button className="w-full justify-center text-sm" onClick={closeMobileMenu}>
                            ACCESSO
                        </Button>
                        <Button variant="secondary" className="w-full justify-center text-sm" onClick={closeMobileMenu}>
                            REGISTRATE
                        </Button>
                        <ThemeToggle className="flex w-full justify-center" />
                    </div>
                </div>
            </div>
            {mobileMenuOpen && (
                <button
                    type="button"
                    className="lg:hidden fixed inset-0 z-30 bg-black/20 focus:outline-none"
                    aria-label="Chiudi menu"
                    onClick={closeMobileMenu}
                />
            )}
        </nav>
    );
}
