interface ShopProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    stock: number;
    rating: number;
}

export default function ShopCard({
    id,
    title,
    description,
    imageUrl,
    price,
    category,
    stock,
    rating
}: ShopProps) {

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

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

    const handleViewProduct = () => {
        // Navigate to product showcase page
        window.location.href = `/ProductShowcase?id=${id}`;
    };

    return (
        <div class="relative w-full max-w-2xl mx-auto mt-8 sm:mt-16 px-2 sm:px-0">
            <div class="absolute inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                  bg-[length:200%_200%] bg-[position:0%_50%] blur-lg opacity-80 rounded-xl z-[-1]"></div>

            <div class="relative rounded-xl p-4 sm:p-6 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 border border-transparent hover:border-[3px] hover:border-[rgb(0,255,255)] group overflow-hidden">

                {/* Mobile Layout (< sm) */}
                <div class="flex flex-col sm:hidden space-y-4">
                    {/* Product Image */}
                    <div class="relative w-full">
                        <img
                            src={imageUrl}
                            alt={`Product ${title}`}
                            class="w-full h-48 rounded-md object-cover"
                        />
                        {stock < 5 && stock > 0 && (
                            <div class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Low Stock
                            </div>
                        )}
                        {stock === 0 && (
                            <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Sold Out
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div class="flex flex-col space-y-3">
                        <div>
                            <span class="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-2">
                                {category}
                            </span>
                            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                        </div>

                        <p class="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{description}</p>

                        {/* Rating */}
                        <div class="flex items-center gap-2">
                            <div class="flex">{renderStars(rating)}</div>
                            <span class="text-sm text-gray-600 dark:text-gray-400">({rating})</span>
                        </div>

                        {/* Price and Button */}
                        <div class="flex items-center justify-between pt-2">
                            <div class="text-2xl font-bold text-primary">
                                {formatPrice(price)}
                            </div>
                            <button
                                onClick={handleViewProduct}
                                disabled={stock === 0}
                                class={`btn-sound relative inline-flex h-10 items-center justify-center px-5 rounded-full font-semibold 
                     border-2 transition duration-300 text-sm ${stock === 0
                                        ? 'bg-gray-400 border-gray-400 text-gray-200 cursor-not-allowed'
                                        : 'bg-primary text-white border-[rgb(59,130,246)] animate-hover-rgb-shadow hover:scale-105'
                                    }`}
                            >
                                {stock === 0 ? 'SOLD OUT' : 'VIEW'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Layout (>= sm) */}
                <div class="hidden sm:flex sm:flex-row items-center sm:items-start space-x-6">
                    {/* Product Image */}
                    <div class="relative flex-shrink-0">
                        <img
                            src={imageUrl}
                            alt={`Product ${title}`}
                            class="w-32 h-32 rounded-md object-cover"
                        />
                        {stock < 5 && stock > 0 && (
                            <div class="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Low Stock
                            </div>
                        )}
                        {stock === 0 && (
                            <div class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                Sold Out
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div class="flex flex-col flex-1 w-full">
                        <div class="flex items-start justify-between mb-2">
                            <div>
                                <span class="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full mb-2">
                                    {category}
                                </span>
                                <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                            </div>
                        </div>

                        <p class="text-gray-700 dark:text-gray-300 mb-3">{description}</p>

                        {/* Rating */}
                        <div class="flex items-center gap-2 mb-3">
                            <div class="flex">{renderStars(rating)}</div>
                            <span class="text-sm text-gray-600 dark:text-gray-400">({rating})</span>
                        </div>

                        {/* Price and Button */}
                        <div class="flex items-center justify-between mt-auto">
                            <div class="text-3xl font-bold text-primary">
                                {formatPrice(price)}
                            </div>
                            <button
                                onClick={handleViewProduct}
                                disabled={stock === 0}
                                class={`btn-sound relative inline-flex h-11 items-center justify-center px-6 rounded-full font-semibold 
                     border-2 transition duration-300 ${stock === 0
                                        ? 'bg-gray-400 border-gray-400 text-gray-200 cursor-not-allowed'
                                        : 'bg-primary text-white border-[rgb(59,130,246)] animate-hover-rgb-shadow hover:scale-105'
                                    }`}
                            >
                                {stock === 0 ? 'SOLD OUT' : 'VIEW PRODUCT'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
