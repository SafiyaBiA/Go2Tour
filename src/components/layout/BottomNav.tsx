import { Link, useLocation } from "react-router-dom";
import { Calendar, Map, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
    const location = useLocation();

    const navItems = [
        { icon: Home, label: "Home", path: "/" },
        { icon: Map, label: "Explore", path: "/map" },
        { icon: Calendar, label: "Trips", path: "/transport" }, // Using Transport as generic Trips placeholder for now
        { icon: User, label: "Profile", path: "/profile" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-gray-200 lg:hidden pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                                isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {isActive && (
                                <span className="absolute -top-[1px] w-8 h-1 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                            <item.icon className={cn("w-6 h-6", isActive && "fill-current")} strokeWidth={isActive ? 2 : 1.5} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}
