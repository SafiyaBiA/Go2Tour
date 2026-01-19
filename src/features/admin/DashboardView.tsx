import { useEffect, useState } from "react";
import { Users, Calendar, AlertTriangle, DollarSign } from "lucide-react";
import { SafetyService } from "@/services/SafetyService";

export default function DashboardView() {
    const [stats] = useState({
        users: 12450,
        bookings: 843,
        revenue: '₹12.4L',
        safeScore: 98
    });
    const [incidents, setIncidents] = useState<any[]>([]);

    useEffect(() => {
        const loadData = async () => {
            // In a real scenario, we might want to catch errors here
            try {
                const data = await SafetyService.getIncidents();
                setIncidents(data);
            } catch (e) {
                console.error("Failed to load incidents", e);
            }
        };
        loadData();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-display font-bold text-gray-900">Platform Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={Users}
                    label="Total Users"
                    value={stats.users.toLocaleString()}
                    trend="+12%"
                    color="bg-blue-50 text-blue-600"
                />
                <StatCard
                    icon={Calendar}
                    label="Active Bookings"
                    value={stats.bookings.toString()}
                    trend="+5%"
                    color="bg-purple-50 text-purple-600"
                />
                <StatCard
                    icon={DollarSign}
                    label="Total Revenue"
                    value={stats.revenue}
                    trend="+18%"
                    color="bg-emerald-50 text-emerald-600"
                />
                <StatCard
                    icon={AlertTriangle}
                    label="Active Incidents"
                    value={incidents.length.toString()}
                    trend={incidents.length > 0 ? "-2%" : "Safe"}
                    color="bg-orange-50 text-orange-600"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Incidents Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-gray-900">Safety & Incident Log</h3>
                        <span className="text-sm text-gray-500">Real-time updates</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-sm text-gray-500">
                                    <th className="pb-3 font-medium">Type</th>
                                    <th className="pb-3 font-medium">Location</th>
                                    <th className="pb-3 font-medium">Status</th>
                                    <th className="pb-3 font-medium">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {incidents.map((inc) => (
                                    <tr key={inc.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="py-4 capitalize font-medium text-gray-900">{inc.type}</td>
                                        <td className="py-4 text-gray-600">{inc.location}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${inc.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                                                inc.status === 'investigating' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-orange-100 text-orange-700'
                                                }`}>
                                                {inc.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-gray-400 text-sm">{inc.timestamp}</td>
                                    </tr>
                                ))}
                                {incidents.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-gray-500">No active incidents reported.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Destinations (Quick Mock) */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-6">Trending Locations</h3>
                    <div className="space-y-4">
                        {[
                            { name: 'Meenakshi Temple', views: '12.5k', trend: 85 },
                            { name: 'Ooty Lake', views: '10.2k', trend: 72 },
                            { name: 'Marina Beach', views: '9.8k', trend: 64 },
                            { name: 'Dhanushkodi', views: '8.4k', trend: 45 },
                        ].map((place) => (
                            <div key={place.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-gray-700">{place.name}</span>
                                    <span className="text-gray-500">{place.views}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${place.trend}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon: Icon, label, value, trend, color }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-lg">
                    {trend}
                </span>
            </div>
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    );
}
