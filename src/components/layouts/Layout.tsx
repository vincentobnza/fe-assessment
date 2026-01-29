import Navbar from "../Navbar"
import BottomNav from "../BottomNav"
import Footer from "../Footer"
import { Outlet, ScrollRestoration } from "react-router-dom"

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-background p-2 lg:p-0">
            <Navbar />
            <main className="flex-1 pb-10">
                <Outlet />
            </main>
            <Footer />
            <BottomNav />
            <ScrollRestoration />
        </div>
    )
}
