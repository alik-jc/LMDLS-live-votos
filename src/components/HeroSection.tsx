import React, { useState } from 'react';
import { Users, Activity, Clock, MessageSquare, Maximize2, Minimize2, MessageSquareOff, Play, X } from 'lucide-react';
import { KickPlayer } from './KickPlayer';

interface HeroSectionProps {
    timeLeft: string;
    totalVotes: number;
    activeParticipants: number;
    isTheaterMode: boolean;
    toggleTheaterMode: () => void;
    showChat: boolean;
    toggleChat: () => void;
    isDark: boolean;
    isNoVotingState: boolean;
    voteUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    timeLeft,
    totalVotes,
    activeParticipants,
    isTheaterMode,
    toggleTheaterMode,
    showChat,
    toggleChat,
    isDark,
    isNoVotingState,
    voteUrl
}) => {
    const [showStream, setShowStream] = useState(false);

    const StatsGrid = () => (
        <div className={`grid grid-cols-3 gap-4 mt-8 border-t pt-6 ${isDark ? 'border-white/5' : 'border-gray-200'}`}>
            <div className={`p-4 rounded-lg border text-center group transition-colors ${isDark ? 'bg-[#111] border-white/5 hover:border-red-900/30' : 'bg-white border-gray-200'}`}>
                <Users size={16} className="mx-auto mb-2 text-gray-500 group-hover:text-red-500 transition-colors" />
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Votos</div>
                <div className={`text-2xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>{totalVotes.toLocaleString()}</div>
            </div>
            <div className={`p-4 rounded-lg border text-center group transition-colors ${isDark ? 'bg-[#111] border-white/5 hover:border-red-900/30' : 'bg-white border-gray-200'}`}>
                <Activity size={16} className="mx-auto mb-2 text-gray-500 group-hover:text-red-500 transition-colors" />
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Activos</div>
                <div className={`text-2xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>{activeParticipants}</div>
            </div>
            <div className={`p-4 rounded-lg border text-center group transition-colors relative overflow-hidden ${isDark ? 'bg-[#111] border-white/5 hover:border-red-900/30' : 'bg-white border-gray-200'}`}>
                <div className="absolute inset-0 bg-red-900/5 z-0"></div>
                <Clock size={16} className="mx-auto mb-2 text-red-500 relative z-10" />
                <div className="text-xs text-red-400 uppercase tracking-wider mb-1 relative z-10">Cierre</div>
                <div className={`text-2xl font-serif relative z-10 tabular-nums ${isDark ? 'text-white' : 'text-gray-900'}`}>{timeLeft}</div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Column: Info & Context */}
            {!isTheaterMode && (
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-gradient-to-r from-[#8c3034] to-[#c45a5e] text-white text-xs font-bold px-3 py-1 rounded border border-[#8c3034] animate-pulse shadow-lg">
                            🏆 DÍA 7 • FINAL
                        </span>
                        <span className="text-gray-400 text-xs uppercase tracking-wider">• {isNoVotingState ? 'Votación Finalizada' : 'Votación en tiempo real'}</span>
                    </div>

                    <div>
                        <h1 className={`text-3xl md:text-6xl font-serif mb-2 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {isNoVotingState ? 'Votación' : 'Eliminación'} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
                                {isNoVotingState ? 'Finalizada' : 'en Proceso'}
                            </span>
                        </h1>
                        <p className="text-gray-500 italic text-sm border-l-2 border-[#8c3034] pl-3 mt-4">
                            *Los resultados pueden variar por decisión de producción.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        {!isNoVotingState && (
                            <a
                                href={voteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#8c3034] hover:bg-[#70262a] text-white font-bold py-4 px-8 rounded shadow-lg transition-all transform hover:scale-105 uppercase tracking-widest text-sm w-full sm:w-auto text-center"
                            >
                                Votar Ahora
                            </a>
                        )}
                        <button
                            onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}
                            className={`border font-bold py-4 px-8 rounded shadow-sm transition-all transform hover:scale-105 uppercase tracking-widest text-sm w-full sm:w-auto text-center ${isDark ? 'border-white/20 hover:bg-white/5 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-900'}`}
                        >
                            Ver Ranking
                        </button>
                    </div>

                    {/* Stats Grid - Normal Mode */}
                    <StatsGrid />
                </div>
            )}

            {/* Right Column: Video Embed */}
            <div className={`${isTheaterMode ? 'col-span-12' : 'lg:col-span-7'}`}>
                {showStream ? (
                    <div className={`relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border group ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                        <div className="absolute top-4 right-4 z-20 flex gap-2">
                            <button
                                onClick={() => setShowStream(false)}
                                className="bg-black/60 backdrop-blur text-xs font-bold text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-black/80 transition"
                            >
                                <X size={14} /> CERRAR
                            </button>
                            <button
                                onClick={toggleChat}
                                className="bg-black/60 backdrop-blur text-xs font-bold text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-black/80 transition"
                            >
                                {showChat ? <><MessageSquareOff size={14} /> OCULTAR CHAT</> : <><MessageSquare size={14} /> MOSTRAR CHAT</>}
                            </button>
                            <button
                                onClick={toggleTheaterMode}
                                className="bg-black/60 backdrop-blur text-xs font-bold text-white px-3 py-1.5 rounded flex items-center gap-2 hover:bg-black/80 transition"
                            >
                                {isTheaterMode ? <><Minimize2 size={14} /> SALIR MODO TEATRO</> : <><Maximize2 size={14} /> MODO TEATRO</>}
                            </button>
                        </div>

                        <KickPlayer
                            channelSlug="westcol"
                            isDark={isDark}
                            isOpen={true}
                            onClose={() => setShowStream(false)}
                            embedded={true}
                            showChat={showChat}
                            onToggleChat={toggleChat}
                        />
                    </div>
                ) : (
                    <div className={`relative aspect-video rounded-xl overflow-hidden shadow-2xl border flex flex-col items-center justify-center ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
                        <div className="text-center p-8">
                            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? 'bg-[#8c3034]/20' : 'bg-[#8c3034]/10'}`}>
                                <Play size={32} className="text-[#8c3034] ml-1" />
                            </div>
                            <h3 className={`text-xl font-serif mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                Transmisión en Vivo
                            </h3>
                            <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                Mira la transmisión de La Mansión en Kick
                            </p>
                            <button
                                onClick={() => setShowStream(true)}
                                className="bg-[#8c3034] hover:bg-[#70262a] text-white font-bold py-3 px-6 rounded shadow-lg transition-all transform hover:scale-105 uppercase tracking-widest text-sm flex items-center gap-2 mx-auto"
                            >
                                <Play size={16} /> Ver Stream
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats Grid - Theater Mode */}
                {isTheaterMode && (
                    <div className="mt-8 max-w-4xl mx-auto">
                        <StatsGrid />
                    </div>
                )}
            </div>
        </div>
    );
};
