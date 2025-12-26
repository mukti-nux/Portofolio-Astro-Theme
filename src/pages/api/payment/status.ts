import type { APIRoute } from 'astro';
import XenditQRIS from '../../../../lib/xenditApi';

// Check payment status
export const GET: APIRoute = async ({ params, request }) => {
    try {
        const url = new URL(request.url);
        const qrId = url.searchParams.get('qrId');

        if (!qrId) {
            return new Response(JSON.stringify({ error: 'QR ID is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Initialize Xendit
        const xendit = new XenditQRIS(import.meta.env.XENDIT_API_KEY);

        // Get payment status
        const status = await xendit.getPaymentStatus(qrId);

        return new Response(
            JSON.stringify({
                success: true,
                status: {
                    id: status.id,
                    externalId: status.externalId,
                    amount: status.amount,
                    status: status.status,
                    isPaid: status.status === 'COMPLETED',
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
