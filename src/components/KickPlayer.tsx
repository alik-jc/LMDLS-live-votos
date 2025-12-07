import { useState, useEffect } from 'react';
import { Minimize2, X, Signal, Volume2, VolumeX } from 'lucide-react';

interface KickPlayerProps {
    channelSlug: string;
    isDark: boolean;
    isOpen: boolean;
    onClose: () => void;
    embedded?: boolean;
}

const MUTE_CACHE_KEY = 'mansion_kick_mute_preference';

export const KickPlayer = ({ channelSlug, isDark, isOpen, onClose, embedded = false }: KickPlayerProps) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [isCheckingStream, setIsCheckingStream] = useState(true);

    // Initialize mute state from localStorage (default to true/muted if not set)
    const [isMuted, setIsMuted] = useState(() => {
        const saved = localStorage.getItem(MUTE_CACHE_KEY);
        return saved !== null ? saved === 'true' : true;
    });

    useEffect(() => {
        if (!isOpen) return;

        const checkStreamStatus = async () => {
            try {
                // Mock check - in real app would check API
                await new Promise(resolve => setTimeout(resolve, 800));
                setIsLive(true);
            } catch {
                setIsLive(false);
            } finally {
                setIsCheckingStream(false);
            }
        };
        checkStreamStatus();
    }, [isOpen]);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        localStorage.setItem(MUTE_CACHE_KEY, String(newMutedState));
    };

    if (!isOpen) return null;

    if (embedded) {
        return (
            <div className={`w-full aspect-video rounded-xl overflow-hidden border ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'} shadow-2xl group relative`}>
                <div className="w-full h-full bg-black relative">
                    {isLive ? (
                        <>
                            <iframe
                                src={`https://player.kick.com/${channelSlug}?autoplay=true&muted=${isMuted}`}
                                className="w-full h-full"
                                frameBorder="0"
                                allowFullScreen
                                title="Kick Stream"
                            ></iframe>

                            {/* Mute Toggle Overlay */}
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                                title={isMuted ? "Activar sonido" : "Silenciar"}
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                        </>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
                            <Signal className="text-gray-600 mb-2" size={32} />
                            <p className="text-gray-500 text-xs mb-3">El canal no está transmitiendo.</p>
                            <a href={`https://kick.com/${channelSlug}`} target="_blank" rel="noopener noreferrer" className="bg-[#53fc18] text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-[#42ca12]">Ir al Canal</a>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-all duration-300 shadow-2xl ${isMinimized ? 'w-64 h-12' : 'w-80 sm:w-96 aspect-video'}`}>
            <div className={`${isDark ? 'bg-[#0a0a0a] border-[#8c3034]' : 'bg-white border-gray-300'} border rounded-lg overflow-hidden flex flex-col h-full shadow-2xl`}>
                <div
                    className={`${isDark ? 'bg-[#151515]' : 'bg-gray-100'} px-3 py-2 flex justify-between items-center border-b ${isDark ? 'border-white/5' : 'border-gray-200'} cursor-pointer`}
                    onClick={() => setIsMinimized(!isMinimized)}
                >
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#53fc18] animate-pulse' : 'bg-gray-400'}`}></span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {isCheckingStream ? '...' : (isLive ? 'EN VIVO' : 'OFFLINE')}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Minimize2 size={14} className={isDark ? "text-gray-400" : "text-gray-600"} />
                        <button onClick={(e) => { e.stopPropagation(); onClose(); }}><X size={14} className={isDark ? "text-gray-400" : "text-gray-600"} /></button>
                    </div>
                </div>
                {!isMinimized && (
                    <div className="flex-1 bg-black relative group">
                        {isLive ? (
                            <>
                                <iframe
                                    src={`https://player.kick.com/${channelSlug}?autoplay=true&muted=${isMuted}`}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Kick Stream"
                                ></iframe>

                                {/* Mute Toggle Overlay */}
                                <button
                                    onClick={toggleMute}
                                    className="absolute bottom-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                                    title={isMuted ? "Activar sonido" : "Silenciar"}
                                >
                                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                </button>
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
                                <Signal className="text-gray-600 mb-2" size={32} />
                                <p className="text-gray-500 text-xs mb-3">El canal no está transmitiendo.</p>
                                <a href={`https://kick.com/${channelSlug}`} target="_blank" rel="noopener noreferrer" className="bg-[#53fc18] text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-[#42ca12]">Ir al Canal</a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
