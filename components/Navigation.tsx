
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, translations } from '../translations';

interface NavigationProps {
  lang: Language;
}

const Navigation: React.FC<NavigationProps> = ({ lang }) => {
  const t = translations[lang];
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: '/', label: t.navHome, icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: '/listings', label: t.navFleet, icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' },
    { id: '/share', label: t.navShare, icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z' }
  ];

  const getIsActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 lg:h-20 bg-[#050505]/90 backdrop-blur-md border-b border-white/5 flex justify-center items-center z-[100] transition-all duration-300">
      <div className="flex items-center gap-2 lg:gap-12">
        {navItems.map((item) => {
          const isActive = getIsActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`relative flex items-center gap-2 py-2 px-3 lg:px-6 rounded-full transition-all duration-200 active:scale-95 ${isActive ? 'bg-white/5 opacity-100' : 'opacity-40 hover:opacity-100 hover:bg-white/5'
                }`}
            >
              <svg className={`w-4 h-4 lg:w-5 lg:h-5 ${isActive ? 'text-[#0066B3]' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
              <span className={`text-[10px] lg:text-[12px] font-black tracking-[0.2em] lg:tracking-[0.4em] uppercase ${isActive ? 'text-[#0066B3]' : 'text-white'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 lg:-bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0066B3] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;

