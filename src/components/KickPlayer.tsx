import { useState, useEffect } from 'react';
import { Minimize2, X, Signal, MessageSquare, MessageSquareOff, ExternalLink, Loader2 } from 'lucide-react';

interface KickPlayerProps {
    channelSlug: string;
    isDark: boolean;
    isOpen: boolean;
    onClose: () => void;
    embedded?: boolean;
    showChat?: boolean;
    onToggleChat?: () => void;
}

export const KickPlayer = ({
    channelSlug,
    isDark,
    isOpen,
    onClose,
    embedded = false,
    showChat = false,
    onToggleChat
}: KickPlayerProps) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isLive, setIsLive] = useState(false);
    const [isCheckingStream, setIsCheckingStream] = useState(true);

    useEffect(() => {
        if (!isOpen) return;

        const checkStreamStatus = async () => {
            try {
                const response = await fetch(`https://corsproxy.io/?https://kick.com/api/v2/channels/${channelSlug}?_=${Date.now()}`);
                if (!response.ok) throw new Error('Failed to fetch channel data');

                const data = await response.json();

                if (data && data.playback_url) {
                    setIsLive(true);
                } else {
                    setIsLive(false);
                }
            } catch (error) {
                console.error("Error checking stream status:", error);
                setIsLive(false);
            } finally {
                setIsCheckingStream(false);
            }
        };

        checkStreamStatus();
        // Poll every minute to check if stream started/ended
        const interval = setInterval(checkStreamStatus, 60000);
        return () => clearInterval(interval);
    }, [isOpen, channelSlug]);

    if (!isOpen) return null;

    const renderPlayerContent = () => (
        <div className="w-full h-full bg-black relative group">
            {isCheckingStream && !isLive ? (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <Loader2 className="animate-spin text-gray-500" size={32} />
                </div>
            ) : isLive ? (
                <>
                    <iframe
                        src={`https://player.kick.com/${channelSlug}?autoplay=true`}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        allow="autoplay; encrypted-media; picture-in-picture"
                        title="Kick Player"
                    ></iframe>

                    {/* Controls Overlay - Only for Chat Toggle */}
                    {onToggleChat && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggleChat(); }}
                                className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                                title={showChat ? "Ocultar chat" : "Mostrar chat"}
                            >
                                {showChat ? <MessageSquareOff size={20} /> : <MessageSquare size={20} />}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-900">
                    <Signal className="text-gray-600 mb-2" size={32} />
                    <p className="text-gray-500 text-xs mb-3">El canal no está transmitiendo.</p>
                    <a href={`https://kick.com/${channelSlug}`} target="_blank" rel="noopener noreferrer" className="bg-[#53fc18] text-black px-4 py-1.5 rounded text-xs font-bold hover:bg-[#42ca12]">Ir al Canal</a>
                </div>
            )}
        </div>
    );

    if (embedded) {
        return (
            <div className={`w-full rounded-xl overflow-hidden border ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-gray-200'} shadow-2xl group relative transition-all duration-300`}>
                <div className={`flex flex-col lg:flex-row ${showChat ? 'h-[600px] lg:h-[500px]' : 'aspect-video'}`}>
                    {/* Video Section */}
                    <div className="flex-1 bg-black relative h-full">
                        {renderPlayerContent()}
                    </div>

                    {/* Chat Section */}
                    {showChat && (
                        <div className="w-full lg:w-[350px] h-[400px] lg:h-full border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0b0e0f] relative">
                            {/* Note: Kick might block embedding the chatroom directly. If so, we show a fallback. */}
                            <iframe
                                src={`https://kick.com/${channelSlug}/chatroom`}
                                className="w-full h-full relative z-10"
                                frameBorder="0"
                                title="Kick Chat"
                            ></iframe>

                            {/* Fallback/Loading info behind iframe (visible if iframe fails/blocks) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-0">
                                <p className="text-gray-400 text-sm mb-2">Si el chat no carga, úsalo en una ventana nueva.</p>
                                <a
                                    href={`https://kick.com/${channelSlug}/chatroom`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded text-sm font-bold text-white transition-colors"
                                >
                                    <ExternalLink size={14} /> Abrir Chat
                                </a>
                            </div>
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
                        {renderPlayerContent()}
                    </div>
                )}
            </div>
        </div>
    );
};
