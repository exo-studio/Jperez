import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ImmersiveGalleryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const GALLERY_IMAGES = [
    '/fleet/foton-team.jpeg',
    '/fleet/foton-fleet-1.jpeg',
    '/fleet/foton-fleet-2.jpg',
    '/fleet/foton-fleet-3.jpg'
];

const ImmersiveGalleryModal: React.FC<ImmersiveGalleryModalProps> = ({ isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            // Guardar la posición del scroll actual
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
        }
        return () => {
            // Restaurar la posición del scroll
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        };
    }, [isOpen]);

    // Autoplay every 3 seconds
    useEffect(() => {
        if (!isOpen) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
        }, 3000);

        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
    };

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
            }}
            onClick={onClose}
        >
            {/* Modal Card */}
            <div
                style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-[#0066B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h2 className="text-base font-bold text-white">Galería FOTON</h2>
                        <span className="text-xs text-white/40 ml-2">{currentIndex + 1} / {GALLERY_IMAGES.length}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Image Container */}
                <div style={{ position: 'relative', backgroundColor: '#000', aspectRatio: '16/9' }}>
                    <img
                        key={currentIndex}
                        src={GALLERY_IMAGES[currentIndex]}
                        alt={`FOTON Gallery ${currentIndex + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center gap-2 py-4 bg-[#1a1a1a]">
                    {GALLERY_IMAGES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`transition-all duration-300 rounded-full ${index === currentIndex
                                ? 'w-6 h-2 bg-[#0066B3]'
                                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default ImmersiveGalleryModal;
