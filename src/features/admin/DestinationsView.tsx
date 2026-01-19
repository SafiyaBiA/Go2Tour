import { Plus, MoreVertical, Search } from 'lucide-react';

const DESTINATIONS = [
    { id: 1, name: 'Meenakshi Temple', location: 'Madurai', category: 'Temple', rating: 4.9, status: 'Active' },
    { id: 2, name: 'Marina Beach', location: 'Chennai', category: 'Nature', rating: 4.5, status: 'Active' },
    { id: 3, name: 'Brihadeeswarar Temple', location: 'Thanjavur', category: 'Temple', rating: 5.0, status: 'Active' },
    { id: 4, name: 'Ooty Botanical Gardens', location: 'Ooty', category: 'Nature', rating: 4.7, status: 'Seasonal' },
];

export default function DestinationsView() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Destinations</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    <Plus className="w-5 h-5" />
                    Add Destination
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Table Actions */}
                <div className="p-4 border-b border-gray-100 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                        />
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Rating</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {DESTINATIONS.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 text-gray-600">{item.location}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{item.rating} / 5.0</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 border-t border-gray-100 text-center text-xs text-gray-500">
                    Showing 4 of 42 results
                </div>
            </div>
        </div>
    );
}
