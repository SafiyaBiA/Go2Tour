import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
    Timestamp,
    updateDoc,
    doc
} from 'firebase/firestore';

export interface Booking {
    id: string;
    userId: string;
    destinationId: string;
    destinationName: string;
    location: string;
    checkIn: Date | Timestamp;
    checkOut: Date | Timestamp;
    guests: number;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    image?: string;
    createdAt: Timestamp;
    date?: string; // For display purposes
}

const useRealData = import.meta.env.VITE_USE_REAL_DATA === 'true';

export const BookingService = {
    /**
     * Create a new booking
     */
    async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'status' | 'paymentStatus'>): Promise<string> {
        if (!useRealData) {
            console.log('Mock booking created:', bookingData);
            return 'mock-booking-id';
        }

        try {
            const docRef = await addDoc(collection(db, 'bookings'), {
                ...bookingData,
                status: 'pending',
                paymentStatus: 'pending',
                createdAt: Timestamp.now(),
            });
            return docRef.id;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw error;
        }
    },

    /**
     * Get all bookings for a user
     */
    async getUserBookings(userId: string): Promise<Booking[]> {
        if (!useRealData) {
            return []; // Return empty for mock mode
        }

        try {
            const q = query(
                collection(db, 'bookings'),
                where('userId', '==', userId),
                orderBy('createdAt', 'desc')
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            } as Booking));
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            return [];
        }
    },

    /**
     * Update booking status
     */
    async updateBookingStatus(
        bookingId: string,
        status: 'pending' | 'confirmed' | 'cancelled'
    ): Promise<void> {
        if (!useRealData) {
            console.log(`Mock booking ${bookingId} status updated to ${status}`);
            return;
        }

        try {
            const bookingRef = doc(db, 'bookings', bookingId);
            await updateDoc(bookingRef, { status });
        } catch (error) {
            console.error('Error updating booking status:', error);
            throw error;
        }
    },

    /**
     * Update payment status
     */
    async updatePaymentStatus(
        bookingId: string,
        paymentStatus: 'pending' | 'paid' | 'refunded'
    ): Promise<void> {
        if (!useRealData) {
            console.log(`Mock booking ${bookingId} payment status updated to ${paymentStatus}`);
            return;
        }

        try {
            const bookingRef = doc(db, 'bookings', bookingId);
            await updateDoc(bookingRef, { paymentStatus });
        } catch (error) {
            console.error('Error updating payment status:', error);
            throw error;
        }
    },

    /**
     * Cancel a booking
     */
    async cancelBooking(bookingId: string): Promise<void> {
        await this.updateBookingStatus(bookingId, 'cancelled');
    },
};
