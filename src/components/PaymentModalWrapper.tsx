import { useEffect, useState } from 'preact/hooks';
import PaymentModal from './PaymentModal';

export default function PaymentModalWrapper() {
    const [isOpen, setIsOpen] = useState(false);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        // Listen for custom event to open modal
        const handleOpenModal = (event: CustomEvent) => {
            const productData = event.detail;
            setProduct({
                id: productData.id,
                title: productData.title,
                price: parseInt(productData.price),
                imageUrl: productData.imageUrl,
                category: productData.category,
            });
            setIsOpen(true);
        };

        window.addEventListener('openPaymentModal', handleOpenModal as EventListener);

        return () => {
            window.removeEventListener('openPaymentModal', handleOpenModal as EventListener);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setProduct(null);
    };

    return <PaymentModal isOpen={isOpen} onClose={handleClose} product={product} />;
}
