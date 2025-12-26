// Midtrans Snap API integration
// Documentation: https://docs.midtrans.com/reference/snap-api

interface MidtransConfig {
    serverKey: string;
    clientKey: string;
    isProduction: boolean;
}

interface CreateTransactionParams {
    orderId: string;
    grossAmount: number;
    customerDetails?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
    };
    itemDetails: Array<{
        id: string;
        price: number;
        quantity: number;
        name: string;
    }>;
}

interface TransactionResponse {
    token: string;
    redirectUrl: string;
    orderId: string;
}

interface TransactionStatusResponse {
    transactionId: string;
    orderId: string;
    grossAmount: string;
    paymentType: string;
    transactionTime: string;
    transactionStatus: string;
    fraudStatus: string;
    statusCode: string;
}

class MidtransSnap {
    private config: MidtransConfig;
    private baseUrl: string;

    constructor(serverKey: string, clientKey: string, isProduction: boolean = false) {
        this.config = {
            serverKey,
            clientKey,
            isProduction,
        };
        this.baseUrl = isProduction
            ? 'https://app.midtrans.com/snap/v1'
            : 'https://app.sandbox.midtrans.com/snap/v1';
    }

    private getAuthHeader(): string {
        const auth = Buffer.from(this.config.serverKey + ':').toString('base64');
        return `Basic ${auth}`;
    }

    async createTransaction(params: CreateTransactionParams): Promise<TransactionResponse> {
        try {
            const payload = {
                transaction_details: {
                    order_id: params.orderId,
                    gross_amount: params.grossAmount,
                },
                item_details: params.itemDetails,
                customer_details: params.customerDetails,
                enabled_payments: [
                    'qris',
                    'gopay',
                    'shopeepay',
                    'other_qris',
                    'credit_card',
                    'bca_va',
                    'bni_va',
                    'bri_va',
                    'permata_va',
                    'other_va',
                ],
            };

            const response = await fetch(`${this.baseUrl}/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.getAuthHeader(),
                    'Accept': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Midtrans API Error: ${error.error_messages?.join(', ') || response.statusText}`);
            }

            const data = await response.json();

            return {
                token: data.token,
                redirectUrl: data.redirect_url,
                orderId: params.orderId,
            };
        } catch (error) {
            console.error('Error creating Midtrans transaction:', error);
            throw error;
        }
    }

    async getTransactionStatus(orderId: string): Promise<TransactionStatusResponse> {
        try {
            const statusUrl = this.config.isProduction
                ? 'https://api.midtrans.com/v2'
                : 'https://api.sandbox.midtrans.com/v2';

            const response = await fetch(`${statusUrl}/${orderId}/status`, {
                method: 'GET',
                headers: {
                    'Authorization': this.getAuthHeader(),
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Midtrans API Error: ${error.error_messages?.join(', ') || response.statusText}`);
            }

            const data = await response.json();

            return {
                transactionId: data.transaction_id,
                orderId: data.order_id,
                grossAmount: data.gross_amount,
                paymentType: data.payment_type,
                transactionTime: data.transaction_time,
                transactionStatus: data.transaction_status,
                fraudStatus: data.fraud_status,
                statusCode: data.status_code,
            };
        } catch (error) {
            console.error('Error getting transaction status:', error);
            throw error;
        }
    }

    // Verify notification signature from Midtrans webhook
    verifySignature(orderId: string, statusCode: string, grossAmount: string, signatureKey: string): boolean {
        const crypto = require('crypto');
        const hash = crypto
            .createHash('sha512')
            .update(orderId + statusCode + grossAmount + this.config.serverKey)
            .digest('hex');

        return hash === signatureKey;
    }

    // Check if transaction is successful
    isTransactionSuccess(status: TransactionStatusResponse): boolean {
        return (
            status.transactionStatus === 'capture' ||
            status.transactionStatus === 'settlement'
        ) && status.fraudStatus === 'accept';
    }
}

export default MidtransSnap;
