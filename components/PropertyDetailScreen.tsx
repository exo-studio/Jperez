
import React, { useState } from 'react';
// Corrected Property to Vehicle to fix type error on line 3
import { Vehicle } from '../types';
import { Language, translations } from '../translations';

interface PropertyDetailScreenProps {
  vehicle: Vehicle;
  lang: Language;
  onBack: () => void;
  onBook: (v: Vehicle) => void;
}

const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({ vehicle, lang, onBack, onBook }) => {
  const t = translations[lang];
  const [activeImg, setActiveImg] = useState(0);
  const [isFilling, setIsFilling] = useState(false);

  // Simple static maps embed URL using coordinates
  const mapEmbedUrl = `https://maps.google.com/maps?q=${vehicle.lat},${vehicle.lng}&z=15&output=embed`;

  return (
    <div className="min-h-screen bg-black animate-in fade-in duration-500">
      <div className="relative h-[65vh] overflow-hidden">
        <div 
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(-${activeImg * 100}%)` }}
        >
          {vehicle.images.map((img, i) => (
            <img 
              key={i}
              src={img} 
              alt={`${vehicle.brand} ${vehicle.model} view ${i + 1}`} 
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
        
        <button 
          onClick={onBack}
          className="absolute top-12 left-6 w-12 h-12 rounded-full glass flex items-center justify-center z-20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div className="absolute bottom-40 left-8 flex gap-2 z-20">
          {vehicle.images.map((_, i) => (
            <button 
              key={i}
              onClick={() => setActiveImg(i)}
              className={`h-[2px] transition-all duration-500 ${activeImg === i ? 'w-8 bg-[#0066B3]' : 'w-4 bg-white/30'}`}
            />
          ))}
        </div>

        <div className="absolute bottom-12 left-8 right-8 space-y-4 z-10">
          <div className="inline-block gold-bg px-4 py-1 rounded-full text-[10px] font-bold text-black tracking-[0.2em] uppercase">
            Exclusive Fleet
          </div>
          <h1 className="text-5xl tracking-tight leading-none">{vehicle.brand} <span className="serif italic">{vehicle.model}</span></h1>
          <p className="text-2xl font-light text-[#0066B3]">{vehicle.price}</p>
        </div>
      </div>

      <div className="p-8 pb-32 space-y-12 bg-[#0a0a0a]">
        <div className="grid grid-cols-2 gap-y-8 gap-x-4 py-8 border-y border-white/10">
          <div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">{t.hp}</p>
            <p className="text-base font-medium">{vehicle.hp} HP</p>
          </div>
          <div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">{t.acceleration}</p>
            <p className="text-base font-medium">{vehicle.acceleration}</p>
          </div>
          <div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">{t.topSpeed}</p>
            <p className="text-base font-medium">{vehicle.topSpeed}</p>
          </div>
          <div>
            <p className="text-white/30 text-[9px] uppercase tracking-widest mb-1">{t.engine}</p>
            <p className="text-[10px] leading-tight font-medium uppercase">{vehicle.engine}</p>
          </div>
        </div>

        {/* Location Section - Map Embed */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl serif italic">{t.location}</h3>
            <span className="text-[9px] uppercase tracking-widest text-white/30">{vehicle.location}</span>
          </div>
          <div className="glass rounded-3xl overflow-hidden aspect-video relative">
            <iframe 
              src={mapEmbedUrl}
              className="w-full h-full grayscale opacity-80"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-3xl" />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl serif italic">{t.experience}</h3>
          <p className="text-white/60 leading-relaxed font-light text-sm">
            {vehicle.description}
          </p>
        </div>

        <div className="relative group">
          <button 
            onMouseDown={() => setIsFilling(true)}
            onMouseUp={() => { setIsFilling(false); onBook(vehicle); }}
            onMouseLeave={() => setIsFilling(false)}
            onTouchStart={() => setIsFilling(true)}
            onTouchEnd={() => { setIsFilling(false); onBook(vehicle); }}
            className="relative w-full py-5 rounded-full border border-[#0066B3] text-[#0066B3] text-xs font-bold tracking-[0.3em] uppercase overflow-hidden transition-all duration-300 active:scale-[0.98]"
          >
            <div 
              className={`absolute inset-0 bg-[#0066B3] transition-all duration-[800ms] ease-out origin-left z-0 ${isFilling ? 'scale-x-100' : 'scale-x-0 opacity-0'}`}
            />
            <span className={`relative z-10 transition-colors duration-300 ${isFilling ? 'text-black' : ''}`}>
              {t.bookTour}
            </span>
          </button>
          <p className="text-center text-[9px] text-white/20 mt-3 uppercase tracking-widest">{t.holdConfirm}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailScreen;

