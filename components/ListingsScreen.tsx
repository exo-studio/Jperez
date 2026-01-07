import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FOTON_VEHICLES } from '../data/fotonVehicles';
import { Vehicle } from '../types';
import { Language, translations } from '../translations';
import CategoryCard from './CategoryCard';

interface ListingsScreenProps {
  lang: Language;
  onInquiry: (v: Vehicle) => void;
}

const ListingsScreen: React.FC<ListingsScreenProps> = ({ lang, onInquiry }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [activeSlide, setActiveSlide] = useState(0);

  // Derive selectedCategory from URL param
  const selectedCategory = category;

  // Filter vehicles by category
  const displayedVehicles = useMemo(() => {
    if (!selectedCategory) return [];
    return FOTON_VEHICLES.filter(v => v.category === selectedCategory);
  }, [selectedCategory]);

  // Group vehicles for the Hub View
  const vehiclesByCategory = useMemo(() => {
    return {
      'Pasajeros': FOTON_VEHICLES.filter(v => v.category === 'Pasajeros'),
      'Pickups': FOTON_VEHICLES.filter(v => v.category === 'Pickups'),
      'Camiones': FOTON_VEHICLES.filter(v => v.category === 'Camiones'),
      'Minitruck': FOTON_VEHICLES.filter(v => v.category === 'Minitruck'),
      'Wonder': FOTON_VEHICLES.filter(v => v.category === 'Wonder'),
    };
  }, []);

  // Reset slide when category changes
  useEffect(() => {
    setActiveSlide(0);
  }, [selectedCategory]);

  // Auto-rotate carousel
  useEffect(() => {
    if (displayedVehicles.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % displayedVehicles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [displayedVehicles]);

  const handleCategoryClick = (cat: string) => {
    navigate(`/listings/${cat}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate('/listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-in slide-in-from-right duration-500 min-h-screen pb-20 bg-[#121212] text-white">

      {/* VIEW 1: CATEGORY HUB (When no category is selected) */}
      {!selectedCategory && (
        <div className="px-6 lg:px-12 py-12 space-y-8 animate-in fade-in duration-500">
          <div className="flex flex-col items-center text-center space-y-2 mb-4">
            <p className="text-[10px] text-[#0066B3] uppercase tracking-[0.4em] font-black">{t.collection}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Explora nuestros <span className="serif italic text-[#0066B3]">Modelos</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Pickups */}
            <CategoryCard
              category="Pickups"
              vehicles={vehiclesByCategory['Pickups']}
              onClick={() => handleCategoryClick('Pickups')}
            />
            {/* Camiones */}
            <CategoryCard
              category="Camiones"
              vehicles={vehiclesByCategory['Camiones']}
              onClick={() => handleCategoryClick('Camiones')}
            />
            {/* Pasajeros */}
            <CategoryCard
              category="Pasajeros"
              vehicles={vehiclesByCategory['Pasajeros']}
              onClick={() => handleCategoryClick('Pasajeros')}
            />
            {/* Minitruck */}
            <CategoryCard
              category="Minitruck"
              vehicles={vehiclesByCategory['Minitruck']}
              onClick={() => handleCategoryClick('Minitruck')}
            />
            {/* Wonder */}
            <CategoryCard
              category="Wonder"
              vehicles={vehiclesByCategory['Wonder']}
              onClick={() => handleCategoryClick('Wonder')}
            />
          </div>
        </div>
      )}

      {/* VIEW 2: VEHICLE LIST (When a category is selected) */}
      {selectedCategory && (
        <div className="animate-in slide-in-from-right duration-300">

          {/* Header with Back Button */}
          <div className="sticky top-0 z-40 bg-[#121212]/80 backdrop-blur-xl border-b border-white/5 py-4 px-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-white/60 hover:text-[#0066B3] transition-colors group"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-xs font-black tracking-widest uppercase">Volver</span>
              </button>

              <h2 className="text-lg font-bold text-white tracking-tight absolute left-1/2 -translate-x-1/2">
                {selectedCategory}
              </h2>
            </div>
          </div>

          {/* Featured Carousel */}
          <div className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
            {displayedVehicles.map((vehicle, index) => {
              // Optimization: Only render the current, previous, and next slides
              const isCurrent = index === activeSlide;
              const isNext = index === (activeSlide + 1) % displayedVehicles.length;
              const isPrev = index === (activeSlide - 1 + displayedVehicles.length) % displayedVehicles.length;
              const shouldRender = isCurrent || isNext || isPrev;

              return (
                <div
                  key={vehicle.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  {shouldRender && (
                    <>
                      {/* Background Image with Enhancement */}
                      <div className="absolute inset-0">
                        <img
                          src={vehicle.images[0]}
                          alt={vehicle.model}
                          className="w-full h-full object-cover brightness-[1.1] contrast-[1.05] saturate-[1.1]"
                          loading={isCurrent ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/70 via-transparent to-transparent lg:from-[#121212]/90" />
                      </div>

                      {/* Carousel Content */}
                      <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 flex flex-col items-start justify-end h-full">
                        <span className="text-[#0066B3] font-black tracking-[0.3em] text-xs uppercase mb-4 animate-in slide-in-from-bottom-4 delay-100">
                          {selectedCategory}
                        </span>
                        <h2 className="text-4xl lg:text-6xl font-light mb-2 animate-in slide-in-from-bottom-6 delay-200">
                          {vehicle.brand} <span className="font-bold italic">{vehicle.model.split(' ')[0]}</span>
                        </h2>
                        <p className="text-xl lg:text-2xl text-white/70 font-light mb-8 max-w-lg animate-in slide-in-from-bottom-8 delay-300">
                          {vehicle.model.split(' ').slice(1).join(' ') || vehicle.model}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20 flex gap-2">
              {displayedVehicles.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${idx === activeSlide ? 'w-8 bg-[#0066B3]' : 'w-2 bg-white/20'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Models Grid */}
          <div className="px-6 lg:px-12 py-10">
            <h3 className="text-2xl font-light mb-8 text-white/50">
              Modelos Disponibles <span className="text-white font-bold block text-sm tracking-wider uppercase mt-1">Explora la gama {selectedCategory}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => onInquiry(vehicle)}
                  className="group relative bg-[#1A1A1A] rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 hover:border-[#0066B3]/30 transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                >
                  {/* Enhanced Image Container */}
                  <div className="aspect-[16/10] overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(0,102,179,0.2)] transition-shadow duration-500">
                    <img
                      src={vehicle.images[0]}
                      alt={vehicle.model}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 brightness-[1.05] group-hover:brightness-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=1000'; // Fallback
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-80" />

                    {/* Image Overlay Label */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-[#0066B3]/90 backdrop-blur-md text-[10px] font-black px-3 py-1 rounded-full text-white uppercase tracking-widest">
                        Pure Performance
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative">
                    <div className="absolute -top-10 right-6 w-12 h-12 bg-[#0066B3] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>

                    <h4 className="text-xl font-bold mb-1">{vehicle.model}</h4>
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-4">{vehicle.category}</p>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <span className="block text-[10px] text-white/30 uppercase">Motor</span>
                        <span className="text-sm font-medium text-white/80">{vehicle.engine}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-white/30 uppercase">Potencia</span>
                        <span className="text-sm font-medium text-white/80">{vehicle.hp} HP</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      )}

    </div>
  );
};

export default ListingsScreen;
