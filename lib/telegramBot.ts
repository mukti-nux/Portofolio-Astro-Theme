// Telegram Bot integration for order notifications
// Documentation: https://core.telegram.org/bots/api

interface TelegramConfig {
    botToken: string;
    chatId: string;
}

interface OrderNotification {
    invoiceNumber: string;
    productTitle: string;
    productId: string;
    amount: number;
    customerInfo?: string;
    timestamp: string;
}

class TelegramBot {
    private config: TelegramConfig;
    private baseUrl: string;

    constructor(botToken: string, chatId: string) {
        this.config = {
            botToken,
            chatId,
        };
        this.baseUrl = `https://api.telegram.org/bot${botToken}`;
    }

    private formatPrice(price: number): string {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    }

    private formatMessage(order: OrderNotification): string {
        return `
🎉 *PESANAN BARU!*

📋 *Invoice:* \`${order.invoiceNumber}\`
🛍️ *Produk:* ${order.productTitle}
🆔 *ID Produk:* \`${order.productId}\`
💰 *Total:* ${this.formatPrice(order.amount)}
⏰ *Waktu:* ${order.timestamp}
${order.customerInfo ? `👤 *Customer:* ${order.customerInfo}` : ''}

✅ Pembayaran berhasil dikonfirmasi!
    `.trim();
    }

    async sendOrderNotification(order: OrderNotification): Promise<boolean> {
        try {
            const message = this.formatMessage(order);

            const response = await fetch(`${this.baseUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.config.chatId,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Telegram API Error:', error);
                return false;
            }

            const data = await response.json();
            console.log('Telegram notification sent:', data);
            return data.ok;
        } catch (error) {
            console.error('Error sending Telegram notification:', error);
            return false;
        }
    }

    async sendMessage(text: string): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.config.chatId,
                    text: text,
                    parse_mode: 'Markdown',
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Telegram API Error:', error);
                return false;
            }

            const data = await response.json();
            return data.ok;
        } catch (error) {
            console.error('Error sending Telegram message:', error);
            return false;
        }
    }
}

export default TelegramBot;
