import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';
import { useDiscovery } from '@/context/DiscoveryContext';
import { useAuth } from '@/context/AuthContext';

interface Message {
    id: string;
    type: 'user' | 'ai';
    text: string;
    action?: {
        label: string;
        link: string;
    };
}

export default function AICompanion() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', type: 'ai', text: 'Vanakkam! I am your Tavil Nadu travel guide. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const { preferences } = useDiscovery();
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateContextPrompt = (userQuery: string) => {
        // This function builds the 'system prompt' logic (simulated for front-end logic)
        // based on the current app state.

        let context = `Current Page: ${location.pathname}. `;

        // Use userQuery to make it used
        context += `User Query: "${userQuery}". `;

        if (preferences.intent) {
            context += `User Intent: Interested in ${preferences.intent}. `;
        }
        if (preferences.companion) {
            context += `Traveling with: ${preferences.companion}. `;
        }
        if (user?.displayName) {
            context += `User Name: ${user.displayName}. `;
        }

        return context;
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Simulate Context-Aware AI Processing
        const context = generateContextPrompt(input);
        console.log("AI Context:", context); // For debug/demo

        setTimeout(() => {
            let responseText = "I can help you explore more of Tamil Nadu!";
            let action = undefined;

            // Simple keyword matching to simulate AI intelligence
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('temple') || preferences.intent === 'temples') {
                responseText = "Based on your interest in temples, I highly recommend visiting the Brihadisvara Temple in Thanjavur. It's a UNESCO World Heritage site and an architectural marvel.";
                action = { label: "View Thanjavur", link: "/map" };
            }
            else if (lowerInput.includes('food') || lowerInput.includes('eat')) {
                responseText = "You must try the authentic Chettinad cuisine. I can guide you to some hidden gems in Madurai known for their Idli and fiery curries.";
                action = { label: "Find Restaurants", link: "/map?filter=food" };
            }
            else if (location.pathname.includes('/map')) {
                responseText = "I see you're exploring the map. The green markers indicate eco-friendly spots. Would you like me to highlight nearby safety zones?";
            }

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: 'ai',
                text: responseText,
                action: action
            };

            setMessages(prev => [...prev, aiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Floating Trigger */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <Button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
                >
                    <Sparkles className="w-8 h-8 text-white" />
                </Button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="p-4 bg-indigo-900 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Travel Companion</h3>
                                    <p className="text-xs text-indigo-200">AI-Powered • Context Aware</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-white/10 text-white">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                                            }`}
                                    >
                                        <p>{msg.text}</p>
                                        {msg.action && (
                                            <a href={msg.action.link} className="mt-3 flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 p-2 rounded-lg hover:bg-indigo-100 transition-colors">
                                                <Navigation className="w-3 h-3" />
                                                {msg.action.label}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-sm shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask about places, safety, or food..."
                                    className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                                    autoFocus
                                />
                                <Button onClick={handleSend} size="icon" className="rounded-full bg-indigo-600 hover:bg-indigo-700">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
