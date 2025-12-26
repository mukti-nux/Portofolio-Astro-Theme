import type { APIRoute } from 'astro';
import TelegramBot from '../../../../lib/telegramBot.ts';

// Webhook endpoint for Xendit payment notifications
export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();

        console.log('Xendit webhook received:', body);

        // Verify webhook is from Xendit (in production, verify signature)
        // For now, we'll process all webhooks

        // Check if payment is completed
        if (body.status === 'COMPLETED') {
            const metadata = body.metadata || {};

            // Send Telegram notification
            const telegram = new TelegramBot(
                import.meta.env.TELEGRAM_BOT_TOKEN,
                import.meta.env.TELEGRAM_CHAT_ID
            );

            const notification = {
                invoiceNumber: metadata.invoiceNumber || body.external_id,
                productTitle: metadata.productTitle || 'Unknown Product',
                productId: metadata.productId || 'N/A',
                amount: body.amount,
                timestamp: new Date().toLocaleString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                }),
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

        // Still return 200 to prevent Xendit from retrying
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
