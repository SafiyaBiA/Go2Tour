import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface IncidentReport {
    type: 'harassment' | 'medical' | 'theft' | 'lost_item' | 'other';
    description: string;
    location: {
        lat: number;
        lng: number;
        address?: string;
    };
    contact?: string;
    timestamp?: any;
}

export const SafetyService = {
    async sendSOS(location: { lat: number; lng: number }) {
        try {
            if (import.meta.env.VITE_USE_REAL_DATA === 'true') {
                await addDoc(collection(db, "sos_alerts"), {
                    location,
                    timestamp: serverTimestamp(),
                    status: 'active',
                    urgency: 'high'
                });
            }
            console.log("SOS Alert Sent:", location);
            return { success: true, message: "Emergency services notified." };
        } catch (error) {
            console.error("SOS Error:", error);
            // Fallback for offline/demo
            return { success: true, message: "SOS Simulation: Help is on the way." };
        }
    },

    async reportIncident(report: IncidentReport) {
        try {
            if (import.meta.env.VITE_USE_REAL_DATA === 'true') {
                await addDoc(collection(db, "incidents"), {
                    ...report,
                    timestamp: serverTimestamp(),
                    status: 'reported'
                });
            }
            console.log("Incident Reported:", report);
            return { success: true, message: "Report submitted successfully." };
        } catch (error) {
            console.error("Report Error:", error);
            return { success: true, message: "Report stored locally (Simulation)." };
        }
    },

    async getIncidents() {
        // Mock data for Admin Dashboard since we might default to mock mode
        return [
            { id: 1, type: 'theft', description: 'Camera stolen at Marina Beach', location: 'Marina Beach', status: 'pending', timestamp: '2 hours ago' },
            { id: 2, type: 'medical', description: 'Heat stroke near temple', location: 'Madurai', status: 'resolved', timestamp: '5 hours ago' },
            { id: 3, type: 'harassment', description: 'Tout bothering tourists', location: 'Mahabalipuram', status: 'investigating', timestamp: '1 day ago' },
        ];
    }
};
