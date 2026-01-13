import React from 'react';
import { Language, translations } from '../translations';
import { downloadVCard } from '../utils/vcard';

interface ShareScreenProps {
    lang: Language;
}

const ShareScreen: React.FC<ShareScreenProps> = ({ lang }) => {
    const t = translations[lang];
    const [showQRModal, setShowQRModal] = React.useState(false);

    const shareProfile = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Jhon Carlos Pérez Cubas — FOTON',
                    text: 'Contacto oficial de Jhon Carlos Pérez Cubas — Gerente comercial en FOTON (Perú). WhatsApp, correo y LinkedIn.',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert("Sharing is not supported on this browser.");
        }
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert(t.linkCopied);
    };

    const downloadQR = () => {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`;

        fetch(qrUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'foton-qr-code.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(() => alert('Error downloading QR code'));
    };

    return (
        <div className="min-h-screen p-6 lg:p-12 flex flex-col items-center bg-[#121212] animate-in slide-in-from-bottom duration-700 relative">
            <div className="text-center space-y-3 mb-12">
                <p className="text-[10px] text-[#0066B3] font-black uppercase tracking-[0.5em]">{t.shareTitle}</p>
                <h2 className="text-3xl lg:text-5xl font-light text-white">Comparte mi <span className="italic serif gold-gradient">tarjeta digital</span></h2>
            </div>

            <div className="w-full max-w-md space-y-4">
                {/* 1. Share Profile (Native) */}
                <button
                    onClick={shareProfile}
                    className="w-full relative group overflow-hidden rounded-[2rem] p-6 bg-gradient-to-r from-[#0066B3] to-[#0088E5] shadow-[0_10px_30px_rgba(0,102,179,0.3)] hover:shadow-[0_20px_40px_rgba(0,102,179,0.4)] transition-all active:scale-[0.98] text-left flex items-center justify-between"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-white tracking-tight">Compartir Tarjeta</h3>
                        <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider mt-1">Enviar perfil</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10 group-hover:bg-white group-hover:text-[#0066B3] transition-colors text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                    </div>
                </button>

                {/* 2. QR Code Button */}
                <button
                    onClick={() => setShowQRModal(true)}
                    className="w-full glass rounded-[2rem] p-6 text-left flex items-center justify-between group hover:bg-white/5 border border-white/5 transition-all active:scale-[0.98]"
                >
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white tracking-tight">Código QR</h3>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-wider">Mostrar código para escanear</p>
                    </div>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#0066B3] group-hover:text-white transition-colors text-white/40">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4h2v-4zM5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    </div>
                </button>

                {/* 3. Save Contact */}
                <button
                    onClick={downloadVCard}
                    className="w-full glass rounded-[2rem] p-6 text-left flex items-center justify-between group hover:bg-white/5 border border-white/5 transition-all active:scale-[0.98]"
                >
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white tracking-tight">{t.saveContact}</h3>
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-wider">Guardar en agenda</p>
                    </div>
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#0066B3] group-hover:text-white transition-colors text-white/40">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </div>
                </button>
            </div>

            {/* QR Modal Overlay */}
            {showQRModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full relative animate-in zoom-in-50 duration-300">
                        <button
                            onClick={() => setShowQRModal(false)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>

                        <div className="flex flex-col items-center gap-8 pt-4">
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white">Escanea el QR</h3>
                                <p className="text-xs text-white/50">Comparte mi tarjeta al instante</p>
                            </div>

                            {/* Large QR Display */}
                            <div className="p-4 bg-white rounded-3xl shadow-[0_0_50px_rgba(0,102,179,0.2)]">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.href)}`}
                                    alt="QR Code"
                                    className="w-48 h-48 lg:w-56 lg:h-56 object-contain"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 w-full">
                                <button
                                    onClick={downloadQR}
                                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors group"
                                >
                                    <svg className="w-6 h-6 text-[#0066B3] group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Descargar</span>
                                </button>
                                <button
                                    onClick={copyLink}
                                    className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors group"
                                >
                                    <svg className="w-6 h-6 text-[#0066B3] group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Copiar Link</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Note */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-[9px] text-white/20 italic max-w-md mx-auto">{t.footerNote}</p>
            </div>
        </div>
    );
};

export default ShareScreen;
