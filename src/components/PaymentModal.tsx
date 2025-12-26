import { useEffect, useState } from 'preact/hooks';
import QRCode from 'qrcode';

interface PaymentModalProps {
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

interface PaymentData {
    id: string;
    invoiceNumber: string;
    qrString: string;
    amount: number;
    expiresAt: string;
}

export default function PaymentModal({ isOpen, onClose, product }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
    const [qrCodeImage, setQrCodeImage] = useState<string>('');
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'completed' | 'expired'>('pending');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (isOpen && product) {
            createPayment();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, product]);

    // Poll payment status
    useEffect(() => {
        if (!paymentData || paymentStatus !== 'pending') return;

        const interval = setInterval(async () => {
            await checkPaymentStatus();
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [paymentData, paymentStatus]);

    const createPayment = async () => {
        if (!product) return;

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/payment/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create payment');
            }

            setPaymentData(data.payment);

            // Generate QR code image from string
            const qrImage = await QRCode.toDataURL(data.payment.qrString, {
                width: 300,
                margin: 2,
            });
            setQrCodeImage(qrImage);
            setPaymentStatus('pending');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create payment');
            console.error('Payment creation error:', err);
        } finally {
            setLoading(false);
        }
    };

    const checkPaymentStatus = async () => {
        if (!paymentData) return;

        setPaymentStatus('checking');

        try {
            const response = await fetch(`/api/payment/status?qrId=${paymentData.id}`);
            const data = await response.json();

            if (data.success && data.status.isPaid) {
                setPaymentStatus('completed');
            } else {
                setPaymentStatus('pending');
            }
        } catch (err) {
            console.error('Status check error:', err);
            setPaymentStatus('pending');
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const currentDate = new Date().toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    if (!isOpen || !product) return null;

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
                    <h2 class="text-3xl font-bold text-white text-center">
                        {paymentStatus === 'completed' ? '✅ Pembayaran Berhasil!' : '💳 Invoice Pembayaran'}
                    </h2>
                    {paymentData && (
                        <p class="text-white/90 text-center mt-1">{paymentData.invoiceNumber}</p>
                    )}
                </div>

                {/* Content */}
                <div class="p-6 space-y-6">

                    {loading ? (
                        <div class="text-center py-12">
                            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
                            <p class="mt-4 text-gray-600 dark:text-gray-400">Membuat pembayaran...</p>
                        </div>
                    ) : error ? (
                        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p class="text-red-600 dark:text-red-400">❌ {error}</p>
                            <button
                                onClick={createPayment}
                                class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    ) : paymentStatus === 'completed' ? (
                        <div class="text-center py-8">
                            <div class="text-6xl mb-4">🎉</div>
                            <h3 class="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                                Pembayaran Berhasil!
                            </h3>
                            <p class="text-gray-600 dark:text-gray-400 mb-6">
                                Terima kasih atas pembelian Anda. Notifikasi telah dikirim ke admin.
                            </p>
                            <button
                                onClick={onClose}
                                class="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
                            >
                                Tutup
                            </button>
                        </div>
                    ) : (
                        <>
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

                            {/* QRIS Payment */}
                            {qrCodeImage && (
                                <div class="space-y-4">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Pembayaran QRIS</h3>

                                    <div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg border-2 border-primary/30">
                                        <div class="text-center space-y-4">
                                            <div class="inline-block bg-white p-4 rounded-lg">
                                                <img
                                                    src={qrCodeImage}
                                                    alt="QRIS Payment Code"
                                                    class="w-64 h-64 mx-auto"
                                                />
                                            </div>

                                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                                Scan kode QR di atas dengan aplikasi pembayaran Anda
                                            </p>

                                            {/* Payment Status Indicator */}
                                            <div class="flex items-center justify-center gap-2">
                                                {paymentStatus === 'checking' ? (
                                                    <>
                                                        <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                                        <span class="text-sm text-primary">Memeriksa pembayaran...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div class="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                                                        <span class="text-sm text-gray-600 dark:text-gray-400">Menunggu pembayaran...</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                        <p class="text-sm text-yellow-800 dark:text-yellow-200">
                                            <strong>⚠️ Catatan:</strong> Halaman akan otomatis update setelah pembayaran berhasil. Jangan tutup halaman ini!
                                        </p>
                                    </div>
                                </div>
                            )}

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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
