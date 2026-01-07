import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language, translations } from '../translations';

interface OfficeMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    lang: Language;
}

const OfficeMapModal: React.FC<OfficeMapModalProps> = ({ isOpen, onClose, lang }) => {
    const t = translations[lang];

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

    if (!isOpen) return null;

    const address = "Av. Guardia Civil 1321, Int. 802, Surquillo, Lima, Perú";
    const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Av.+Guardia+Civil+1321,+Int.+802,+Surquillo,+Lima,+Peru";

    const modalContent = (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 99999,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
                    maxWidth: '480px',
                    maxHeight: '90vh',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        {/* Logo oficial de Google Maps */}
                        <img src="/logos/googlemapsicon.svg" alt="Google Maps" className="w-7 h-7" />
                        <h2 className="text-base font-bold text-white">{t.ourOffices}</h2>
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

                {/* Map Embed */}
                <div style={{ width: '100%', height: '220px', backgroundColor: '#111' }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.1!2d-77.03!3d-12.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7f0a6e0d5d5%3A0x0!2sAv.%20Guardia%20Civil%201321%2C%20Surquillo%2015038!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
                        width="100%"
                        height="100%"
                        style={{ border: 0, display: 'block' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                {/* Footer */}
                <div className="px-5 py-4 space-y-3">
                    <div>
                        <p className="text-[10px] text-white/40 uppercase font-bold tracking-wider mb-1">Dirección Lima</p>
                        <p className="text-sm text-white/90">{address}</p>
                    </div>
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-3 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-sm text-center transition-all"
                    >
                        Abrir en Google Maps
                    </a>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default OfficeMapModal;
