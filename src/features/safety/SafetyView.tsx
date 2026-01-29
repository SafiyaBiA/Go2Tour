import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, Shield, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { SafetyService, IncidentReport } from '@/services/SafetyService';

export default function SafetyView() {
    // const [isSOSActive, setIsSOSActive] = useState(false);
    const [sosStatus, setSosStatus] = useState<'idle' | 'detecting' | 'sent'>('idle');
    const [reportOpen, setReportOpen] = useState(false);
    const [reportType, setReportType] = useState('theft');
    const [description, setDescription] = useState('');

    const handleSOS = async () => {
        // setIsSOSActive(true); 
        setSosStatus('detecting');

        // Simulate location lock and sending
        setTimeout(async () => {
            await SafetyService.sendSOS({ lat: 13.0827, lng: 80.2707 }); // Chennai coords
            setSosStatus('sent');
        }, 2000);
    };

    const handleReportSubmit = async () => {
        const report: IncidentReport = {
            type: reportType as any,
            description,
            location: {
                lat: 13.0827, // Mock
                lng: 80.2707, // Mock
                address: 'Current Location'
            },
            timestamp: new Date().toISOString()
        };
        await SafetyService.reportIncident(report);
        setReportOpen(false);
        setDescription('');
    };

    return (
        <div className="pb-24 min-h-screen bg-stone-50">
            {/* Header */}
            <div className="bg-white px-6 pt-12 pb-16 rounded-b-[40px] shadow-sm text-center">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-50 text-emerald-600 rounded-full mb-6 border border-emerald-100">
                    <Shield className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-3 tracking-tight">Travel with Confidence</h1>
                <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                    Tamil Nadu welcomes you with open arms. We're here to ensure your journey is as safe as it is beautiful.
                </p>
            </div>

            <div className="max-w-md mx-auto px-6 -mt-8 space-y-6">

                {/* Visual Status Card */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">CURRENT STATUS</p>
                        <p className="text-emerald-600 font-bold text-lg flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Normal
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">NEARBY</p>
                        <p className="text-gray-900 font-bold">Tourist Police (2km)</p>
                    </div>
                </div>

                {/* Main SOS Action */}
                <div className="text-center py-8">
                    <motion.div
                        whileTap={{ scale: 0.95 }}
                        className="relative inline-block"
                    >
                        {sosStatus === 'idle' && (
                            <button
                                onClick={handleSOS}
                                className="w-48 h-48 rounded-full bg-gradient-to-br from-red-50 to-red-100 border-4 border-red-500/20 flex flex-col items-center justify-center shadow-2xl shadow-red-200"
                            >
                                <div className="w-32 h-32 rounded-full bg-red-500 flex items-center justify-center shadow-inner">
                                    <Phone className="w-12 h-12 text-white fill-current" />
                                </div>
                                <span className="mt-4 font-bold text-red-600 tracking-wider">TAP FOR HELP</span>
                            </button>
                        )}

                        {sosStatus === 'detecting' && (
                            <div className="w-48 h-48 rounded-full bg-red-50 border-4 border-red-500 flex flex-col items-center justify-center animate-pulse">
                                <span className="text-red-600 font-bold">Locating...</span>
                            </div>
                        )}

                        {sosStatus === 'sent' && (
                            <div className="w-48 h-48 rounded-full bg-emerald-50 border-4 border-emerald-500 flex flex-col items-center justify-center">
                                <CheckCircle className="w-16 h-16 text-emerald-500 mb-2" />
                                <span className="text-emerald-700 font-bold">Help Sent</span>
                            </div>
                        )}
                    </motion.div>
                    <p className="text-xs text-gray-400 mt-6 max-w-xs mx-auto">
                        Pressing this will instantly share your live location with local authorities and our 24/7 support team.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setReportOpen(true)} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left">
                        <AlertTriangle className="w-6 h-6 text-orange-500 mb-3" />
                        <h3 className="font-bold text-gray-900">Report Incident</h3>
                        <p className="text-xs text-gray-500 mt-1">Harassment, Theft, Loss</p>
                    </button>
                    <button className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left">
                        <MapPin className="w-6 h-6 text-blue-500 mb-3" />
                        <h3 className="font-bold text-gray-900">Share Journey</h3>
                        <p className="text-xs text-gray-500 mt-1">Send tracking link</p>
                    </button>
                </div>

                {/* Nearby Services */}
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Nearby Confidence Zones</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                                <Shield className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900">B-2 Police Station, Madurai</p>
                                <p className="text-xs text-gray-500">Distance: 1.2km • 24/7 Active</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-red-50 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-gray-900">Apollo Hospital (Emergency)</p>
                                <p className="text-xs text-gray-500">Distance: 3.5km • Critical Care Ready</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Emergency Numbers */}
                <div className="bg-stone-900 text-white p-8 rounded-[2.5rem]">
                    <h3 className="font-bold mb-6 text-stone-400 uppercase tracking-widest text-xs">Always Within Reach</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                            <div>
                                <p className="text-xs text-stone-400">Police Assistance</p>
                                <p className="font-display font-bold text-lg">100 / 112</p>
                            </div>
                            <Button size="sm" className="bg-white text-black hover:bg-stone-200 rounded-full px-6">Call</Button>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                            <div>
                                <p className="text-xs text-stone-400">Medical Emergency</p>
                                <p className="font-display font-bold text-lg">108</p>
                            </div>
                            <Button size="sm" className="bg-white text-black hover:bg-stone-200 rounded-full px-6">Call</Button>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                            <div>
                                <p className="text-xs text-stone-400">Tourist Support</p>
                                <p className="font-display font-bold text-lg">1363</p>
                            </div>
                            <Button size="sm" className="bg-white text-black hover:bg-stone-200 rounded-full px-6">Call</Button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Report Dialog */}
            <Dialog open={reportOpen} onOpenChange={setReportOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Report an Incident</DialogTitle>
                        <DialogDescription>
                            Your safety is our priority. Please describe the issue.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Incident Type</Label>
                            <div className="flex gap-2">
                                {['Theft', 'Harassment', 'Health', 'Other'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setReportType(type.toLowerCase())}
                                        className={`px-3 py-1 text-sm rounded-full border ${reportType === type.toLowerCase()
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-600 border-gray-200'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea
                                className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-black"
                                rows={4}
                                placeholder="Tell us what happened..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setReportOpen(false)}>Cancel</Button>
                        <Button onClick={handleReportSubmit}>Submit Report</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
