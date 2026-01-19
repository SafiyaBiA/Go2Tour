import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BookingService, Booking } from '@/services/BookingService';
import { useAuth } from './AuthContext';

export interface Trip {
    id: string;
    destinationName: string;
    location: string;
    date: string;
    guests: number;
    totalPrice: number;
    image?: string;
    status: 'Upcoming' | 'Completed' | 'pending' | 'confirmed' | 'cancelled';
}

interface BookingContextType {
    trips: Trip[];
    addTrip: (trip: Omit<Trip, 'id' | 'status'>) => Promise<void>;
    loading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    // Load user bookings when authenticated
    useEffect(() => {
        if (user) {
            loadUserBookings();
        } else {
            setTrips([]);
        }
    }, [user]);

    const loadUserBookings = async () => {
        if (!user) return;

        setLoading(true);
        try {
            const bookings = await BookingService.getUserBookings(user.uid);
            const formattedTrips: Trip[] = bookings.map((booking: Booking) => ({
                id: booking.id,
                destinationName: booking.destinationName,
                location: booking.location,
                date: booking.date || new Date(booking.createdAt.toDate()).toLocaleDateString(),
                guests: booking.guests,
                totalPrice: booking.totalPrice,
                image: booking.image,
                status: booking.status === 'confirmed' ? 'Upcoming' :
                    booking.status === 'cancelled' ? 'Completed' : 'Upcoming'
            }));
            setTrips(formattedTrips);
        } catch (error) {
            console.error('Error loading bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const addTrip = async (tripData: Omit<Trip, 'id' | 'status'>) => {
        if (!user) {
            console.warn('User must be authenticated to create bookings');
            // For demo purposes, add to local state
            const newTrip: Trip = {
                ...tripData,
                id: Math.random().toString(36).substr(2, 9),
                status: 'Upcoming'
            };
            setTrips(prev => [newTrip, ...prev]);
            return;
        }

        try {
            const bookingId = await BookingService.createBooking({
                userId: user.uid,
                destinationId: 'dest-' + Math.random().toString(36).substr(2, 9),
                destinationName: tripData.destinationName,
                location: tripData.location,
                checkIn: new Date(),
                checkOut: new Date(Date.now() + 86400000 * 3), // 3 days later
                guests: tripData.guests,
                totalPrice: tripData.totalPrice,
                image: tripData.image,
            });

            // Add to local state immediately
            const newTrip: Trip = {
                ...tripData,
                id: bookingId,
                status: 'Upcoming'
            };
            setTrips(prev => [newTrip, ...prev]);
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    };

    return (
        <BookingContext.Provider value={{ trips, addTrip, loading }}>
            {children}
        </BookingContext.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingContext);
    if (context === undefined) {
        throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
}
