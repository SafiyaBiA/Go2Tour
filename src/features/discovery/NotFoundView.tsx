import { Link } from 'react-router-dom';
import { Home, MapPinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundView() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200 m-8">
            <div className="bg-red-50 p-6 rounded-full mb-6">
                <MapPinOff className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Page Not Found</h1>
            <p className="text-gray-500 max-w-md mb-8 text-lg">
                Looks like you've ventured into uncharted territory. This path hasn't been mapped yet.
            </p>
            <Link to="/">
                <Button size="lg" className="font-semibold gap-2">
                    <Home className="w-5 h-5" />
                    Return Home
                </Button>
            </Link>
        </div>
    );
}
