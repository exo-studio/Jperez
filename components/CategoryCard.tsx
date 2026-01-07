
import React, { useState, useEffect } from 'react';
import { Vehicle } from '../types';

interface CategoryCardProps {
    category: string;
    vehicles: Vehicle[];
    onClick: () => void;
    className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, vehicles, onClick, className = '' }) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    // Get all images from all vehicles in this category
    const allImages = vehicles.flatMap(v => v.images);
    // Limit the number of images to optimize performance
    const displayImages = allImages.slice(0, 10);

    useEffect(() => {
        if (displayImages.length <= 1) return;

        const interval = setInterval(() => {
            setActiveImgIndex((prev) => (prev + 1) % displayImages.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, [displayImages.length]);

    return (
        <button
            onClick={onClick}
            className={`relative group overflow-hidden rounded-[2rem] h-64 lg:h-80 w-full flex-shrink-0 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${className}`}
        >
            {/* Background Images Carousel */}
            <div className="absolute inset-0 bg-[#1a1a1a]">
                {displayImages.map((img, idx) => {
                    // Optimization: Only render current and next image (for crossfade/preload)
                    const isActive = idx === activeImgIndex;
                    const isNext = idx === (activeImgIndex + 1) % displayImages.length;
                    const shouldRender = isActive || isNext;

                    return (
                        <div
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                        >
                            {/* Only mount the <img> if it's visible or about to be visible */}
                            {shouldRender && (
                                <img
                                    src={img}
                                    alt={`${category} vehicle`}
                                    className="w-full h-full object-cover transition-transform duration-[8000ms] ease-linear transform scale-100 group-hover:scale-110"
                                    style={{
                                        transform: isActive ? 'scale(1.1)' : 'scale(1.0)'
                                    }}
                                    loading={isActive ? "eager" : "lazy"}
                                />
                            )}
                        </div>
                    );
                })}
                {/* Fallback if no images are available/loaded yet */}
                {displayImages.length === 0 && (
                    <div className="w-full h-full bg-[#222] flex items-center justify-center text-white/20">
                        No Images
                    </div>
                )}
            </div>

            {/* Modern Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 z-30 w-full text-left flex flex-col justify-end h-full">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                        {category.toUpperCase()}
                    </h3>
                    <div className="w-12 h-1 bg-[#0066B3] rounded-full mb-4 group-hover:w-24 transition-all duration-500" />
                    <p className="text-xs text-white/70 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-bold">
                        Ver Modelos &rarr;
                    </p>
                </div>
            </div>
        </button>
    );
};

export default CategoryCard;
