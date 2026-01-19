import { useState, useRef, useEffect } from 'react';
import { MapPin, Info, Navigation, Scan, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function ARView() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasPermission, setHasPermission] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState<any>(null);

    // Mock AR Points
    const arPoints = [
        { id: 1, name: 'Shore Temple', distance: '150m', type: 'Heritage', description: 'Built in 700–728 AD, this structural temple overlooks the Bay of Bengal.', x: 50, y: 40 },
        { id: 2, name: 'Pancha Rathas', distance: '400m', type: 'Monument', description: 'Example of monolith Indian rock-cut architecture.', x: 20, y: 60 },
        { id: 3, name: 'Restroom', distance: '50m', type: 'Utility', description: 'Clean public facility.', x: 80, y: 70 },
    ];

    useEffect(() => {
        startCamera();
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setHasPermission(true);
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setHasPermission(false);
        }
    };

    return (
        <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-black">
            {!hasPermission ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                    <Scan className="w-16 h-16 mb-4 text-gray-500" />
                    <h2 className="text-2xl font-display font-bold mb-2">AR Camera Access</h2>
                    <p className="text-gray-400 mb-6">Enable camera access to see history come alive around you.</p>
                    <Button onClick={startCamera} className="bg-white text-black hover:bg-gray-200 rounded-full">
                        Enable Camera
                    </Button>
                </div>
            ) : (
                <>
                    {/* Camera Feed */}
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />

                    {/* AR Overlay UI */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white">
                                <p className="text-xs text-gray-300 uppercase tracking-widest">Current Location</p>
                                <p className="font-bold flex items-center gap-2"><MapPin className="w-4 h-4 text-orange-400" /> Mahabalipuram, TN</p>
                            </div>
                            <div className="flex gap-2 pointer-events-auto">
                                <Button size="icon" variant="secondary" className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 text-white border-0">
                                    <Info className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* AR Points (Simulated positioning) */}
                        {arPoints.map((point) => (
                            <motion.button
                                key={point.id}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border-2 border-white/50 flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform hover:bg-white hover:text-black group"
                                style={{ top: `${point.y}%`, left: `${point.x}%` }}
                                onClick={() => setSelectedPoint(point)}
                            >
                                <MapPin className="w-6 h-6 text-orange-400 group-hover:text-orange-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white whitespace-nowrap bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                                    {point.distance}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Selected Point Detail Card */}
                    <AnimatePresence>
                        {selectedPoint && (
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 100, opacity: 0 }}
                                className="absolute bottom-6 left-4 right-4 bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white/40 shadow-2xl z-20 pointer-events-auto"
                            >
                                <button
                                    onClick={() => setSelectedPoint(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-900"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="flex items-start gap-4 pr-6">
                                    <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                                        <MapPin className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold font-display">{selectedPoint.name}</h3>
                                        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium mb-2">{selectedPoint.type}</span>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-3">{selectedPoint.description}</p>
                                        <Button className="w-full rounded-full bg-black text-white hover:bg-gray-800">
                                            Start Navigation <Navigation className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}
        </div>
    );
}
