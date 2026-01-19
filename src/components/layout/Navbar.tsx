import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/ui/language-switcher';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

interface NavbarProps {
    className?: string;
}

export default function Navbar({ className }: NavbarProps) {
    const { user, signInWithGoogle } = useAuth();
    return (
        <header className={cn("flex items-center justify-between p-4 border-b bg-surface sticky top-0 z-50", className)}>
            <div className="flex items-center gap-2">
                {/* Mobile Menu Toggle Implementation would go here */}
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
                <span className="font-display font-bold text-xl text-primary">Go2Tour</span>
            </div>

            {/* Search or Profile Actions */}
            <div className="flex items-center gap-4">
                <Link to="/map" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Map</Link>
                <Link to="/transport" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Travel</Link>
                <Link to="/safety" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Safety</Link>
                <Link to="/ar" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">AR View</Link>
                <LanguageSwitcher />

                {user ? (
                    <Link to="/profile" className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold hover:bg-indigo-100 transition-all">
                        <span className="text-sm">My Account</span>
                        <div className="w-6 h-6 bg-indigo-200 rounded-full flex items-center justify-center text-xs text-indigo-800">
                            {user.displayName ? user.displayName[0] : 'U'}
                        </div>
                    </Link>
                ) : (
                    <button onClick={signInWithGoogle} className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors text-sm shadow-md hover:shadow-lg">
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
