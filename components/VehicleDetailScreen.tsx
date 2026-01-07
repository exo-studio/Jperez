
import React, { useState } from 'react';
import { Vehicle } from '../types';
import { Language, translations } from '../translations';

interface VehicleDetailScreenProps {
  vehicle: Vehicle;
  lang: Language;
  onBack: () => void;
  onBook: (v: Vehicle) => void;
  onShare: () => void;
}

const VehicleDetailScreen: React.FC<VehicleDetailScreenProps> = ({ vehicle, lang, onBack, onBook, onShare }) => {
  const t = translations[lang];
  const [activeImg, setActiveImg] = useState(0);
  const [isFilling, setIsFilling] = useState(false);

  const mapEmbedUrl = `https://maps.google.com/maps?q=${vehicle.lat},${vehicle.lng}&z=15&output=embed`;

  return (
    <div className="min-h-screen bg-[#080808] animate-in fade-in duration-300">
      <div className="relative h-[45vh] lg:h-[50vh] overflow-hidden bg-black">
        <div
          className="flex h-full transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: `translateX(-${activeImg * 100}%)` }}
        >
          {vehicle.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="w-full h-full object-cover flex-shrink-0 brightness-[1.1] contrast-[1.05] saturate-[1.1]"
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20 pointer-events-none" />

        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={onShare}
            className="w-10 h-10 rounded-full glass flex items-center justify-center transition-all active:scale-90"
          >
            <svg className="w-5 h-5 text-[#0066B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {vehicle.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`h-1 transition-all duration-300 rounded-full ${activeImg === i ? 'w-8 bg-[#0066B3]' : 'w-2 bg-white/20'}`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 lg:p-12 pb-24 space-y-10">
        <div className="space-y-1">
          <p className="text-[#0066B3] text-[9px] font-black uppercase tracking-[0.5em]">{t.activeStatus}</p>
          <h1 className="text-4xl lg:text-5xl tracking-tight leading-none text-white">{vehicle.brand} <span className="serif italic text-white/80">{vehicle.model}</span></h1>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl serif italic text-[#0066B3]">{t.experience}</h3>
            <p className="text-white/50 leading-relaxed text-sm font-light">{vehicle.description}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl serif italic text-[#0066B3]">{t.location}</h3>
            <div className="glass rounded-2xl overflow-hidden aspect-video border border-white/5">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full grayscale invert opacity-30"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto pt-4">
          <button
            onMouseDown={() => setIsFilling(true)}
            onMouseUp={() => { setIsFilling(false); onBook(vehicle); }}
            onMouseLeave={() => setIsFilling(false)}
            onTouchStart={() => setIsFilling(true)}
            onTouchEnd={() => { setIsFilling(false); onBook(vehicle); }}
            className="relative w-full py-5 rounded-full border border-[#0066B3] text-[#0066B3] text-[10px] font-black tracking-[0.3em] uppercase overflow-hidden active:scale-[0.98] transition-all"
          >
            <div className={`absolute inset-0 bg-[#0066B3] transition-all duration-300 ease-out origin-left z-0 ${isFilling ? 'scale-x-100' : 'scale-x-0 opacity-0'}`} />
            <span className={`relative z-10 ${isFilling ? 'text-black' : ''}`}>{t.bookTour}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailScreen;

