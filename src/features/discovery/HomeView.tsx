import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Map as MapIcon, Moon, Sun, Sunrise } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from '@/components/ui/DestinationCard';
import { Button } from "@/components/ui/button";
import GuidedSearch from '@/features/discovery/GuidedSearch';
import { DestinationService } from '@/services/DestinationService';

export default function HomeView() {
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);
    const [featured, setFeatured] = useState<any[]>([]);

    useEffect(() => {
        DestinationService.getAll().then(setFeatured);
    }, []);

    // Greeting logic
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';
    const GreetingIcon = hour < 12 ? Sunrise : hour < 18 ? Sun : Moon;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="pb-24">
            {/* Immersive Hero Section */}
            <section className="relative h-[90vh] w-full overflow-hidden rounded-b-[40px] shadow-2xl">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2666&auto=format&fit=crop" /* Meenakshi Temple or similar iconic TN view */
                        className="w-full h-full object-cover grayscale-[20%] brightness-[70%]"
                        alt="Hero Background"
                    />
                    {/* Video background preferred in production */}
                </motion.div>

                <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-6">
                            <GreetingIcon className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-medium tracking-wide">{greeting}, Traveler</span>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-display font-bold text-white mb-6 tracking-tight drop-shadow-lg">
                            Go2Tour <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-500">Tamil Nadu</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                            Discover the soul of the south. From ancient temples to misty hills, let us guide your journey.
                        </p>
                    </motion.div>

                    <p className="text-gray-300 flex items-center gap-1.5 text-sm font-medium">
                        <MapIcon className="w-4 h-4 text-orange-400" /> Madurai, Tamil Nadu
                    </p>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/20 shadow-sm">
                    4.9 ★
                </div>
            </section>
            {/* Guided Search Section */}
            <section className="relative z-30 -mt-20 px-4 md:px-8 lg:px-12">
                <GuidedSearch />
            </section>

            {/* Featured Destinations Section */}
            <section className="py-16 px-4 md:px-8 lg:px-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-display font-bold text-gray-800">Featured Destinations</h2>
                    <Link to="/destinations" className="text-orange-500 hover:text-orange-600 font-medium flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {featured.map((destination) => (
                        <Link to={`/destination/${destination.id}`} key={destination.id}>
                            <DestinationCard {...destination} />
                        </Link>
                    ))}
                </motion.div>
            </section>

            {/* Journey Inspiration Section */}
            <section className="py-16 px-4 md:px-8 lg:px-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl mx-4 md:mx-8 lg:mx-12 shadow-xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-display font-bold text-gray-800 mb-4">Your Journey, Our Inspiration</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Explore curated experiences and discover new ways to travel.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <JourneyCard
                        time="3 Days"
                        title="The Spiritual Circuit"
                        desc="Walk through ancient corridors of power and prayer in Madurai & Tanjore."
                        image="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2670&auto=format&fit=crop"
                    />
                    <JourneyCard
                        time="4 Days"
                        title="Nilgiri Mist & Tea"
                        desc="Escape to the blue mountains for a wellness retreat amidst tea estates."
                        image="https://images.unsplash.com/photo-1596495578065-6f8071691639?q=80&w=2670&auto=format&fit=crop"
                    />
                    <JourneyCard
                        time="2 Days"
                        title="Chettinad Heritage Trail"
                        desc="Discover the grand mansions and legendary cuisine of the Chettiars."
                        image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2670&auto=format&fit=crop"
                    />
                </div>
                <div className="text-center mt-12">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                        Plan Your Custom Journey <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                </div>
            </section>
        </div>
    );
}

function JourneyCard({ time, title, desc, image }: any) {
    return (
        <div className="group relative overflow-hidden rounded-2xl h-64 cursor-pointer">
            <img src={image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={title} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 mb-2 inline-block">{time}</span>
                <h3 className="text-xl font-bold font-display">{title}</h3>
                <p className="text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">{desc}</p>
            </div>
        </div>
    )
}
