import type { APIRoute } from 'astro';
import MidtransSnap from '../../../../lib/midtransApi.ts';
import TelegramBot from '../../../../lib/telegramBot.ts';

// Webhook endpoint for Midtrans payment notifications
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        console.log('Midtrans webhook received:', body);

        // Initialize Midtrans for signature verification
        const midtrans = new MidtransSnap(
            import.meta.env.MIDTRANS_SERVER_KEY,
            import.meta.env.MIDTRANS_CLIENT_KEY,
            import.meta.env.MIDTRANS_IS_PRODUCTION === 'true'
        );

        // Verify signature
        const isValid = midtrans.verifySignature(
            body.order_id,
            body.status_code,
            body.gross_amount,
            body.signature_key
        );

        if (!isValid) {
            console.error('Invalid signature from Midtrans webhook');
            return new Response(
                JSON.stringify({ error: 'Invalid signature' }),
                {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Check if payment is successful
        const isSuccess = (
            body.transaction_status === 'capture' ||
            body.transaction_status === 'settlement'
        ) && body.fraud_status === 'accept';

        if (isSuccess) {
            // Send Telegram notification
            const telegram = new TelegramBot(
                import.meta.env.TELEGRAM_BOT_TOKEN,
                import.meta.env.TELEGRAM_CHAT_ID
            );

            // Extract product info from order_id (format: ORDER-timestamp-PRODID)
            const productId = body.order_id.split('-').pop() || 'Unknown';

            const notification = {
                invoiceNumber: body.order_id,
                productTitle: body.item_details?.[0]?.name || 'Unknown Product',
                productId: productId,
                amount: parseInt(body.gross_amount),
                timestamp: new Date().toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
                customerInfo: body.customer_details?.first_name || undefined,
            };

            await telegram.sendOrderNotification(notification);

            console.log('Telegram notification sent for:', notification.invoiceNumber);
        }

        // Always return 200 to acknowledge webhook
        return new Response(
            JSON.stringify({ success: true, received: true }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error('Webhook processing error:', error);

        // Still return 200 to prevent Midtrans from retrying
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
};
