import { useState } from 'react';
import { Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/context/BookingContext';
import BookingSuccess from './BookingSuccess';

interface BookingCardProps {
    pricePerNight: number;
    rating: number;
    reviewCount: number;
    destinationName?: string;
    location?: string;
    image?: string;
}

export default function BookingCard({
    pricePerNight,
    rating,
    reviewCount,
    destinationName = "Unknown Place",
    location = "Tamil Nadu",
    image = ""
}: BookingCardProps) {
    const [guests, setGuests] = useState(2);
    const [isBooked, setIsBooked] = useState(false);
    const [loading, setLoading] = useState(false);

    const { addTrip } = useBooking();

    const handleBooking = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            addTrip({
                destinationName,
                location,
                date: new Date().toLocaleDateString(),
                guests,
                totalPrice: pricePerNight * 5 + 40,
                image
            });
            setLoading(false);
            setIsBooked(true);
        }, 1500);
    };

    if (isBooked) {
        return <BookingSuccess onReset={() => setIsBooked(false)} />;
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <span className="text-3xl font-bold text-gray-900">${pricePerNight}</span>
                    <span className="text-gray-500"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm bg-gray-50 px-2 py-1 rounded-md">
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span className="font-semibold">{rating}</span>
                    <span className="text-gray-400">({reviewCount})</span>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-gray-500">Check In</label>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0 transition-all text-sm font-medium outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-gray-500">Check Out</label>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full p-3 bg-gray-50 rounded-xl border-transparent focus:border-emerald-500 focus:bg-white focus:ring-0 transition-all text-sm font-medium outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-gray-500">Guests</label>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                        <Users className="w-5 h-5 text-gray-400" />
                        <select
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                            className="bg-transparent w-full font-medium outline-none"
                        >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 py-4 space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                    <span>${pricePerNight} x 5 nights</span>
                    <span>${pricePerNight * 5}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Service fee</span>
                    <span>$40</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-dashed">
                    <span>Total</span>
                    <span>${pricePerNight * 5 + 40}</span>
                </div>
            </div>

            <Button size="lg" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg font-bold h-14" onClick={handleBooking}>
                {loading ? 'Confirming...' : 'Reserve Now'}
            </Button>
            <p className="text-center text-xs text-gray-400 mt-3">You won't be charged yet</p>
        </div>
    );
}
