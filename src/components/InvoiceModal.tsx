import { useEffect } from 'preact/hooks';

interface InvoiceProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: string;
        title: string;
        price: number;
        imageUrl: string;
        category: string;
    } | null;
}

export default function InvoiceModal({ isOpen, onClose, product }: InvoiceProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
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

    const invoiceNumber = `INV-${Date.now()}-${product.id}`;
    const currentDate = new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    // Placeholder QRIS image path - user will replace this
    const qrisImagePath = "/qris-payment.png";

    return (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div class="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold z-10"
                >
                    ✕
                </button>

                {/* Header */}
                <div class="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 p-6 rounded-t-2xl">
                    <h2 class="text-3xl font-bold text-white text-center">Invoice</h2>
                    <p class="text-white/90 text-center mt-1">{invoiceNumber}</p>
                </div>

                {/* Invoice Content */}
                <div class="p-6 space-y-6">

                    {/* Date */}
                    <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3">
                        <span class="text-gray-600 dark:text-gray-400">Tanggal</span>
                        <span class="font-semibold text-gray-900 dark:text-white">{currentDate}</span>
                    </div>

                    {/* Product Details */}
                    <div class="space-y-4">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Detail Produk</h3>

                        <div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                class="w-20 h-20 rounded-md object-cover"
                            />
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-900 dark:text-white">{product.title}</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                                <p class="text-sm text-gray-500 dark:text-gray-500 mt-1">ID: {product.id}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-lg font-bold text-primary">{formatPrice(product.price)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Total */}
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div class="flex justify-between items-center text-2xl font-bold">
                            <span class="text-gray-900 dark:text-white">Total</span>
                            <span class="text-primary">{formatPrice(product.price)}</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div class="space-y-4">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Metode Pembayaran</h3>

                        <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-2 border-primary/30">
                            <div class="text-center space-y-4">
                                <div class="inline-block bg-white dark:bg-gray-900 p-2 rounded-lg">
                                    <p class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scan QRIS</p>

                                    {/* QRIS Image - User will replace this */}
                                    <div class="bg-white p-4 rounded-lg">
                                        <img
                                            src={qrisImagePath}
                                            alt="QRIS Payment Code"
                                            class="w-64 h-64 mx-auto object-contain"
                                            onError={(e) => {
                                                // Fallback if image not found
                                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='16' fill='%236b7280'%3EQRIS Image%3C/text%3E%3C/svg%3E";
                                            }}
                                        />
                                    </div>

                                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
                                        Scan kode QR di atas dengan aplikasi pembayaran Anda
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <p class="text-sm text-yellow-800 dark:text-yellow-200">
                                <strong>⚠️ Catatan:</strong> Setelah pembayaran berhasil, silakan simpan bukti transfer dan hubungi admin untuk konfirmasi.
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div class="flex gap-3 pt-4">
                        <button
                            onClick={() => window.print()}
                            class="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        >
                            Print Invoice
                        </button>
                        <button
                            onClick={onClose}
                            class="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
