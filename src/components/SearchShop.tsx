import { useEffect, useRef, useState } from 'preact/hooks';
import Fuse from 'fuse.js';
import productShop from '../data/productShop';
import ShopCard from './ShopCard';
import InvoiceModal from './InvoiceModal';

export default function SearchShop() {
    const [results, setResults] = useState(productShop);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const fuse = new Fuse(productShop, {
        keys: ['title', 'description', 'category', 'id'],
        threshold: 0.3,
    });

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        const handleInput = () => {
            const keyword = input.value.trim();
            if (!keyword) {
                setResults(productShop);
            } else {
                const res = fuse.search(keyword).map(r => r.item);
                setResults(res);
            }
        };

        input.addEventListener('input', handleInput);
        return () => input.removeEventListener('input', handleInput);
    }, []);

    const handleBuyClick = (productId: string) => {
        const product = productShop.find(p => p.id === productId);
        if (product) {
            setSelectedProduct(product);
            setIsInvoiceOpen(true);
        }
    };

    const handleCloseInvoice = () => {
        setIsInvoiceOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div>
            <div className="relative max-w-xl mx-auto mb-10">
                {/* Placeholder buatan */}
                <div
                    className="absolute inset-0 px-5 py-3 pointer-events-none text-gray-400 dark:text-gray-500 flex items-center text-sm sm:text-base leading-none"
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
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary placeholder-transparent"
                />
            </div>

            <div className="flex flex-col items-center space-y-10">
                {results.length > 0 ? (
                    results.map((product) => (
                        <ShopCard
                            key={product.id}
                            {...product}
                            onBuyClick={handleBuyClick}
                        />
                    ))
                ) : (
                    <div className="text-center py-20">
                        <p className="text-2xl text-gray-500 dark:text-gray-400">
                            🔍 Produk tidak ditemukan
                        </p>
                        <p className="text-gray-400 dark:text-gray-500 mt-2">
                            Coba kata kunci lain
                        </p>
                    </div>
                )}
            </div>

            {/* Invoice Modal */}
            <InvoiceModal
                isOpen={isInvoiceOpen}
                onClose={handleCloseInvoice}
                product={selectedProduct}
            />
        </div>
    );
}
