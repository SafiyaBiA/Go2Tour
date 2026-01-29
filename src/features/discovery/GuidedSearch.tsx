import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Users, ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDiscovery } from '@/context/DiscoveryContext';

export default function GuidedSearch() {
    const navigate = useNavigate();
    const { preferences, updatePreference } = useDiscovery();
    const [step, setStep] = useState(1);

    // Step 1: Vibe / Intent (Story: "I want to explore...")
    const intents = [
        { id: 'spiritual', label: 'Spiritual', icon: Sparkles, desc: 'Ancient temples & sacred rituals', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop' },
        { id: 'nature', label: 'Nature', icon: Compass, desc: 'Misty hills & lush escapes', image: 'https://images.unsplash.com/photo-1544634076-a90160bcaf7b?q=80&w=1000&auto=format&fit=crop' },
        { id: 'culture', label: 'Culture', icon: Compass, desc: 'Arts, crafts & living history', image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1000&auto=format&fit=crop' },
        { id: 'food', label: 'Food', icon: Sparkles, desc: 'Authentic flavors & street trails', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop' },
        { id: 'wellness', label: 'Wellness', icon: Compass, desc: 'Healing, yoga & rejuvenation', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop' },
        { id: 'adventure', label: 'Adventure', icon: Compass, desc: 'Thrills, treks & coastal action', image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=1000&auto=format&fit=crop' },
    ];

    // Step 2: Companion (Story: "...with my...")
    const companions = [
        { id: 'solo', label: 'Myself', icon: Users, desc: 'Soul searching journey' },
        { id: 'family', label: 'Family', icon: Users, desc: 'Safe & fun for all ages' },
        { id: 'friends', label: 'Friends', icon: Users, desc: 'Adventure & thrills' },
    ];

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else handleSearch();
    };

    const handleSearch = () => {
        navigate(`/map?intent=${preferences.intent}&companion=${preferences.companion}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 p-6 md:p-8">

                {/* Progress Indicators */}
                <div className="flex gap-2 mb-8 justify-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-black' : 'w-2 bg-gray-200'}`} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 text-center"
                        >
                            <h2 className="text-3xl font-display font-bold text-gray-900">What brings you to Tamil Nadu today?</h2>
                            <p className="text-gray-500 italic">“I want to experience...”</p>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {intents.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => updatePreference('intent', item.id)}
                                        className={`relative group h-64 rounded-2xl overflow-hidden text-left transition-all ${preferences.intent === item.id ? 'ring-4 ring-black ring-offset-2' : 'hover:shadow-lg'
                                            }`}
                                    >
                                        <img src={item.image} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-5 text-white">
                                            <item.icon className="w-6 h-6 mb-2 opacity-80" />
                                            <h3 className="text-xl font-bold font-display">{item.label}</h3>
                                            <p className="text-xs text-gray-300 font-medium opacity-80">{item.desc}</p>
                                        </div>
                                        {preferences.intent === item.id && (
                                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-1">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6 text-center"
                        >
                            <h2 className="text-3xl font-display font-bold text-gray-900">Who are you traveling with?</h2>
                            <p className="text-gray-500">I am traveling with...</p>

                            <div className="grid md:grid-cols-3 gap-4">
                                {companions.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => updatePreference('companion', item.id)}
                                        className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${preferences.companion === item.id
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                            : 'border-transparent bg-gray-50 hover:bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        <div className={`p-4 rounded-full ${preferences.companion === item.id ? 'bg-white/20' : 'bg-gray-100'}`}>
                                            <item.icon className={`w-8 h-8 ${preferences.companion === item.id ? 'text-emerald-600' : 'text-gray-400'}`} />
                                        </div>
                                        <span className="font-bold">{item.label}</span>
                                        <p className="text-xs text-gray-500">{item.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-display font-bold text-center text-gray-900">When are you going?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {['Today', 'Tomorrow', 'This Weekend'].map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => updatePreference('timeflow', time)}
                                        className={`p-6 rounded-2xl border-2 transition-all text-center font-bold ${preferences.timeflow === time
                                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                                            : 'border-transparent bg-gray-50 hover:bg-gray-100 text-gray-600'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 flex justify-end">
                    <Button
                        size="lg"
                        onClick={handleNext}
                        disabled={
                            (step === 1 && !preferences.intent) ||
                            (step === 2 && !preferences.companion) ||
                            (step === 3 && !preferences.timeflow)
                        }
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 rounded-full h-12 gap-2"
                    >
                        {step === 3 ? 'Find Experiences' : 'Next Step'}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
