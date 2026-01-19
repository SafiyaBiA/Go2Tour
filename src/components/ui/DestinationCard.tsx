import { MapPin, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface DestinationCardProps {
    id: string;
    name: string;
    location: string;
    rating: number;
    image: string;
    tags?: string[];
    priceLevel?: string;
    delay?: number;
}

export default function DestinationCard({ id, name, location, rating, image, tags = [], priceLevel, delay = 0 }: DestinationCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay * 0.1 }}
            className="group relative h-[400px] w-full overflow-hidden rounded-3xl cursor-pointer"
        >
            <Link to={`/destination/${id}`}>
                {/* Image Fill */}
                <div className="absolute inset-0">
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Top Actions */}
                <div className="absolute top-4 right-4 z-10">
                    <button
                        className="p-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all active:scale-95"
                        onClick={(e) => { e.preventDefault(); /* Like logic */ }}
                    >
                        <Heart className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            {tags[0] && (
                                <span className="inline-block px-2 py-1 mb-2 text-xs font-bold uppercase tracking-wider bg-primary/90 text-white rounded-md">
                                    {tags[0]}
                                </span>
                            )}
                            <h3 className="text-2xl font-display font-bold leading-tight mb-1">{name}</h3>
                            <div className="flex items-center text-gray-300 text-sm">
                                <MapPin className="w-4 h-4 mr-1 text-primary" />
                                {location}
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10 font-bold text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                {rating}
                            </div>
                            {priceLevel && <span className="text-xs text-gray-400 mt-1">{priceLevel}</span>}
                        </div>
                    </div>

                    {/* Hidden by default, shown on hover (desktop) or always (mobile) if needed */}
                    <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out">
                        <p className="text-sm text-gray-300 line-clamp-2 mt-2">
                            Discover the hidden stories and spiritual aura of this ancient marvel. Perfect for a morning visit.
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
