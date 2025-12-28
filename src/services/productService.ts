import { supabase } from '../../lib/supabase';
import type { ShopItem, Review } from '../data/productShop';

export const productService = {
    /**
     * Mengambil semua produk dari database
     */
    async getAllProducts(): Promise<ShopItem[]> {
        const { data: products, error } = await supabase
            .from('products')
            .select('*, reviews(*)');

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }

        return products.map(product => this.mapProduct(product));
    },

    /**
     * Mengambil satu produk berdasarkan ID beserta ulasannya
     */
    async getProductById(id: string): Promise<ShopItem | null> {
        const { data, error } = await supabase
            .from('products')
            .select('*, reviews(*)')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            return null;
        }

        return this.mapProduct(data);
    },

    /**
     * Helper untuk memetakan kolom database (snake_case) ke properties interface (camelCase)
     */
    mapProduct(data: any): ShopItem {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            detailedDescription: data.detailed_description || data.detailedDescription, // Handle both just in case
            imageUrl: data.image_url || data.imageUrl,
            images: data.images || [],
            price: Number(data.price),
            category: data.category,
            stock: data.stock,
            rating: data.rating,
            features: data.features || [],
            link: data.link,
            reviews: (data.reviews || []).map((rev: any) => ({
                id: rev.id,
                userName: rev.user_name || rev.userName,
                rating: rev.rating,
                comment: rev.comment,
                date: rev.date,
                avatar: rev.avatar
            }))
        };
    }
};
