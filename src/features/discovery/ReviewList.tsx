import { Star } from 'lucide-react';

interface Review {
    id: number;
    user: string;
    date: string;
    rating: number;
    comment: string;
}

interface ReviewListProps {
    rating: number;
    count: number;
    reviews?: Review[];
}

// Mock Data fallbacks
const MOCK_REVIEWS = [
    { id: 1, user: "Sarah Jenkins", date: "October 2024", rating: 5, comment: "Absolutely breathtaking. The scale of the temple is unimagined until you see it in person. The night ceremony is a must-watch." },
    { id: 2, user: "David Chen", date: "September 2024", rating: 5, comment: "A spiritual journey like no other. The architecture is stunning and the guides were very knowledgeable." }
];

export default function ReviewList({ rating, count, reviews = MOCK_REVIEWS }: ReviewListProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold font-display text-gray-900 flex items-center gap-2">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                {rating} · {count} reviews
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
                                {review.user[0]}
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">{review.user}</p>
                                <p className="text-xs text-gray-500">{review.date}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            "{review.comment}"
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
