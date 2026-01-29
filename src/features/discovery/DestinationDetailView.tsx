import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Share2, Heart, Clock, Users, Calendar, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import BookingCard from '@/features/booking/BookingCard';
import ReviewList from '@/features/discovery/ReviewList';

export default function DestinationDetailView() {

    // Mock Data (In a real app, fetch based on ID)
    const destination = {
        name: "Meenakshi Amman Temple",
        location: "Madurai, Tamil Nadu",
        description: "A historic Hindu temple located on the southern bank of the Vaigai River. It is dedicated to Thirukamakottam Udaya Aaludaiya Nachiyar (Meenakshi), a form of Parvati, and her consort, Sundareshwarar, a form of Shiva.",
        rating: 4.9,
        reviews: 1245,
        price: 120,
        heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1587474260584-c95b66cece41?q=80&w=1200&auto=format&fit=crop"
        ],
        highlights: [
            { icon: Clock, label: "Best Time", value: "6 AM - 9 AM" },
            { icon: Users, label: "Crowd Level", value: "Moderate" },
            { icon: Calendar, label: "Duration", value: "2-3 hours" },
            { icon: Shield, label: "Safety", value: "Verified Safe Zone" },
        ],
        etiquette: [
            "Dress modestly (shoulders and knees covered)",
            "Remove footwear before entering",
            "Non-Hindus are not allowed in the inner sanctum",
            "Photography is restricted in certain areas"
        ],
        story: "For over 2,500 years, this temple has been the pulsating heart of Madurai. It's not just stone and mortar; it's a living archive of Dravidian soul. Legends say the city was formed where nectar fell from Lord Shiva's hair... and this temple is the spot where it all began."
    };

    return (
        <div className="pb-20 lg:pb-0">
            {/* Immersive Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    src={destination.heroImage}
                    alt={destination.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Floating Nav */}
                <div className="absolute top-6 left-4 right-4 flex items-center justify-between z-10">
                    <Link to="/" className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-all">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-all">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button onClick={() => { navigator.clipboard.writeText(window.location.href); }} className="p-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-white hover:bg-white/20 transition-all">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="inline-block px-3 py-1 bg-yellow-500/90 text-black text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                Heritage Site
                            </div>
                            <h1 className="text-4xl md:text-6xl font-display font-bold mb-3 drop-shadow-lg">{destination.name}</h1>
                            <div className="flex items-center gap-4 text-lg">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-yellow-400" />
                                    <span className="font-medium">{destination.location}</span>
                                </div>
                                <span className="text-white/60">•</span>
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold">{destination.rating}</span>
                                    <span className="text-white/80">({destination.reviews})</span>
                                </div>
                                <span className="text-white/60">•</span>
                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/30">
                                    <Shield className="w-4 h-4 text-emerald-400" />
                                    <span className="text-xs font-bold text-emerald-400">Trusted Location</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-3 gap-4">
                            {destination.highlights.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + idx * 0.1 }}
                                    className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
                                >
                                    <item.icon className="w-6 h-6 text-primary mb-2" />
                                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</p>
                                    <p className="text-sm font-bold text-gray-900 mt-1">{item.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Story Card */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-yellow-500" />
                                <h2 className="text-2xl font-display font-bold text-gray-900">Why this place matters</h2>
                            </div>
                            <p className="text-xl text-gray-800 font-serif italic leading-relaxed mb-6">
                                "{destination.story}"
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {destination.description}
                            </p>
                        </div>

                        {/* Etiquette & AR CTA */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-stone-100 rounded-3xl p-6 border border-stone-200">
                                <h3 className="text-xl font-bold text-stone-800 mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5" /> Cultural Etiquette
                                </h3>
                                <ul className="space-y-2">
                                    {destination.etiquette.map((item, i) => (
                                        <li key={i} className="flex gap-2 text-stone-600 text-sm italic">
                                            <span className="text-stone-400">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <Link to="/ar" className="bg-indigo-600 rounded-3xl p-6 text-white flex flex-col justify-between hover:bg-indigo-700 transition-all group">
                                <div>
                                    <Sparkles className="w-8 h-8 mb-4 text-indigo-200 group-hover:rotate-12 transition-transform" />
                                    <h3 className="text-xl font-bold">Experience in AR</h3>
                                    <p className="text-indigo-100 text-sm mt-2 opacity-80">See historical layers and hidden stories come to life.</p>
                                </div>
                                <div className="flex items-center gap-2 mt-4 font-bold text-sm">
                                    Launch AR Companion <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>

                        {/* Image Gallery */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Gallery</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {destination.images.map((img, idx) => (
                                    <div key={idx} className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer">
                                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ReviewList rating={destination.rating} count={destination.reviews} />
                    </div>

                    {/* Booking Sidebar */}
                    <div className="relative">
                        <div className="sticky top-24">
                            <BookingCard
                                pricePerNight={destination.price}
                                rating={destination.rating}
                                reviewCount={destination.reviews}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
