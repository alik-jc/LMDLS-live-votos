import { Instagram, Video } from 'lucide-react';
import { getAvatar } from '../utils/helpers';
import type { Candidate } from '../types';

interface ParticipantsGridProps {
    candidates: Candidate[];
    isDark: boolean;
}

export const ParticipantsGrid = ({ candidates, isDark }: ParticipantsGridProps) => {
    const styles = {
        card: isDark
            ? 'bg-[#111] border-[#1f1f1f] hover:border-[#8c3034]/50'
            : 'bg-white border-gray-200 hover:border-[#8c3034]/50 shadow-sm',
        textPrimary: isDark ? 'text-white' : 'text-gray-900',
        textSecondary: isDark ? 'text-gray-400' : 'text-gray-500',
        icon: isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-[#8c3034]',
    };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-in fade-in slide-in-from-bottom-4">
            {candidates.map((candidate) => (
                <div
                    key={candidate.name}
                    className={`relative group p-4 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${styles.card}`}
                >
                    {/* Live Badge */}
                    {candidate.isLive && (
                        <div className={`absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full animate-pulse shadow-lg text-[10px] font-bold ${candidate.livePlatform === 'kick' ? 'bg-[#53fc18] text-black shadow-[#53fc18]/20' :
                            candidate.livePlatform === 'tiktok' ? 'bg-[#ff0050] text-white shadow-[#ff0050]/20' :
                                'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-500/20'
                            }`}>
                            <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                            LIVE
                        </div>
                    )}

                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-3">
                            <img
                                src={getAvatar(candidate.name)}
                                alt={candidate.name}
                                className={`w-20 h-20 rounded-full object-cover border-2 ${candidate.isLive ? 'border-red-500 ring-2 ring-red-500/30' : 'border-gray-200 dark:border-gray-700'}`}
                                loading="lazy"
                            />
                            {candidate.isLive && (
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur text-white text-[8px] px-2 rounded-full border border-white/10 uppercase tracking-wide">
                                    {candidate.livePlatform}
                                </div>
                            )}
                        </div>

                        <h3 className={`font-bold text-sm mb-1 truncate w-full ${styles.textPrimary}`}>
                            {candidate.name}
                        </h3>

                        <div className={`text-xs mb-3 ${styles.textSecondary}`}>
                            {candidate.votes.toLocaleString()} votos
                        </div>

                        {/* Socials */}
                        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-gray-100 dark:border-white/5 w-full justify-center">
                            {candidate.socials?.kick && (
                                <a
                                    href={`https://kick.com/${candidate.socials.kick}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1.5 rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-[#53fc18]/20 text-gray-400 hover:text-[#53fc18]' : 'bg-gray-100 hover:bg-[#53fc18]/20 text-gray-500 hover:text-[#53fc18]'}`}
                                    title="Kick"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M1.333 0h21.334C23.4 0 24 .6 24 1.333v21.334c0 .733-.6 1.333-1.333 1.333H1.333C.6 24 0 23.4 0 22.667V1.333C0 .6.6 0 1.333 0zm16.334 18.667v-4l-3.667-3.334 3.667-3.333V4h-4.667v5.333L9.333 5.667H5.333v12.666h4v-5.333l3.667 3.667v2h4z" />
                                    </svg>
                                </a>
                            )}
                            {candidate.socials?.of && (
                                <a
                                    href={`https://onlyfans.com/${candidate.socials.of}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1.5 rounded-full transition-colors ${isDark ? 'bg-white/5 hover:bg-[#00aff0]/20 text-gray-400 hover:text-[#00aff0]' : 'bg-gray-100 hover:bg-[#00aff0]/20 text-gray-500 hover:text-[#00aff0]'}`}
                                    title="OnlyFans"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path d="M21.434 17.318a4.5 4.5 0 0 0-1.123-8.324c.03-.22.045-.445.045-.672a6.75 6.75 0 0 0-13.5 0c0 .227.015.45.045.672a4.5 4.5 0 0 0-1.123 8.324A1.125 1.125 0 0 0 6.75 18h10.5a1.125 1.125 0 0 0 4.184-.682ZM12 13.5a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5Z" />
                                    </svg>
                                </a>
                            )}
                            {candidate.socials?.instagram && (
                                <a
                                    href={`https://instagram.com/${candidate.socials.instagram}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.icon}
                                    title="Instagram"
                                >
                                    <Instagram size={16} />
                                </a>
                            )}
                            {candidate.socials?.tiktok && (
                                <a
                                    href={`https://tiktok.com/@${candidate.socials.tiktok}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.icon}
                                    title="TikTok"
                                >
                                    <Video size={16} />
                                </a>
                            )}
                            {/* Fallback/Generic Link if needed */}
                            {!candidate.socials?.instagram && !candidate.socials?.tiktok && !candidate.socials?.kick && !candidate.socials?.of && (
                                <span className="text-[10px] text-gray-500 italic">Sin redes</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
