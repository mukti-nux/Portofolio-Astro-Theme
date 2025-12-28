import type { APIRoute } from 'astro';
import MidtransSnap from '../../../../lib/midtransApi';
import { productService } from '../../../services/productService';

// Create Midtrans Snap transaction
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { productId, customerEmail, customerName, customerPhone } = body;

        // Find product from Supabase
        const product = productId ? await productService.getProductById(productId) : null;
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

        // Initialize Midtrans
        const midtrans = new MidtransSnap(
            import.meta.env.MIDTRANS_SERVER_KEY,
            import.meta.env.MIDTRANS_CLIENT_KEY,
            import.meta.env.MIDTRANS_IS_PRODUCTION === 'true'
        );

        // Generate unique order ID
        const orderId = `ORDER-${Date.now()}-${productId}`;

        // Create transaction
        const transaction = await midtrans.createTransaction({
            orderId,
            grossAmount: product.price,
            itemDetails: [
                {
                    id: product.id,
                    price: product.price,
                    quantity: 1,
                    name: product.title,
                },
            ],
            customerDetails: {
                firstName: customerName || 'Customer',
                email: customerEmail || 'customer@example.com',
                phone: customerPhone || '08123456789',
            },
        });

        return new Response(
            JSON.stringify({
                success: true,
                transaction: {
                    token: transaction.token,
                    redirectUrl: transaction.redirectUrl,
                    orderId: transaction.orderId,
                    product: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
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
