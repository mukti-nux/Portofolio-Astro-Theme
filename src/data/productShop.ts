export interface ShopItem {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    category: string;
    stock: number;
    rating: number;
    link?: string; // Optional external link
}

const productShop: ShopItem[] = [
    {
        id: "PROD001",
        title: "Premium Web Template",
        description: "Modern and responsive web template with dark mode support, perfect for portfolio websites",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2888_3_11zon.jpg?raw=true",
        price: 150000,
        category: "Web Template",
        stock: 10,
        rating: 4.8,
    },
    {
        id: "PROD002",
        title: "UI/UX Design Kit",
        description: "Complete design system with components, icons, and guidelines for modern applications",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2714_4_11zon.jpg?raw=true",
        price: 200000,
        category: "Design Kit",
        stock: 5,
        rating: 4.9,
    },
    {
        id: "PROD003",
        title: "Photography Preset Pack",
        description: "Professional Lightroom presets for stunning photo editing, includes 20+ presets",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2474_1_11zon.jpg?raw=true",
        price: 75000,
        category: "Photography",
        stock: 50,
        rating: 4.7,
    },
    {
        id: "PROD004",
        title: "React Component Library",
        description: "Reusable React components with TypeScript support and comprehensive documentation",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2226_2_11zon.jpg?raw=true",
        price: 300000,
        category: "Code Library",
        stock: 15,
        rating: 5.0,
    },
    {
        id: "PROD005",
        title: "Logo Design Package",
        description: "Custom logo design with 3 concepts, unlimited revisions, and source files included",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.06.jpeg?raw=true",
        price: 500000,
        category: "Graphic Design",
        stock: 3,
        rating: 4.9,
    },
    {
        id: "PROD006",
        title: "SEO Optimization Guide",
        description: "Complete guide to improve your website's SEO ranking with proven strategies",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.07.jpeg?raw=true",
        price: 100000,
        category: "Digital Product",
        stock: 100,
        rating: 4.6,
    },
];

export default productShop;
