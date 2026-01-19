import { useState, useCallback } from 'react';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export function useChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your Go2Tour guide. Ask me anything about Tamil Nadu!",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate network delay using Promise
        await new Promise(resolve => setTimeout(resolve, 1500));

        const aiResponse = generateMockResponse(text);

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            text: aiResponse,
            sender: 'ai',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    }, []);

    return {
        isOpen,
        toggleChat,
        messages,
        sendMessage,
        isTyping
    };
}

// Simple heuristic-based mock responses
function generateMockResponse(input: string): string {
    const lower = input.toLowerCase();

    if (lower.includes('temple') || lower.includes('madurai')) {
        return "The Meenakshi Amman Temple in Madurai is a architectural marvel! It has 14 gopurams (gateway towers) and thousands of sculptures. Would you like directions?";
    }
    if (lower.includes('food') || lower.includes('eat')) {
        return "You must try Chettinad chicken and filter coffee! Murugan Idli Shop is also famous for their fluffy idlis.";
    }
    if (lower.includes('beach') || lower.includes('chennai')) {
        return "Marina Beach in Chennai is one of the longest urban beaches in the world. For a cleaner vibe, try Besant Nagar (Elliot's) Beach.";
    }
    if (lower.includes('ooty') || lower.includes('hill')) {
        return "Ooty is beautiful this time of year. Don't miss the Nilgiri Mountain Railway toy train ride!";
    }

    return "That sounds interesting! I can help you plan a trip there. Tell me more about what you're looking for - temples, food, or nature?";
}
