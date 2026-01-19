import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.production' });

// Firebase config
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Destinations data
const DESTINATIONS = [
    {
        name: "Meenakshi Amman Temple",
        location: "Madurai, Tamil Nadu",
        description: "A historic Hindu temple located on the southern bank of the Vaigai River. It is dedicated to Meenakshi, a form of Parvati, and her consort, Sundareshwarar, a form of Shiva.",
        rating: 4.9,
        reviewCount: 1245,
        category: "heritage",
        heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-c95b66cece41?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 9.9195, lng: 78.1193 },
        amenities: ["Guided Tours", "Photography Allowed", "Wheelchair Access", "Nearby Parking"],
        bestTime: "6 AM - 9 AM",
        crowdLevel: "moderate",
        priceLevel: "₹120",
        tags: ["spiritual", "architecture", "heritage"]
    },
    {
        name: "Shore Temple",
        location: "Mahabalipuram, Tamil Nadu",
        description: "Built in 700–728 AD, this structural temple overlooks the Bay of Bengal. A UNESCO World Heritage Site showcasing Pallava architecture.",
        rating: 4.8,
        reviewCount: 892,
        category: "heritage",
        heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 12.6162, lng: 80.1928 },
        amenities: ["Guided Tours", "Restrooms", "Parking"],
        bestTime: "Early morning or sunset",
        crowdLevel: "high",
        priceLevel: "₹40",
        tags: ["heritage", "beach", "unesco"]
    },
    {
        name: "Ooty Botanical Gardens",
        location: "Ooty, Tamil Nadu",
        description: "Sprawling 55-acre garden featuring rare tree species, fossilized tree trunks, and a vibrant flower show every May.",
        rating: 4.7,
        reviewCount: 1567,
        category: "nature",
        heroImage: "https://images.unsplash.com/photo-1544634076-a90160bcaf7b?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1544634076-a90160bcaf7b?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1596495578065-6f8071691639?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 11.4102, lng: 76.6950 },
        amenities: ["Cafeteria", "Restrooms", "Photography", "Parking"],
        bestTime: "9 AM - 5 PM",
        crowdLevel: "moderate",
        priceLevel: "₹50",
        tags: ["nature", "gardens", "family-friendly"]
    },
    {
        name: "Brihadeeswarar Temple",
        location: "Thanjavur, Tamil Nadu",
        description: "A UNESCO World Heritage Site and one of the largest temples in India. Built by Raja Raja Chola I in the 11th century.",
        rating: 4.9,
        reviewCount: 2103,
        category: "heritage",
        heroImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop"
        ],
        coordinates: { lat: 10.7825, lng: 79.1317 },
        amenities: ["Guided Tours", "Audio Guide", "Museum", "Parking"],
        bestTime: "6 AM - 8 PM",
        crowdLevel: "moderate",
        priceLevel: "Free",
        tags: ["spiritual", "architecture", "unesco", "heritage"]
    }
];

async function migrateDestinations() {
    console.log('🚀 Starting destination migration...');
    console.log(`Project: ${firebaseConfig.projectId}\n`);

    const destinationsRef = collection(db, 'destinations');
    let count = 0;

    for (const dest of DESTINATIONS) {
        try {
            await addDoc(destinationsRef, {
                ...dest,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
            count++;
            console.log(`✅ Migrated: ${dest.name}`);
        } catch (error) {
            console.error(`❌ Error migrating ${dest.name}:`, error);
        }
    }

    console.log(`\n✨ Migration complete! ${count}/${DESTINATIONS.length} destinations migrated.`);
}

// Run migration
migrateDestinations()
    .then(() => {
        console.log('Done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exit(1);
    });
