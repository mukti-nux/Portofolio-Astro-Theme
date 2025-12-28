import { useEffect, useRef, useState } from 'preact/hooks';
import Fuse from 'fuse.js';
import { productService } from '../services/productService';
import type { ShopItem } from '../data/productShop';
import ShopCard from './ShopCard';

export default function SearchShop() {
    const [allProducts, setAllProducts] = useState<ShopItem[]>([]);
    const [results, setResults] = useState<ShopItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const fuseRef = useRef<Fuse<ShopItem> | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const products = await productService.getAllProducts();
            setAllProducts(products);
            setResults(products);

            fuseRef.current = new Fuse(products, {
                keys: ['title', 'description', 'category', 'id'],
                threshold: 0.3,
            });
            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        const handleInput = () => {
            const keyword = input.value.trim();
            if (!keyword) {
                setResults(allProducts);
            } else if (fuseRef.current) {
                const res = fuseRef.current.search(keyword).map(r => r.item);
                setResults(res);
            }
        };

        input.addEventListener('input', handleInput);
        return () => input.removeEventListener('input', handleInput);
    }, [allProducts]);

    return (
        <div>
            <div className="relative max-w-xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
                {/* Placeholder buatan */}
                <div
                    className="absolute inset-0 px-4 sm:px-5 py-2 sm:py-3 pointer-events-none text-gray-400 dark:text-gray-500 flex items-center text-xs sm:text-sm md:text-base leading-none"
                    id="fakePlaceholder"
                >
                    Cari produk apa?, <span id="scrambleText" className="font-semibold text-primary ml-1">Template Keren</span>...?
                </div>

                {/* Input asli */}
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    id="realInput"
                    className="w-full px-4 sm:px-5 py-2 sm:py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary placeholder-transparent text-sm sm:text-base"
                />
            </div>

            <div className="flex flex-col items-center space-y-6 sm:space-y-10">
                {isLoading ? (
                    <div className="text-center py-12 sm:py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-500 dark:text-gray-400">Memuat produk...</p>
                    </div>
                ) : results.length > 0 ? (
                    results.map((product) => (
                        <ShopCard
                            key={product.id}
                            {...product}
                        />
                    ))
                ) : (
                    <div className="text-center py-12 sm:py-20">
                        <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400">
                            🔍 Produk tidak ditemukan
                        </p>
                        <p className="text-sm sm:text-base text-gray-400 dark:text-gray-500 mt-2">
                            Coba kata kunci lain
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
