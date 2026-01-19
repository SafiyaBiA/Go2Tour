import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { MapPin, Star, Navigation } from 'lucide-react';

// Fix for default marker icon in Leaflet with Vite/Webpack
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = new Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const destinations = [
    { id: 1, name: "Meenakshi Temple", location: "Madurai", position: [9.9195, 78.1193], rating: 4.9, type: "Heritage" },
    { id: 2, name: "Shore Temple", location: "Mahabalipuram", position: [12.6162, 80.1928], rating: 4.8, type: "Heritage" },
    { id: 3, name: "Ooty Hill Station", location: "Nilgiris", position: [11.4102, 76.6950], rating: 4.7, type: "Nature" },
];

export default function MapView() {
    const position: [number, number] = [11.1271, 78.6569];

    return (
        <div className="relative h-[calc(100vh-80px)] w-full">
            {/* Premium Header Card */}
            <div className="absolute top-6 left-6 right-6 z-[1000] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 p-6 max-w-md">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl">
                        <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-display font-bold text-gray-900">Explore Tamil Nadu</h2>
                        <p className="text-sm text-gray-500">Discover {destinations.length} amazing places</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">
                        Heritage
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">
                        Nature
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-sm font-medium transition-colors">
                        Food
                    </button>
                </div>
            </div>

            {/* Map */}
            <MapContainer
                center={position}
                zoom={7}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                className="rounded-3xl overflow-hidden"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {destinations.map((dest) => (
                    <Marker key={dest.id} position={dest.position as [number, number]} icon={defaultIcon}>
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="font-display font-bold text-base text-gray-900">{dest.name}</h3>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3" />
                                            {dest.location}
                                        </p>
                                    </div>
                                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
                                        {dest.type}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 mb-3">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-gray-900">{dest.rating}</span>
                                </div>
                                <button className="w-full px-3 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <Navigation className="w-4 h-4" />
                                    Get Directions
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Bottom Legend */}
            <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 p-4">
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Heritage</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Nature</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Food</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
