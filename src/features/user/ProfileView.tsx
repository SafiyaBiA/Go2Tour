import { User, Settings, MapPin, Heart, LogOut, Calendar, Award, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useBooking } from '@/context/BookingContext';

export default function ProfileView() {
    const { trips } = useBooking();

    return (
        <div className="pb-20 lg:pb-0">
            {/* Premium Hero Header */}
            <div className="relative h-48 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-500 rounded-b-[3rem] overflow-hidden mb-8">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=2670')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-32 relative z-10">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-8"
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                                JD
                            </div>
                            <div className="absolute -bottom-2 -right-2 p-2 bg-yellow-400 rounded-full shadow-lg">
                                <Award className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl font-display font-bold text-gray-900 mb-1">John Doe</h1>
                            <p className="text-gray-500 mb-3">Travel Enthusiast • Tamil Nadu Explorer</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-md">
                                    Level 3 Guide
                                </span>
                                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                    Member since 2024
                                </span>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg">
                            <Settings className="w-4 h-4" />
                            Edit Profile
                        </button>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">{12 + trips.length}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1 font-medium">Trips</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">45</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1 font-medium">Places</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">850</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1 font-medium">Photos</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900">24</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide mt-1 font-medium">Reviews</div>
                        </div>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-4 gap-6">
                    {/* Sidebar Menu */}
                    <div className="space-y-2">
                        <nav className="flex flex-col gap-2">
                            <button className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-2xl font-medium shadow-lg">
                                <User className="w-5 h-5" />
                                Personal Info
                            </button>
                            <button className="flex items-center gap-3 px-5 py-4 bg-white hover:bg-gray-50 rounded-2xl text-gray-600 font-medium transition-colors shadow-sm border border-gray-100">
                                <MapPin className="w-5 h-5" />
                                My Trips
                            </button>
                            <button className="flex items-center gap-3 px-5 py-4 bg-white hover:bg-gray-50 rounded-2xl text-gray-600 font-medium transition-colors shadow-sm border border-gray-100">
                                <Heart className="w-5 h-5" />
                                Wishlist
                            </button>
                            <button className="flex items-center gap-3 px-5 py-4 bg-white hover:bg-gray-50 rounded-2xl text-gray-600 font-medium transition-colors shadow-sm border border-gray-100">
                                <Camera className="w-5 h-5" />
                                My Photos
                            </button>
                            <hr className="my-2 border-gray-200" />
                            <button className="flex items-center gap-3 px-5 py-4 bg-white hover:bg-red-50 rounded-2xl text-red-600 font-medium transition-colors shadow-sm border border-gray-100">
                                <LogOut className="w-5 h-5" />
                                Log Out
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Trips Section */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-display font-bold text-gray-900">Upcoming Trips</h2>
                                <span className="text-sm font-bold bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
                                    {trips.length} Booked
                                </span>
                            </div>

                            {trips.length === 0 ? (
                                <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-200">
                                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                    <p className="text-gray-600 font-medium mb-1">No upcoming trips yet</p>
                                    <p className="text-sm text-gray-400">Time to plan your next adventure!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {trips.map((trip) => (
                                        <motion.div
                                            key={trip.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex gap-5 items-start p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-md transition-all"
                                        >
                                            <div className="w-20 h-20 bg-gray-200 rounded-xl shrink-0 overflow-hidden">
                                                {trip.image ? (
                                                    <img src={trip.image} alt={trip.destinationName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
                                                        GT
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-display font-bold text-lg text-gray-900">{trip.destinationName}</h3>
                                                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                                                        {trip.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3">
                                                    <MapPin className="w-4 h-4" /> {trip.location}
                                                </p>
                                                <div className="flex items-center gap-4 text-sm text-gray-600 font-medium border-t border-gray-100 pt-3">
                                                    <span>{trip.guests} Guest{trip.guests > 1 ? 's' : ''}</span>
                                                    <span>•</span>
                                                    <span>Booked {trip.date}</span>
                                                    <span className="ml-auto font-bold text-gray-900 text-base">${trip.totalPrice}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
