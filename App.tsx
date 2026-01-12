
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Language, translations } from './translations';
import HomeScreen from './components/HomeScreen';
import ListingsScreen from './components/ListingsScreen';
import ShareScreen from './components/ShareScreen';
import Navigation from './components/Navigation';
import VehicleDetailScreen from './components/VehicleDetailScreen';
import { FOTON_VEHICLES } from './data/fotonVehicles';

const WHATSAPP_NUMBER = "51937375605";

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const location = useLocation();
  const t = translations[lang];

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.location.href = "tel:+51937375605";
  };

  const handleEmail = () => {
    window.location.href = "mailto:jhoncarlosperezcubas@gmail.com";
  };

  const handleCorporateEmail = () => {
    window.location.href = "mailto:jhonperez@foton.com.cn";
  };

  const handleLinkedIn = () => {
    window.open("https://www.linkedin.com/in/jhon-pérez-cubas-a4193144/", "_blank");
  };

  const handleWebsite = () => {
    window.open("https://www.fotonmotor.com", "_blank");
  };

  const handleWeChat = () => {
    window.open("https://u.wechat.com/kLoeu0k7pYa62s_a86zOCH4?s=2", "_blank");
  };

  const handleFacebook = () => {
    window.open("https://www.facebook.com/Foton.IncaPower", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center">
      <Navigation lang={lang} />

      <main className="w-full max-w-[500px] lg:max-w-[1100px] min-h-screen pt-16 lg:pt-20 transition-all duration-200 ease-out">
        <div className="relative overflow-hidden lg:rounded-b-[2rem] bg-[#121212] border-x border-white/5 animate-card shadow-2xl">
          <Routes>
            <Route
              path="/"
              element={
                <HomeScreen
                  lang={lang}
                  setLang={setLang}
                  onWhatsApp={() => openWhatsApp(t.waHome)}
                  onCall={handleCall}
                  onEmail={handleEmail}
                  onCorporateEmail={handleCorporateEmail}
                  onLinkedIn={handleLinkedIn}
                  onWebsite={handleWebsite}
                  onWeChat={handleWeChat}
                  onFacebook={handleFacebook}
                />
              }
            />
            <Route
              path="/listings"
              element={
                <ListingsScreen
                  lang={lang}
                  onInquiry={(v) => openWhatsApp(t.waModel(v.brand, v.model))}
                />
              }
            />
            <Route
              path="/listings/:category"
              element={
                <ListingsScreen
                  lang={lang}
                  onInquiry={(v) => openWhatsApp(t.waModel(v.brand, v.model))}
                />
              }
            />
            <Route path="/share" element={<ShareScreen lang={lang} />} />
            <Route
              path="/vehicle/:id"
              element={
                <VehicleDetailRouteWrapper
                  lang={lang}
                  onInquiry={(v) => openWhatsApp(t.waModel(v.brand, v.model))}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      {location.pathname !== '/share' && (
        <button
          onClick={() => openWhatsApp(t.waGeneral)}
          className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-[80] w-14 h-14 lg:w-16 lg:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.3)] active:scale-90 transition-all hover:scale-110"
        >
          <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.902 7.902 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
          </svg>
        </button>
      )}

      {/* Language Selector */}
      {location.pathname !== '/share' && (
        <div className="fixed bottom-24 right-6 lg:bottom-32 lg:right-10 z-[80] flex flex-col gap-2 glass rounded-full p-2 shadow-lg animate-in slide-in-from-bottom-4 duration-500">
          <button
            onClick={() => setLang('es')}
            className={`w-10 h-10 rounded-full text-[10px] font-black tracking-wider transition-all flex items-center justify-center ${lang === 'es'
              ? 'bg-[#0066B3] text-white shadow-md scale-110'
              : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
          >
            ES
          </button>
          <button
            onClick={() => setLang('en')}
            className={`w-10 h-10 rounded-full text-[10px] font-black tracking-wider transition-all flex items-center justify-center ${lang === 'en'
              ? 'bg-[#0066B3] text-white shadow-md scale-110'
              : 'text-white/40 hover:text-white/60 hover:bg-white/5'
              }`}
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
};

const VehicleDetailRouteWrapper: React.FC<{ lang: Language; onInquiry: (v: any) => void }> = ({ lang, onInquiry }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vehicle = FOTON_VEHICLES.find(v => v.id === id);

  if (!vehicle) return <Navigate to="/listings" replace />;

  return (
    <VehicleDetailScreen
      vehicle={vehicle}
      lang={lang}
      onBack={() => navigate(-1)}
      onBook={onInquiry}
      onShare={() => { /* Shared logic already in Listings/HomeScreen */ }}
    />
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
