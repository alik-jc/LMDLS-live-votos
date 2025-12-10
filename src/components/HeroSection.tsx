import { useState } from 'react';
import { Users, Clock, MessageSquare, Maximize2, Minimize2, MessageSquareOff, Play, X, Zap, Radio } from 'lucide-react';
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
    // Event configuration
    currentDay: number;
    totalDays: number;
    isFinal: boolean;
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
    voteUrl,
    currentDay,
    totalDays,
    isFinal
}) => {
    const [showStream, setShowStream] = useState(false);

    // Stats Cards con glassmorphism
    const StatsCard = ({ icon: Icon, label, value, isHighlighted = false }: {
        icon: React.ElementType;
        label: string;
        value: string | number;
        isHighlighted?: boolean;
    }) => (
        <div className={`
            relative p-4 rounded-2xl text-center group transition-all duration-300 overflow-hidden
            ${isHighlighted
                ? 'bg-gradient-to-br from-[#8c3034]/30 to-[#4a1a1c]/30 border border-[#8c3034]/40'
                : 'bg-white/[0.03] border border-white/[0.08] hover:border-[#8c3034]/30 hover:bg-white/[0.05]'
            }
            backdrop-blur-sm
        `}>
            {/* Glow effect on hover */}
            <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                bg-gradient-to-t from-[#8c3034]/10 to-transparent
            `} />

            <div className="relative z-10">
                <div className={`
                    w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center
                    ${isHighlighted
                        ? 'bg-[#8c3034]/30'
                        : 'bg-white/[0.05] group-hover:bg-[#8c3034]/20'
                    }
                    transition-colors duration-300
                `}>
                    <Icon size={18} className={`${isHighlighted ? 'text-[#ff6b6b]' : 'text-gray-400 group-hover:text-[#8c3034]'} transition-colors`} />
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-[0.15em] mb-1 font-medium">{label}</div>
                <div className={`text-2xl font-serif tabular-nums ${isHighlighted ? 'text-white' : 'text-white/90'}`}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </div>
            </div>
        </div>
    );

    const StatsGrid = () => (
        <div className="grid grid-cols-3 gap-3 mt-6">
            <StatsCard icon={Users} label="Votos Totales" value={totalVotes} />
            <StatsCard icon={Zap} label="Participantes" value={activeParticipants} />
            <StatsCard icon={Clock} label="Cierra en" value={timeLeft} isHighlighted />
        </div>
    );

    return (
        <div className="relative">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0c]/50 via-transparent to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 pt-8 pb-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 relative z-10">

                {/* Left Column: Info & Context */}
                {!isTheaterMode && (
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
                        {/* Badges row */}
                        <div className="flex flex-wrap items-center gap-2">
                            {isFinal ? (
                                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-yellow-500/20">
                                    <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                                    🏆 GRAN FINAL
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#8c3034] to-[#6b2428] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/20">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    EN VIVO
                                </span>
                            )}
                            <span className={`
                                text-[10px] font-bold px-3 py-1.5 rounded-full border
                                ${isFinal
                                    ? 'bg-[#8c3034]/20 border-[#8c3034]/30 text-[#ff8888]'
                                    : 'bg-white/[0.03] border-white/10 text-gray-300'
                                }
                            `}>
                                DÍA {currentDay} {currentDay === totalDays ? '• FINAL' : `/ ${totalDays}`}
                            </span>
                        </div>

                        {/* Title section */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] tracking-tight">
                                {isNoVotingState ? (
                                    <>
                                        <span className="text-white">Votación</span>
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
                                            Finalizada
                                        </span>
                                    </>
                                ) : isFinal ? (
                                    <>
                                        <span className="text-white">El Rey y la Reina</span>
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#ffcc00] to-[#ffaa00]">
                                            de La Mansión
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-white">Eliminación</span>
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-300 to-gray-500">
                                            en Proceso
                                        </span>
                                    </>
                                )}
                            </h1>

                            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
                                {isFinal ? (
                                    <>
                                        La primera <span className="text-gray-300">Universidad de Streaming</span> en Latinoamérica llega a su fin.
                                        Hoy se corona al ganador.
                                    </>
                                ) : (
                                    <>
                                        <span className="text-gray-300">Universidad de Streaming Latinoamérica</span>
                                        <br />
                                        Día {currentDay} de {totalDays} • Convivencia, retos y eliminaciones.
                                    </>
                                )}
                            </p>

                            <p className={`
                                text-gray-500 text-xs pl-3 border-l-2 
                                ${isFinal ? 'border-[#ffd700]/50' : 'border-[#8c3034]/50'}
                            `}>
                                *Los resultados pueden variar por decisión de producción.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            {!isNoVotingState && (
                                <a
                                    href={voteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        group relative overflow-hidden
                                        bg-gradient-to-r from-[#8c3034] to-[#6b2428] 
                                        text-white font-bold py-3.5 px-8 rounded-xl
                                        shadow-lg shadow-red-900/30 
                                        transition-all duration-300 transform hover:scale-[1.02] hover:shadow-red-900/50
                                        uppercase tracking-widest text-xs text-center
                                    "
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <Zap size={14} className="group-hover:animate-pulse" />
                                        Votar Ahora
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#9c4044] to-[#7b2e32] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                            )}
                            <button
                                onClick={() => document.getElementById('ranking')?.scrollIntoView({ behavior: 'smooth' })}
                                className="
                                    border border-white/10 bg-white/[0.02] backdrop-blur-sm
                                    text-white font-bold py-3.5 px-8 rounded-xl
                                    transition-all duration-300 transform hover:scale-[1.02]
                                    hover:bg-white/[0.05] hover:border-white/20
                                    uppercase tracking-widest text-xs text-center
                                "
                            >
                                Ver Ranking
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <StatsGrid />
                    </div>
                )}

                {/* Right Column: Video Embed */}
                <div className={`${isTheaterMode ? 'col-span-12' : 'lg:col-span-7'} flex flex-col`}>
                    {showStream ? (
                        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
                            {/* Controls overlay */}
                            <div className="absolute top-4 right-4 z-20 flex gap-2">
                                <button
                                    onClick={() => setShowStream(false)}
                                    className="bg-black/70 backdrop-blur-md text-xs font-bold text-white px-3 py-2 rounded-lg flex items-center gap-2 hover:bg-black/90 transition-all border border-white/10"
                                >
                                    <X size={14} /> CERRAR
                                </button>
                                <button
                                    onClick={toggleChat}
                                    className="hidden lg:flex bg-black/70 backdrop-blur-md text-xs font-bold text-white px-3 py-2 rounded-lg items-center gap-2 hover:bg-black/90 transition-all border border-white/10"
                                >
                                    {showChat ? <><MessageSquareOff size={14} /> OCULTAR CHAT</> : <><MessageSquare size={14} /> MOSTRAR CHAT</>}
                                </button>
                                <button
                                    onClick={toggleTheaterMode}
                                    className="hidden lg:flex bg-black/70 backdrop-blur-md text-xs font-bold text-white px-3 py-2 rounded-lg items-center gap-2 hover:bg-black/90 transition-all border border-white/10"
                                >
                                    {isTheaterMode ? <><Minimize2 size={14} /> NORMAL</> : <><Maximize2 size={14} /> TEATRO</>}
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
                        <>
                            {/* Desktop: Elegant placeholder */}
                            <div className="hidden lg:flex relative aspect-video rounded-2xl overflow-hidden border border-white/[0.08] flex-col items-center justify-center bg-gradient-to-br from-[#0d0d0d] via-[#111] to-[#0a0a0a] group hover:border-[#8c3034]/30 transition-all duration-500">
                                {/* Animated background glow */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8c3034]/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-700" />
                                </div>

                                {/* Grid pattern overlay */}
                                <div className="absolute inset-0 opacity-[0.03]" style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                    backgroundSize: '50px 50px'
                                }} />

                                <div className="relative z-10 text-center p-8">
                                    {/* Play button with glow */}
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 w-24 h-24 mx-auto bg-[#8c3034]/30 rounded-full blur-xl group-hover:bg-[#8c3034]/50 transition-all duration-500" />
                                        <button
                                            onClick={() => setShowStream(true)}
                                            className="relative w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#8c3034] to-[#5c1f22] flex items-center justify-center shadow-2xl shadow-red-900/40 group-hover:scale-110 transition-transform duration-300 border border-white/10"
                                        >
                                            <Play size={36} className="text-white ml-1" fill="white" fillOpacity={0.3} />
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-serif mb-2 text-white">
                                        Transmisión en Vivo
                                    </h3>
                                    <p className="text-sm text-gray-400 mb-6 flex items-center justify-center gap-2">
                                        <Radio size={14} className="text-[#8c3034]" />
                                        Mira La Mansión en Kick
                                    </p>

                                    <div className="inline-flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider bg-white/[0.03] px-4 py-2 rounded-full border border-white/[0.05]">
                                        <span className="w-1.5 h-1.5 bg-[#8c3034] rounded-full animate-pulse" />
                                        Click para ver
                                    </div>
                                </div>
                            </div>

                            {/* Mobile: Compact button */}
                            <div
                                role="button"
                                tabIndex={0}
                                onClick={() => {
                                    console.log('Mobile stream button clicked');
                                    setShowStream(true);
                                }}
                                onTouchEnd={(e) => {
                                    e.preventDefault();
                                    console.log('Mobile stream button touched');
                                    setShowStream(true);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        setShowStream(true);
                                    }
                                }}
                                className="
                                    lg:hidden w-full flex items-center gap-4 p-4 rounded-2xl 
                                    bg-gradient-to-r from-[#0d0d0d] to-[#111]
                                    border border-white/[0.08] hover:border-[#8c3034]/40
                                    transition-all duration-300 cursor-pointer select-none
                                    active:scale-[0.98]
                                "
                            >
                                {/* Play icon */}
                                <div className="relative flex-shrink-0 pointer-events-none">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8c3034] to-[#5c1f22] flex items-center justify-center shadow-lg border border-white/10">
                                        <Play size={22} className="text-white ml-0.5" fill="white" fillOpacity={0.3} />
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="text-left flex-1 min-w-0 pointer-events-none">
                                    <h3 className="text-base font-serif text-white truncate">
                                        Transmisión en Vivo
                                    </h3>
                                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                                        <Radio size={10} className="text-[#8c3034]" />
                                        Ver en Kick
                                    </p>
                                </div>

                                {/* Arrow indicator */}
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center pointer-events-none">
                                    <Play size={16} className="text-gray-400" />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Stats Grid - Theater Mode */}
                    {isTheaterMode && (
                        <div className="mt-8 max-w-4xl mx-auto w-full">
                            <StatsGrid />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
