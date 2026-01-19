import { createContext, useContext, useState, ReactNode } from 'react';

export interface DiscoveryState {
    intent: string;
    companion: string;
    timeflow: string;
}

interface DiscoveryContextType {
    preferences: DiscoveryState;
    setPreferences: (prefs: DiscoveryState) => void;
    updatePreference: (key: keyof DiscoveryState, value: string) => void;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<DiscoveryState>({
        intent: '',
        companion: '',
        timeflow: ''
    });

    const updatePreference = (key: keyof DiscoveryState, value: string) => {
        setPreferences(prev => ({ ...prev, [key]: value }));
    };

    return (
        <DiscoveryContext.Provider value={{ preferences, setPreferences, updatePreference }}>
            {children}
        </DiscoveryContext.Provider>
    );
}

export function useDiscovery() {
    const context = useContext(DiscoveryContext);
    if (context === undefined) {
        throw new Error('useDiscovery must be used within a DiscoveryProvider');
    }
    return context;
}
