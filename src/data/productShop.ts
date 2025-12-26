export interface Review {
    id: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    avatar?: string;
}

export interface ShopItem {
    id: string;
    title: string;
    description: string;
    detailedDescription: string;
    imageUrl: string;
    images: string[]; // Array of images for gallery
    price: number;
    category: string;
    stock: number;
    rating: number;
    features: string[];
    reviews: Review[];
    link?: string; // Optional external link
}

const productShop: ShopItem[] = [
    {
        id: "PROD001",
        title: "Premium Web Template",
        description: "Modern and responsive web template with dark mode support, perfect for portfolio websites",
        detailedDescription: "A fully responsive and modern web template built with the latest web technologies. Features include dark mode support, smooth animations, SEO optimization, and mobile-first design. Perfect for developers, designers, and creative professionals who want to showcase their work in style. Includes comprehensive documentation and lifetime updates.",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2888_3_11zon.jpg?raw=true",
        images: [
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2888_3_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2714_4_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2474_1_11zon.jpg?raw=true",
        ],
        price: 150000,
        category: "Web Template",
        stock: 10,
        rating: 4.8,
        features: [
            "Fully responsive design",
            "Dark mode support",
            "SEO optimized",
            "Fast loading speed",
            "Cross-browser compatible",
            "Lifetime updates",
            "Documentation included",
        ],
        reviews: [
            {
                id: "REV001",
                userName: "Ahmad Rizki",
                rating: 5,
                comment: "Template yang sangat bagus! Mudah dikustomisasi dan dokumentasinya lengkap.",
                date: "2025-12-20",
            },
            {
                id: "REV002",
                userName: "Siti Nurhaliza",
                rating: 4.5,
                comment: "Desainnya modern dan responsive. Worth the price!",
                date: "2025-12-18",
            },
        ],
    },
    {
        id: "PROD002",
        title: "UI/UX Design Kit",
        description: "Complete design system with components, icons, and guidelines for modern applications",
        detailedDescription: "Professional UI/UX design kit containing over 200+ components, 500+ icons, and comprehensive design guidelines. Built for Figma and Adobe XD. Includes color palettes, typography systems, spacing guidelines, and ready-to-use components for web and mobile applications. Perfect for designers and design teams.",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2714_4_11zon.jpg?raw=true",
        images: [
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2714_4_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2226_2_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.06.jpeg?raw=true",
        ],
        price: 200000,
        category: "Design Kit",
        stock: 5,
        rating: 4.9,
        features: [
            "200+ UI components",
            "500+ vector icons",
            "Figma & Adobe XD files",
            "Design system guidelines",
            "Color palettes included",
            "Typography system",
            "Free updates",
        ],
        reviews: [
            {
                id: "REV003",
                userName: "Budi Santoso",
                rating: 5,
                comment: "Design kit yang sangat lengkap! Menghemat banyak waktu saya.",
                date: "2025-12-22",
            },
            {
                id: "REV004",
                userName: "Dewi Lestari",
                rating: 4.8,
                comment: "Komponen-komponennya sangat berguna dan mudah digunakan.",
                date: "2025-12-19",
            },
        ],
    },
    {
        id: "PROD003",
        title: "Photography Preset Pack",
        description: "Professional Lightroom presets for stunning photo editing, includes 20+ presets",
        detailedDescription: "Transform your photos with our professional Lightroom preset pack. Includes 20+ carefully crafted presets for various photography styles including portrait, landscape, street, and wedding photography. Compatible with Lightroom Classic, Lightroom CC, and mobile app. Each preset is fully customizable and comes with video tutorials.",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2474_1_11zon.jpg?raw=true",
        images: [
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2474_1_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2888_3_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.07.jpeg?raw=true",
        ],
        price: 75000,
        category: "Photography",
        stock: 50,
        rating: 4.7,
        features: [
            "20+ professional presets",
            "Portrait & landscape styles",
            "Mobile & desktop compatible",
            "Video tutorials included",
            "One-click application",
            "Fully customizable",
            "Lifetime access",
        ],
        reviews: [
            {
                id: "REV005",
                userName: "Rina Wijaya",
                rating: 4.5,
                comment: "Preset-nya bagus dan mudah digunakan. Foto saya jadi lebih profesional!",
                date: "2025-12-21",
            },
            {
                id: "REV006",
                userName: "Andi Pratama",
                rating: 5,
                comment: "Sangat recommended untuk fotografer pemula maupun profesional.",
                date: "2025-12-17",
            },
        ],
    },
    {
        id: "PROD004",
        title: "React Component Library",
        description: "Reusable React components with TypeScript support and comprehensive documentation",
        detailedDescription: "A comprehensive React component library built with TypeScript and modern best practices. Includes 50+ production-ready components, hooks, and utilities. Fully typed, tested, and documented. Supports React 18+, Next.js, and other React frameworks. Includes Storybook for component preview and testing.",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2226_2_11zon.jpg?raw=true",
        images: [
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2226_2_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.07%20(1).jpeg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.07%20(2).jpeg?raw=true",
        ],
        price: 300000,
        category: "Code Library",
        stock: 15,
        rating: 5.0,
        features: [
            "50+ React components",
            "TypeScript support",
            "Comprehensive documentation",
            "Storybook included",
            "Unit tests included",
            "Accessibility compliant",
            "Regular updates",
        ],
        reviews: [
            {
                id: "REV007",
                userName: "Fajar Ramadhan",
                rating: 5,
                comment: "Component library terbaik yang pernah saya gunakan. TypeScript support-nya sempurna!",
                date: "2025-12-23",
            },
            {
                id: "REV008",
                userName: "Maya Kusuma",
                rating: 5,
                comment: "Dokumentasinya sangat lengkap dan mudah dipahami. Highly recommended!",
                date: "2025-12-16",
            },
        ],
    },
    {
        id: "PROD005",
        title: "Logo Design Package",
        description: "Custom logo design with 3 concepts, unlimited revisions, and source files included",
        detailedDescription: "Professional custom logo design service tailored to your brand. You'll receive 3 unique logo concepts to choose from, unlimited revisions until you're satisfied, and all source files in multiple formats (AI, EPS, PNG, SVG, PDF). Includes brand guidelines and social media kit. Perfect for startups and businesses looking to establish their brand identity.",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.06.jpeg?raw=true",
        images: [
            "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.06.jpeg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2474_1_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2714_4_11zon.jpg?raw=true",
        ],
        price: 500000,
        category: "Graphic Design",
        stock: 3,
        rating: 4.9,
        features: [
            "3 unique logo concepts",
            "Unlimited revisions",
            "All source files included",
            "Multiple file formats",
            "Brand guidelines",
            "Social media kit",
            "Commercial license",
        ],
        reviews: [
            {
                id: "REV009",
                userName: "Rudi Hartono",
                rating: 5,
                comment: "Desain logonya sangat profesional dan sesuai dengan brand kami. Terima kasih!",
                date: "2025-12-24",
            },
            {
                id: "REV010",
                userName: "Linda Sari",
                rating: 4.8,
                comment: "Proses revisinya cepat dan hasilnya memuaskan. Recommended!",
                date: "2025-12-15",
            },
        ],
    },
    {
        id: "PROD006",
        title: "SEO Optimization Guide",
        description: "Complete guide to improve your website's SEO ranking with proven strategies",
        detailedDescription: "Comprehensive SEO optimization guide with proven strategies to boost your website's search engine rankings. Includes keyword research techniques, on-page optimization, link building strategies, technical SEO, and content marketing tips. Features real-world case studies, actionable checklists, and bonus tools. Updated regularly with latest SEO trends and algorithm changes.",
        imageUrl: "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.07.jpeg?raw=true",
        images: [
            "https://github.com/mukti-nux/portof-asset/blob/main/WhatsApp%20Image%202025-12-21%20at%2014.02.07.jpeg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2888_3_11zon.jpg?raw=true",
            "https://github.com/mukti-nux/portof-asset/blob/main/RHO_2226_2_11zon.jpg?raw=true",
        ],
        price: 100000,
        category: "Digital Product",
        stock: 100,
        rating: 4.6,
        features: [
            "Complete SEO strategies",
            "Keyword research guide",
            "On-page optimization",
            "Link building tactics",
            "Technical SEO checklist",
            "Case studies included",
            "Regular updates",
        ],
        reviews: [
            {
                id: "REV011",
                userName: "Hendra Gunawan",
                rating: 4.5,
                comment: "Panduan yang sangat membantu untuk meningkatkan ranking website saya.",
                date: "2025-12-25",
            },
            {
                id: "REV012",
                userName: "Putri Ayu",
                rating: 4.7,
                comment: "Isinya lengkap dan mudah dipahami. Traffic website saya meningkat!",
                date: "2025-12-14",
            },
        ],
    },
];

export default productShop;
