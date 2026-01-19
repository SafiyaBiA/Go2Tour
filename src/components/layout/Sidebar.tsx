import { cn } from '@/lib/utils';
import { Home, Map, Camera, Shield, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    className?: string;
}

const NAV_ITEMS = [
    { label: 'Explore', icon: Home, path: '/' },
    { label: 'Map', icon: Map, path: '/map' },
    { label: 'AR View', icon: Camera, path: '/ar' },
    { label: 'Safety', icon: Shield, path: '/safety' },
    { label: 'Profile', icon: User, path: '/profile' },
];

export default function Sidebar({ className }: SidebarProps) {
    const location = useLocation();

    return (
        <aside className={cn("flex flex-col bg-surface h-full", className)}>
            <div className="p-6">
                <h1 className="text-2xl font-display font-bold text-primary">Go2Tour</h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t">
                <div className="bg-gradient-to-br from-secondary/10 to-transparent p-4 rounded-lg">
                    <p className="text-xs font-semibold text-secondary mb-1">AI Companion</p>
                    <p className="text-sm text-gray-600">Plan your trip with AI assistance.</p>
                </div>
            </div>
        </aside>
    );
}
