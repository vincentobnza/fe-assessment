
import { PiSoccerBall } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { GrGamepad } from "react-icons/gr";
import { IoExpand } from "react-icons/io5";

export type BottomNavItem = {
    id: string
    label: string
    href: string
    icon: React.ElementType
}

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
    { id: "deportes", label: "Deportes", href: "/deportes", icon: PiSoccerBall },
    { id: "favoritos", label: "Favoritos", href: "/favoritos", icon: FaRegStar },
    { id: "recientes", label: "Recientes", href: "/recientes", icon: IoTimeOutline },
    { id: "casino", label: "Casino", href: "/", icon: GrGamepad },
    { id: "expandir", label: "Expandir", href: "#expandir", icon: IoExpand },
]
