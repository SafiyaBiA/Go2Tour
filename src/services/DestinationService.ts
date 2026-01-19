import { db } from '@/lib/firebase';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    Timestamp
} from 'firebase/firestore';

export interface Destination {
    id: string;
    name: string;
    location: string;
    description: string;
    rating: number;
    reviewCount: number;
    category: 'heritage' | 'nature' | 'spiritual' | 'adventure';
    heroImage: string;
    images: string[];
    coordinates: {
        lat: number;
        lng: number;
    };
    amenities: string[];
    bestTime: string;
    crowdLevel: 'low' | 'moderate' | 'high';
    priceLevel: string;
    tags: string[];
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// Mock data for fallback
const MOCK_DESTINATIONS: Destination[] = [
    {
        id: '1',
        name: "Meenakshi Amman Temple",
        location: "Madurai, Tamil Nadu",
        description: "A historic Hindu temple located on the southern bank of the Vaigai River.",
        rating: 4.9,
        reviewCount: 1245,
        category: "heritage",
        heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 9.9195, lng: 78.1193 },
        amenities: ["Guided Tours", "Photography Allowed", "Wheelchair Access"],
        bestTime: "6 AM - 9 AM",
        crowdLevel: "moderate",
        priceLevel: "₹120",
        tags: ["spiritual", "architecture", "heritage"]
    },
    {
        id: '2',
        name: "Shore Temple",
        location: "Mahabalipuram, Tamil Nadu",
        description: "Built in 700–728 AD, this structural temple overlooks the Bay of Bengal.",
        rating: 4.8,
        reviewCount: 892,
        category: "heritage",
        heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 12.6162, lng: 80.1928 },
        amenities: ["Guided Tours", "Restrooms", "Parking"],
        bestTime: "Early morning or sunset",
        crowdLevel: "high",
        priceLevel: "₹40",
        tags: ["heritage", "beach", "unesco"]
    },
    {
        id: '3',
        name: "Ooty Botanical Gardens",
        location: "Ooty, Tamil Nadu",
        description: "Sprawling 55-acre garden featuring rare tree species.",
        rating: 4.7,
        reviewCount: 1567,
        category: "nature",
        heroImage: "https://images.unsplash.com/photo-1544634076-a90160bcaf7b?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1544634076-a90160bcaf7b?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 11.4102, lng: 76.6950 },
        amenities: ["Cafeteria", "Restrooms", "Photography"],
        bestTime: "9 AM - 5 PM",
        crowdLevel: "moderate",
        priceLevel: "₹50",
        tags: ["nature", "gardens", "family-friendly"]
    },
    {
        id: '4',
        name: "Brihadeeswarar Temple",
        location: "Thanjavur, Tamil Nadu",
        description: "A UNESCO World Heritage Site and one of the largest temples in India.",
        rating: 4.9,
        reviewCount: 2103,
        category: "heritage",
        heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 10.7825, lng: 79.1317 },
        amenities: ["Guided Tours", "Audio Guide", "Museum"],
        bestTime: "6 AM - 8 PM",
        crowdLevel: "moderate",
        priceLevel: "Free",
        tags: ["spiritual", "architecture", "unesco"]
    }
];

const useRealData = import.meta.env.VITE_USE_REAL_DATA === 'true';

export const DestinationService = {
    /**
     * Get all destinations
     */
    async getAll(): Promise<Destination[]> {
        if (!useRealData) {
            return Promise.resolve(MOCK_DESTINATIONS);
        }

        try {
            const querySnapshot = await getDocs(collection(db, "destinations"));
            if (querySnapshot.empty) {
                console.warn("No destinations found in Firestore, using mock data");
                return MOCK_DESTINATIONS;
            }

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Destination));
        } catch (error) {
            console.error("Error fetching destinations:", error);
            return MOCK_DESTINATIONS;
        }
    },

    /**
     * Get destination by ID
     */
    async getById(id: string): Promise<Destination | null> {
        if (!useRealData) {
            return MOCK_DESTINATIONS.find(d => d.id === id) || null;
        }

        try {
            const docRef = doc(db, "destinations", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Destination;
            }
            return null;
        } catch (error) {
            console.error("Error fetching destination:", error);
            return MOCK_DESTINATIONS.find(d => d.id === id) || null;
        }
    },

    /**
     * Get destinations by category
     */
    async getByCategory(category: string): Promise<Destination[]> {
        if (!useRealData) {
            return MOCK_DESTINATIONS.filter(d => d.category === category);
        }

        try {
            const q = query(
                collection(db, "destinations"),
                where("category", "==", category),
                orderBy("rating", "desc")
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Destination));
        } catch (error) {
            console.error("Error fetching destinations by category:", error);
            return MOCK_DESTINATIONS.filter(d => d.category === category);
        }
    },

    /**
     * Get top-rated destinations
     */
    async getTopRated(limitCount: number = 10): Promise<Destination[]> {
        if (!useRealData) {
            return MOCK_DESTINATIONS
                .sort((a, b) => b.rating - a.rating)
                .slice(0, limitCount);
        }

        try {
            const q = query(
                collection(db, "destinations"),
                orderBy("rating", "desc"),
                limit(limitCount)
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Destination));
        } catch (error) {
            console.error("Error fetching top-rated destinations:", error);
            return MOCK_DESTINATIONS
                .sort((a, b) => b.rating - a.rating)
                .slice(0, limitCount);
        }
    },

    /**
     * Subscribe to real-time updates for a destination
     */
    subscribeToDestination(
        destinationId: string,
        callback: (destination: Destination | null) => void
    ): () => void {
        if (!useRealData) {
            const dest = MOCK_DESTINATIONS.find(d => d.id === destinationId) || null;
            callback(dest);
            return () => { }; // No-op unsubscribe
        }

        const docRef = doc(db, "destinations", destinationId);
        return onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                callback({ id: doc.id, ...doc.data() } as Destination);
            } else {
                callback(null);
            }
        }, (error) => {
            console.error("Error in destination subscription:", error);
            callback(null);
        });
    },

    /**
     * Search destinations by name or tags
     */
    async search(searchTerm: string): Promise<Destination[]> {
        const allDestinations = await this.getAll();
        const lowerSearch = searchTerm.toLowerCase();

        return allDestinations.filter(dest =>
            dest.name.toLowerCase().includes(lowerSearch) ||
            dest.location.toLowerCase().includes(lowerSearch) ||
            dest.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
        );
    }
};
