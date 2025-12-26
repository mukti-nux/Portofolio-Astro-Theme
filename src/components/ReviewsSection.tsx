import type { Review } from '../data/productShop';

interface ReviewsSectionProps {
    reviews: Review[];
    averageRating: number;
}

export default function ReviewsSection({ reviews, averageRating }: ReviewsSectionProps) {
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} class="text-yellow-400">★</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half" class="text-yellow-400">☆</span>);
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} class="text-gray-300 dark:text-gray-600">★</span>);
        }
        return stars;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div class="space-y-6">
            {/* Header with Average Rating */}
            <div class="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div class="text-center">
                    <div class="text-4xl font-bold text-gray-900 dark:text-white">
                        {averageRating.toFixed(1)}
                    </div>
                    <div class="flex text-xl mt-1">{renderStars(averageRating)}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {reviews.length} ulasan
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <div class="space-y-4">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div
                            key={review.id}
                            class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                        >
                            <div class="flex items-start justify-between mb-2">
                                <div class="flex items-center gap-3">
                                    {/* Avatar */}
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-semibold">
                                        {review.userName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div class="font-semibold text-gray-900 dark:text-white">
                                            {review.userName}
                                        </div>
                                        <div class="text-sm text-gray-500 dark:text-gray-400">
                                            {formatDate(review.date)}
                                        </div>
                                    </div>
                                </div>
                                <div class="flex text-lg">{renderStars(review.rating)}</div>
                            </div>
                            <p class="text-gray-700 dark:text-gray-300 mt-2">
                                {review.comment}
                            </p>
                        </div>
                    ))
                ) : (
                    <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                        Belum ada ulasan untuk produk ini
                    </div>
                )}
            </div>
        </div>
    );
}
