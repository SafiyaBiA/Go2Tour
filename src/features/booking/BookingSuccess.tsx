import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BookingSuccessProps {
    onReset: () => void;
}

export default function BookingSuccess({ onReset }: BookingSuccessProps) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-emerald-600 fill-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">Pack your bags! We've saved this trip to your profile.</p>
            <Button variant="outline" onClick={onReset}>Book Another Trip</Button>
        </div>
    );
}
