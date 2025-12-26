// Xendit API integration for QRIS payments
// Documentation: https://developers.xendit.co/api-reference/

interface XenditConfig {
    apiKey: string;
    baseUrl: string;
}

interface CreateQRISPaymentParams {
    externalId: string;
    amount: number;
    callbackUrl: string;
    metadata?: Record<string, any>;
}

interface QRISPaymentResponse {
    id: string;
    externalId: string;
    amount: number;
    qrString: string;
    status: string;
    created: string;
    expiresAt: string;
}

interface PaymentStatusResponse {
    id: string;
    externalId: string;
    amount: number;
    status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'COMPLETED' | 'EXPIRED';
    qrString: string;
}

class XenditQRIS {
    private config: XenditConfig;

    constructor(apiKey: string) {
        this.config = {
            apiKey,
            baseUrl: 'https://api.xendit.co',
        };
    }

    private getHeaders() {
        const authString = `${this.config.apiKey}:`;
        const encodedAuth = btoa(authString);

        return {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedAuth}`,
        };
    }

    async createQRISPayment(params: CreateQRISPaymentParams): Promise<QRISPaymentResponse> {
        try {
            const response = await fetch(`${this.config.baseUrl}/qr_codes`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify({
                    external_id: params.externalId,
                    type: 'DYNAMIC',
                    callback_url: params.callbackUrl,
                    amount: params.amount,
                    metadata: params.metadata,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Xendit API Error: ${error.message || response.statusText}`);
            }

            const data = await response.json();

            return {
                id: data.id,
                externalId: data.external_id,
                amount: data.amount,
                qrString: data.qr_string,
                status: data.status,
                created: data.created,
                expiresAt: data.expires_at,
            };
        } catch (error) {
            console.error('Error creating QRIS payment:', error);
            throw error;
        }
    }

    async getPaymentStatus(qrId: string): Promise<PaymentStatusResponse> {
        try {
            const response = await fetch(`${this.config.baseUrl}/qr_codes/${qrId}`, {
                method: 'GET',
                headers: this.getHeaders(),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Xendit API Error: ${error.message || response.statusText}`);
            }

            const data = await response.json();

            return {
                id: data.id,
                externalId: data.external_id,
                amount: data.amount,
                status: data.status,
                qrString: data.qr_string,
            };
        } catch (error) {
            console.error('Error getting payment status:', error);
            throw error;
        }
    }
}

export default XenditQRIS;
