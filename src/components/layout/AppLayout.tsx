import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ChatWidget from '@/features/companion/ChatWidget';
import BottomNav from "./BottomNav";

export default function AppLayout() {
    return (
        <div className="flex h-screen bg-background text-gray-900 overflow-hidden relative">
            {/* Desktop Sidebar */}
            <Sidebar className="hidden md:flex w-64 border-r" />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Mobile/Tablet Header */}
                <Navbar className="md:hidden" />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6 scroll-smooth">
                    <Outlet />
                </main>
            </div>

            {/* AI Companion Widget (Global) */}
            <ChatWidget />

            {/* Mobile Bottom Navigation */}
            <BottomNav />
        </div>
    );
}
