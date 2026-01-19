import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Settings, LogOut, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    // Very basic auth check
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('adminToken');
        if (!isAuthenticated && location.pathname !== '/admin/login') {
            navigate('/admin/login');
        }
    }, [location, navigate]);

    if (location.pathname === '/admin/login') {
        return <Outlet />;
    }

    const NAV_ITEMS = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { label: 'Destinations', icon: Map, path: '/admin/destinations' },
        { label: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 flex items-center gap-2 border-b border-slate-800">
                    <Shield className="w-6 h-6 text-emerald-500" />
                    <span className="font-bold text-lg tracking-wide">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {NAV_ITEMS.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
                                location.pathname === item.path
                                    ? "bg-emerald-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => {
                            localStorage.removeItem('adminToken');
                            navigate('/admin/login');
                        }}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="font-semibold text-gray-800">Overview</h2>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                            AD
                        </div>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
