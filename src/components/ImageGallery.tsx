import { useState } from 'preact/hooks';

interface ImageGalleryProps {
    images: string[];
    productTitle: string;
}

export default function ImageGallery({ images, productTitle }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div class="space-y-4">
            {/* Main Image */}
            <div class="relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                    src={images[selectedImage]}
                    alt={`${productTitle} - Image ${selectedImage + 1}`}
                    class="w-full h-full object-cover transition-opacity duration-300"
                />
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div class="grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            class={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === index
                                    ? 'border-primary scale-105 shadow-lg'
                                    : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${productTitle} thumbnail ${index + 1}`}
                                class="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Image Counter */}
            <div class="text-center text-sm text-gray-600 dark:text-gray-400">
                {selectedImage + 1} / {images.length}
            </div>
        </div>
    );
}
