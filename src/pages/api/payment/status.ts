import type { APIRoute } from 'astro';
import MidtransSnap from '../../../../lib/midtransApi';

// Check Midtrans transaction status
export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const orderId = url.searchParams.get('orderId');

        if (!orderId) {
            return new Response(JSON.stringify({ error: 'Order ID is required' }), {
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

        // Get transaction status
        const status = await midtrans.getTransactionStatus(orderId);
        const isPaid = midtrans.isTransactionSuccess(status);

        return new Response(
            JSON.stringify({
                success: true,
                status: {
                    orderId: status.orderId,
                    transactionStatus: status.transactionStatus,
                    paymentType: status.paymentType,
                    grossAmount: status.grossAmount,
                    isPaid,
                },
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Payment status check error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to check payment status',
                message: error instanceof Error ? error.message : 'Unknown error',
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
