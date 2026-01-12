
import React, { useState } from 'react';
import { Language, translations } from '../translations';
import OfficeMapModal from './OfficeMapModal';
import { useNavigate } from 'react-router-dom';

interface HomeScreenProps {
  lang: Language;
  setLang: (l: Language) => void;
  onWhatsApp: () => void;
  onCall: () => void;
  onEmail: () => void;
  onCorporateEmail: () => void;
  onLinkedIn: () => void;
  onWebsite: () => void;
  onWeChat: () => void;
  onFacebook: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  lang, setLang, onWhatsApp, onCall, onEmail,
  onCorporateEmail, onLinkedIn, onWebsite, onWeChat, onFacebook
}) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleNavigateToCategory = (category: string) => {
    navigate(`/listings/${category}`);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleNavigateToListings = () => {
    navigate('/listings');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text);
    alert(message);
  };

  return (
    <div className="animate-in fade-in duration-300 flex flex-col min-h-screen relative">
      {/* Hero Header with GF1 Background */}
      <div className="relative h-[55vh] lg:h-[65vh] overflow-hidden">
        {/* Background Image - object-cover will handle cropping smartly */}
        <img
          src="/fleet/foton-team.jpeg"
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt="FOTON Team"
        />

        {/* Gradient Overlay - stronger for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Centered Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
          {/* Profile Photo - Larger and more prominent */}
          <div className="relative group mb-8 animate-in zoom-in duration-700">
            <div className="absolute -inset-3 bg-gradient-to-r from-[#0066B3] to-[#0088E5] rounded-full blur-xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
            <div className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-full border-4 border-white/30 p-1.5 shadow-2xl bg-black">
              <img
                src="/profile/jhon-carlos.png"
                className="w-full h-full rounded-full object-cover"
                alt="Jhon Carlos Pérez Cubas"
              />
            </div>
            {/* Online Indicator - Larger */}
            <div className="absolute bottom-3 right-3 w-7 h-7 lg:w-8 lg:h-8 bg-[#25D366] rounded-full border-4 border-[#1a1a1a] shadow-lg animate-pulse" />
          </div>

          {/* Name and Role - Better spacing and sizing */}
          <div className="text-center space-y-3 animate-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
              Jhon <span className="serif italic gold-gradient">Pérez</span>
            </h1>
            <p className="text-[12px] lg:text-[14px] uppercase tracking-[0.5em] text-white/70 font-black drop-shadow-md">
              {t.role}
            </p>
          </div>
        </div>
      </div>

      {/* Chips Section */}
      <div className="px-8 py-6 bg-[#121212] border-b border-white/5">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-black mb-3">{t.specialization}:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['PICKUP', 'VAN', 'MINIBUS', 'MINITRUCK', 'LDT'].map((item) => (
            <span
              key={item}
              className="px-4 py-1.5 rounded-full bg-[#0066B3]/10 border border-[#0066B3]/20 text-[10px] font-bold text-[#0066B3] hover:bg-[#0066B3]/20 transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Actions Grid - Icon Only Design */}
      <div className="px-6 lg:px-12 py-8 space-y-6 relative z-20 max-w-6xl mx-auto w-full bg-[#121212]">
        {/* Main Row - Featured Actions */}
        import {downloadVCard} from '../utils/vcard';

        interface HomeScreenProps {
          // ... existing props ...
        }

        const HomeScreen: React.FC<HomeScreenProps> = ({
          // ... existing args ...
        }) => {
  // ... existing state/logic ...

  return (
          <div className="animate-in fade-in duration-300 flex flex-col min-h-screen relative">
            {/* ... Hero Section ... */}

            {/* Chips Section */}
            {/* ... existing chips ... */}

            {/* Contact Actions Grid - 2x2 Layout for Primary Actions */}
            <div className="px-6 lg:px-12 py-8 space-y-6 relative z-20 max-w-6xl mx-auto w-full bg-[#121212]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* WhatsApp */}
                <button
                  onClick={onWhatsApp}
                  className="bg-[#25D366] rounded-3xl p-6 flex flex-col items-center justify-center gap-3 group active:scale-[0.98] transition-all shadow-[0_10px_25px_rgba(37,211,102,0.2)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.3)]"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.902 7.902 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">WhatsApp</span>
                </button>

                {/* Save Contact - VCard */}
                <button
                  onClick={downloadVCard}
                  className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center gap-3 group active:scale-[0.98] transition-all shadow-lg hover:bg-gray-50"
                >
                  <svg className="w-8 h-8 text-[#0066B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#0066B3]">{t.saveContact}</span>
                </button>

                {/* Share Profile */}
                <button
                  onClick={() => navigate('/share')}
                  className="bg-[#0066B3] rounded-3xl p-6 flex flex-col items-center justify-center gap-3 group active:scale-[0.98] transition-all shadow-[0_10px_25px_rgba(0,102,179,0.2)] hover:shadow-[0_15px_30px_rgba(0,102,179,0.3)]"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white">{t.shareTitle}</span>
                </button>

                {/* Maps */}
                <button
                  onClick={() => setIsMapModalOpen(true)}
                  className="glass rounded-3xl p-6 flex flex-col items-center justify-center gap-3 group active:scale-[0.98] transition-all hover:bg-white/5 border border-white/5"
                >
                  <img src="/logos/googlemapsicon.svg" alt="Google Maps" className="w-8 h-8" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{t.viewOffices}</span>
                </button>
              </div>

              {/* Secondary Row - Copy & Social - Flex container for better wrapping */}
              <div className="flex flex-wrap justify-center gap-3">
                {/* Facebook */}
                <button
                  onClick={onFacebook}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-white/5 transition-all w-28 flex-grow"
                >
                  <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-[7px] font-black tracking-wider uppercase text-white/40">Facebook</span>
                </button>

                {/* Copy Phone */}
                <button
                  onClick={() => copyToClipboard('+51937375605', t.phoneCopied)}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-white/5 transition-all w-28 flex-grow"
                >
                  <svg className="w-6 h-6 text-[#0066B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-[7px] font-black tracking-wider uppercase text-white/40">Copiar N°</span>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={onLinkedIn}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-white/5 transition-all w-28 flex-grow"
                >
                  <svg className="w-6 h-6 text-[#0077B5]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="text-[7px] font-black tracking-wider uppercase text-white/40">LinkedIn</span>
                </button>

                {/* WeChat Copy ID */}
                <button
                  onClick={() => copyToClipboard('kLoeu0k7pYa62s_a86zOCH4', t.wechatCopied)}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-white/5 transition-all w-28 flex-grow"
                >
                  <svg className="w-6 h-6 text-[#07C160]" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11.176 14.429c-2.665 0-4.826-1.8-4.826-4.018 0-2.22 2.159-4.02 4.824-4.02S16 8.191 16 10.411c0 1.21-.65 2.301-1.666 3.036a.32.32 0 0 0-.12.366l.218.81a.6.6 0 0 1 .029.117.166.166 0 0 1-.162.162.2.2 0 0 1-.092-.03l-1.057-.61a.5.5 0 0 0-.256-.074.5.5 0 0 0-.142.021 5.7 5.7 0 0 1-1.576.22M9.064 9.542a.647.647 0 1 0 .557-1 .645.645 0 0 0-.646.647.6.6 0 0 0 .09.353Zm3.232.001a.646.646 0 1 0 .546-1 .645.645 0 0 0-.644.644.63.63 0 0 0 .098.356" />
                    <path d="M0 6.826c0 1.455.781 2.765 2.001 3.656a.385.385 0 0 1 .143.439l-.161.6-.1.373a.5.5 0 0 0-.032.14.19.19 0 0 0 .193.193q.06 0 .111-.029l1.268-.733a.6.6 0 0 1 .308-.088q.088 0 .171.025a6.8 6.8 0 0 0 1.625.26 4.5 4.5 0 0 1-.177-1.251c0-2.936 2.785-5.02 5.824-5.02l.15.002C10.587 3.429 8.392 2 5.796 2 2.596 2 0 4.16 0 6.826m4.632-1.555a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0m3.875 0a.77.77 0 1 1-1.54 0 .77.77 0 0 1 1.54 0" />
                  </svg>
                  <span className="text-[7px] font-black tracking-wider uppercase text-white/40">Copiar ID</span>
                </button>

                {/* Email Personal - Opens Gmail Web */}
                <button
                  onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=jhoncarlosperezcubas@gmail.com&su=Consulta%20%E2%80%93%20Tarjeta%20FOTON&body=Hola%20Jhon,', '_blank')}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-white/5 transition-all w-28 flex-grow"
                >
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[7px] font-black tracking-wider uppercase text-white/40">Email</span>
                </button>

                {/* Email Corporativo - Opens Gmail Web */}
                <button
                  onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=jhoncarlosperezcubas@gmail.com&su=Consulta%20%E2%80%93%20Tarjeta%20FOTON&body=Hola%20Jhon,', '_blank')}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-white/5 transition-all w-28 flex-grow"
                >
                  <svg className="w-6 h-6 text-[#0066B3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[7px] font-black tracking-wider uppercase text-white/40">Corp</span>
                </button>

                {/* Website */}
                <button
                  onClick={onWebsite}
                  className="glass rounded-2xl p-4 flex flex-col items-center gap-2 group hover:bg-white/5 transition-all w-28 flex-grow"
                >
                  <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-[7px] font-black tracking-wider uppercase text-white/40">Web</span>
                </button>
              </div>
            </div>

            {/* Explore Models CTA */}
            <div className="px-6 lg:px-12 pb-8 bg-[#121212]">
              <button
                onClick={handleNavigateToListings}
                className="w-full max-w-6xl mx-auto glass rounded-3xl p-6 flex items-center justify-between group hover:bg-white/5 transition-all active:scale-[0.99]"
              >
                <div className="text-left">
                  <p className="text-[9px] text-[#0066B3] font-black uppercase tracking-[0.4em] mb-1">Galería</p>
                  <h3 className="text-lg lg:text-xl font-bold text-white">{t.collection}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden lg:block text-[10px] font-black tracking-[0.3em] uppercase text-white/60 group-hover:text-[#0066B3] transition-colors">
                    {t.allModels}
                  </span>
                  <svg className="w-5 h-5 text-[#0066B3] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Company Card Section - With Highlighted Lima Address */}
            <div className="px-6 lg:px-12 py-12 bg-[#1a1a1a] border-t border-white/5">
              <div className="max-w-4xl mx-auto glass rounded-[2rem] p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white tracking-tight">Foton International Trade Co., Ltd.</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">Estrategia comercial & Representante</p>
                  </div>
                  <img src="/logos/foton-logo-white.png" className="h-4 object-contain opacity-50" alt="FOTON Logo" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Beijing Address */}
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#0066B3] flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-left flex-1">
                      <p className="text-[8px] text-white/30 uppercase font-black tracking-widest mb-1">Dirección Beijing</p>
                      <p className="text-xs text-white/70 leading-relaxed">No.15, Shayang Rd., Changping, Beijing 102206, China</p>
                    </div>
                  </div>

                  {/* Lima Address - HIGHLIGHTED */}
                  <div className="relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br from-[#0066B3]/20 to-[#0088E5]/10 border border-[#0066B3]/30 shadow-[0_0_20px_rgba(0,102,179,0.2)]">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#0066B3]/10 rounded-full blur-2xl" />
                    <div className="relative flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        {/* Logo oficial de Google Maps */}
                        <img src="/logos/googlemapsicon.svg" alt="Google Maps" className="w-5 h-5" />
                      </div>
                      <div className="text-left flex-1 space-y-3">
                        <div>
                          <p className="text-[8px] text-[#0066B3] uppercase font-black tracking-widest mb-1">Dirección Lima</p>
                          <p className="text-xs text-white/90 leading-relaxed font-medium">Av. Guardia Civil 1321, Int. 802, Surquillo, Lima, Perú</p>
                        </div>
                        <button
                          onClick={() => setIsMapModalOpen(true)}
                          className="text-[9px] font-black uppercase tracking-widest text-[#0066B3] hover:text-[#0088E5] transition-colors flex items-center gap-2 group"
                        >
                          {t.viewOffices}
                          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Minimal */}
            <div className="px-8 py-8 bg-[#121212] border-t border-white/5 text-center">
              <p className="text-[10px] font-black tracking-[0.3em] text-[#0066B3]">{t.footerCopyright}</p>
            </div>

            {/* Google Maps Modal */}
            <OfficeMapModal
              isOpen={isMapModalOpen}
              onClose={() => setIsMapModalOpen(false)}
              lang={lang}
            />
          </div>
          );
};

          export default HomeScreen;
