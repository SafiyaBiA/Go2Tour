import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Bus, Train, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransportView() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-display font-bold text-gray-900">Seamless Mobility</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Compare and book the best travel options across Tamil Nadu. From local cabs to intercity trains.
                </p>
            </div>

            <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
                <Tabs defaultValue="cabs" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100/80 p-1.5 rounded-xl h-auto">
                        <TabsTrigger value="cabs" className="py-3 text-base rounded-lg data-[state=active]:shadow-md transition-all">
                            <Car className="w-5 h-5 mr-2" />
                            Cabs & Auto
                        </TabsTrigger>
                        <TabsTrigger value="buses" className="py-3 text-base rounded-lg data-[state=active]:shadow-md transition-all">
                            <Bus className="w-5 h-5 mr-2" />
                            Buses
                        </TabsTrigger>
                        <TabsTrigger value="trains" className="py-3 text-base rounded-lg data-[state=active]:shadow-md transition-all">
                            <Train className="w-5 h-5 mr-2" />
                            Trains
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="cabs" className="space-y-4 focus-visible:ring-0">
                        {/* Cab Options */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {['Uber', 'Ola', 'FastTrack'].map((provider) => (
                                <div key={provider} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-emerald-200 hover:shadow-lg transition-all group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-xs">
                                            LOGO
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{provider}</h3>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> 4 min away
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-lg text-emerald-700">₹350</p>
                                        <p className="text-xs text-gray-400">Est. fare</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-emerald-50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
                            <div>
                                <h4 className="font-bold text-emerald-900">Book Directly</h4>
                                <p className="text-emerald-700 text-sm">We'll redirct you to the provider App.</p>
                            </div>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8">
                                Compare Prices
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="buses" className="space-y-4 focus-visible:ring-0">
                        {/* Bus Routes Mock */}
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-indigo-200 transition-all">
                                    <div className="flex items-center gap-6 w-full md:w-auto">
                                        <div className="text-center min-w-[60px]">
                                            <p className="font-bold text-2xl text-gray-900">10:00</p>
                                            <p className="text-xs text-gray-500">AM</p>
                                        </div>
                                        <div className="flex-1 md:flex-none flex flex-col items-center px-4 relative">
                                            <div className="w-full h-[2px] bg-gray-200 absolute top-1/2 -z-10"></div>
                                            <span className="text-xs text-gray-400 bg-white px-2">4h 30m</span>
                                            <Bus className="w-5 h-5 text-indigo-600 mt-1" />
                                        </div>
                                        <div className="text-center min-w-[60px]">
                                            <p className="font-bold text-2xl text-gray-900">02:30</p>
                                            <p className="text-xs text-gray-500">PM</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between w-full md:w-auto gap-8">
                                        <div className="text-left">
                                            <p className="font-bold text-gray-900">Chennai - Madurai</p>
                                            <p className="text-sm text-gray-500">SETC AC Sleeper</p>
                                        </div>
                                        <Button variant="outline" className="rounded-full">View Seats</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="trains" className="space-y-4 focus-visible:ring-0">
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                            <Train className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="font-bold text-gray-900">Integration in Progress</h3>
                            <p className="text-gray-500 max-w-md mx-auto mt-2">
                                Real-time train tracking and IRCTC booking integration is coming soon.
                            </p>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
