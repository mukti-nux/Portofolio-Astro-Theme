import type { APIRoute } from 'astro';
import XenditQRIS from '../../../../lib/xenditApi';
import TelegramBot from '../../../../lib/telegramBot';
import productShop from '../../../data/productShop';

// Create QRIS payment
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { productId } = body;

        // Find product
        const product = productShop.find(p => p.id === productId);
        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Check stock
        if (product.stock === 0) {
            return new Response(JSON.stringify({ error: 'Product out of stock' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Initialize Xendit
        const xendit = new XenditQRIS(import.meta.env.XENDIT_API_KEY);

        // Generate unique invoice number
        const invoiceNumber = `INV-${Date.now()}-${productId}`;
        const callbackUrl = `${import.meta.env.PUBLIC_BASE_URL}/api/payment/webhook`;

        // Create QRIS payment
        const payment = await xendit.createQRISPayment({
            externalId: invoiceNumber,
            amount: product.price,
            callbackUrl,
            metadata: {
                productId: product.id,
                productTitle: product.title,
                invoiceNumber,
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                payment: {
                    id: payment.id,
                    invoiceNumber,
                    qrString: payment.qrString,
                    amount: payment.amount,
                    expiresAt: payment.expiresAt,
                    product: {
                        id: product.id,
                        title: product.title,
                        imageUrl: product.imageUrl,
                        category: product.category,
                    },
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Payment creation error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to create payment',
                message: error instanceof Error ? error.message : 'Unknown error',
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
