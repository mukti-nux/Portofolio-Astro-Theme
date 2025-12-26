import { useEffect, useState } from 'preact/hooks';

interface PaymentMethodModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: string;
        title: string;
        price: number;
        imageUrl: string;
        category: string;
        stock: number;
    } | null;
    onProceedToInvoice: (data: {
        paymentMethod: 'qris' | 'midtrans';
        quantity: number;
        totalPrice: number;
    }) => void;
}

export default function PaymentMethodModal({
    isOpen,
    onClose,
    product,
    onProceedToInvoice,
}: PaymentMethodModalProps) {
    const [paymentMethod, setPaymentMethod] = useState<'qris' | 'midtrans'>('qris');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Reset to defaults when modal opens
            setPaymentMethod('qris');
            setQuantity(1);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Detect if product is VPS/Hosting for duration input
    const isVPSProduct =
        product.category.toLowerCase().includes('vps') ||
        product.category.toLowerCase().includes('hosting') ||
        product.category.toLowerCase().includes('server');

    const quantityLabel = isVPSProduct ? 'Durasi (Bulan)' : 'Jumlah';
    const totalPrice = product.price * quantity;

    const handleQuantityChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const value = parseInt(target.value) || 1;
        // Minimum 1, maximum stock for digital products (no limit for VPS)
        const maxQuantity = isVPSProduct ? 999 : product.stock;
        setQuantity(Math.max(1, Math.min(value, maxQuantity)));
    };

    const handleProceed = () => {
        if (paymentMethod === 'midtrans') {
            // Don't proceed if Midtrans is selected (maintenance)
            return;
        }

        onProceedToInvoice({
            paymentMethod,
            quantity,
            totalPrice,
        });
    };

    return (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm">
            <div class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold z-10"
                >
                    ✕
                </button>

                {/* Header */}
                <div class="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-4 sm:p-6 rounded-t-2xl">
                    <h2 class="text-2xl sm:text-3xl font-bold text-white text-center">
                        Pilih Metode Pembayaran
                    </h2>
                </div>

                {/* Content */}
                <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Product Summary */}
                    <div class="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                        <div class="flex items-start gap-3">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                class="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover flex-shrink-0"
                            />
                            <div class="flex-1 min-w-0">
                                <h3 class="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                                    {product.title}
                                </h3>
                                <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                    {product.category}
                                </p>
                                <p class="text-sm sm:text-base font-bold text-primary mt-1">
                                    {formatPrice(product.price)}
                                    {isVPSProduct && <span class="text-xs font-normal"> /bulan</span>}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quantity/Duration Input */}
                    <div class="space-y-2">
                        <label class="block text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                            {quantityLabel}
                        </label>
                        <div class="flex items-center gap-3">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-bold text-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onInput={handleQuantityChange}
                                min="1"
                                max={isVPSProduct ? 999 : product.stock}
                                class="flex-1 text-center px-4 py-2 sm:py-3 text-lg sm:text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={() =>
                                    setQuantity(
                                        Math.min(
                                            isVPSProduct ? 999 : product.stock,
                                            quantity + 1
                                        )
                                    )
                                }
                                class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-bold text-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                            >
                                +
                            </button>
                        </div>
                        {!isVPSProduct && (
                            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                Stok tersedia: {product.stock}
                            </p>
                        )}
                    </div>

                    {/* Payment Method Selection */}
                    <div class="space-y-3">
                        <label class="block text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                            Metode Pembayaran
                        </label>

                        {/* Payment Method Tabs */}
                        <div class="flex gap-2 sm:gap-3">
                            <button
                                onClick={() => setPaymentMethod('qris')}
                                class={`flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${paymentMethod === 'qris'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                💳 QRIS
                            </button>
                            <button
                                onClick={() => setPaymentMethod('midtrans')}
                                class={`flex-1 px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${paymentMethod === 'midtrans'
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    }`}
                            >
                                🏦 Midtrans
                            </button>
                        </div>

                        {/* Payment Method Info */}
                        {paymentMethod === 'qris' && (
                            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4">
                                <p class="text-xs sm:text-sm text-blue-800 dark:text-blue-200">
                                    ✓ Pembayaran via QRIS tersedia. Anda akan melihat kode QR setelah melanjutkan.
                                </p>
                            </div>
                        )}

                        {paymentMethod === 'midtrans' && (
                            <div class="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg border-2 border-gray-300 dark:border-gray-600">
                                <div class="text-center space-y-2">
                                    <div class="text-4xl sm:text-5xl">🔧</div>
                                    <h4 class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                                        Sedang Maintenance
                                    </h4>
                                    <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                                        Metode pembayaran Midtrans sedang dalam perbaikan. Silakan gunakan QRIS.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Total Price */}
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div class="flex justify-between items-center">
                            <span class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                                Total Pembayaran
                            </span>
                            <span class="text-xl sm:text-2xl font-bold text-primary">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                        {quantity > 1 && (
                            <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 text-right">
                                {formatPrice(product.price)} × {quantity} {isVPSProduct ? 'bulan' : 'item'}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                        <button
                            onClick={onClose}
                            class="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm sm:text-base"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleProceed}
                            disabled={paymentMethod === 'midtrans'}
                            class={`flex-1 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base ${paymentMethod === 'midtrans'
                                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                    : 'bg-primary text-white hover:bg-primary/90'
                                }`}
                        >
                            {paymentMethod === 'midtrans' ? 'Tidak Tersedia' : 'Lanjutkan ke Invoice'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
