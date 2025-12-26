import { useState, useEffect } from 'preact/hooks';
import PaymentMethodModal from './PaymentMethodModal';
import InvoiceModal from './InvoiceModal';

interface Product {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    category: string;
    stock: number;
}

interface PaymentFlowProps {
    product: Product;
}

export default function PaymentFlow({ product }: PaymentFlowProps) {
    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [checkoutData, setCheckoutData] = useState<{
        paymentMethod: 'qris' | 'midtrans';
        quantity: number;
        totalPrice: number;
    } | null>(null);

    // Listen for buy button click
    useEffect(() => {
        const handleOpenPayment = () => {
            setShowPaymentMethodModal(true);
        };

        window.addEventListener('openPaymentModal', handleOpenPayment);
        return () => window.removeEventListener('openPaymentModal', handleOpenPayment);
    }, []);

    const handleProceedToInvoice = (data: {
        paymentMethod: 'qris' | 'midtrans';
        quantity: number;
        totalPrice: number;
    }) => {
        setCheckoutData(data);
        setShowPaymentMethodModal(false);
        setShowInvoiceModal(true);
    };

    const handleClosePaymentMethod = () => {
        setShowPaymentMethodModal(false);
    };

    const handleCloseInvoice = () => {
        setShowInvoiceModal(false);
        setCheckoutData(null);
    };

    return (
        <>
            <PaymentMethodModal
                isOpen={showPaymentMethodModal}
                onClose={handleClosePaymentMethod}
                product={product}
                onProceedToInvoice={handleProceedToInvoice}
            />

            {checkoutData && (
                <InvoiceModal
                    isOpen={showInvoiceModal}
                    onClose={handleCloseInvoice}
                    product={product}
                    paymentMethod={checkoutData.paymentMethod}
                    quantity={checkoutData.quantity}
                    totalPrice={checkoutData.totalPrice}
                />
            )}
        </>
    );
}
