import React from 'react';
import { Crown, Award, Trophy } from 'lucide-react';
import type { Candidate } from '../types';
import { getAvatar, getDisplayName } from '../utils/helpers';

interface PossibleChampionsProps {
    candidates: Candidate[];
    dangerList: string[];
    isDark: boolean;
}

export const PossibleChampions: React.FC<PossibleChampionsProps> = ({ candidates, isDark }) => {
    if (candidates.length === 0) return null;

    // Get top 3 candidates globally (unified ranking)
    const top3 = candidates.slice(0, 3);

    // Podium order: 2nd, 1st (center/elevated), 3rd
    const podiumOrder = top3.length >= 3
        ? [top3[1], top3[0], top3[2]]
        : top3.length === 2
            ? [null, top3[0], top3[1]]
            : [null, top3[0], null];

    const PodiumCard = ({ candidate, rank }: { candidate: Candidate | null; rank: number }) => {
        if (!candidate) return <div className="hidden lg:block" />;

        const isFirst = rank === 1;

        // Medal colors based on rank (1=gold, 2=silver, 3=bronze)
        const medalColor = rank === 1 ? 'from-[#ffd700] to-[#ffaa00]' : rank === 2 ? 'from-[#c0c0c0] to-[#a8a8a8]' : 'from-[#cd7f32] to-[#b8722c]';
        const ringColor = rank === 1 ? 'ring-[#ffd700]' : rank === 2 ? 'ring-[#c0c0c0]' : 'ring-[#cd7f32]';
        const glowColor = rank === 1 ? 'shadow-yellow-500/30' : rank === 2 ? 'shadow-gray-400/30' : 'shadow-orange-600/30';

        return (
            <div className={`relative flex flex-col items-center ${isFirst ? 'lg:scale-110 lg:-mt-4' : ''} transition-all duration-300`}>
                {/* Point Badge */}
                <div className={`
                    absolute -top-3 left-1/2 -translate-x-1/2 z-10
                    bg-gradient-to-r ${medalColor}
                    text-black text-[9px] font-black px-3 py-1 rounded-full
                    shadow-lg whitespace-nowrap
                `}>
                    +1 PUNTO
                </div>

                {/* Card */}
                <div className={`
                    relative w-full p-6 rounded-2xl border backdrop-blur-sm
                    transition-all duration-300 group hover:scale-105
                    ${isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-gray-200'}
                    ${isFirst ? `${glowColor} shadow-2xl` : ''}
                `}>
                    {/* Crown for first place */}
                    {isFirst && (
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                            <Crown className="text-[#ffd700] animate-pulse" size={32} fill="#ffd700" />
                        </div>
                    )}

                    {/* Rank Badge */}
                    <div className={`
                        absolute -top-3 -right-3 w-10 h-10 rounded-full
                        bg-gradient-to-br ${medalColor}
                        flex items-center justify-center
                        shadow-lg border-4 ${isDark ? 'border-[#0a0a0a]' : 'border-white'}
                        text-black font-black text-lg
                    `}>
                        {rank}
                    </div>

                    {/* Avatar */}
                    <div className="relative mx-auto mb-4 w-24 h-24">
                        <div className={`
                            absolute inset-0 rounded-full bg-gradient-to-r ${medalColor} opacity-30 blur-md
                            group-hover:opacity-50 transition-opacity
                        `} />
                        <img
                            src={getAvatar(candidate.name)}
                            alt={candidate.name}
                            className={`
                                relative w-full h-full rounded-full object-cover
                                ring-4 ${ringColor}
                                ${isFirst ? 'ring-offset-4 ring-offset-[#0a0a0a]' : 'ring-offset-2 ring-offset-[#0a0a0a]'}
                            `}
                        />
                    </div>

                    {/* Info */}
                    <div className="text-center space-y-2">
                        <h4 className={`font-bold text-lg truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {getDisplayName(candidate.name)}
                        </h4>
                        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <div className="font-bold text-2xl tabular-nums mb-1">
                                {candidate.votes.toLocaleString()}
                            </div>
                            <div className="text-xs uppercase tracking-wider opacity-70">
                                votos • {candidate.percentage}%
                            </div>
                        </div>
                    </div>

                    {/* Decoration */}
                    <div className={`
                        absolute inset-0 rounded-2xl bg-gradient-to-t ${medalColor} opacity-0
                        group-hover:opacity-5 transition-opacity pointer-events-none
                    `} />
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 mt-16">
            {/* Header */}
            <div className="text-center mb-12 space-y-3">
                <div className="flex items-center justify-center gap-3">
                    <Trophy className="text-[#ffd700]" size={32} />
                    <h2 className={`text-3xl md:text-4xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Candidatos a Campeones
                    </h2>
                    <Trophy className="text-[#ffd700]" size={32} />
                </div>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10">
                        <Award size={14} className="text-[#ffd700]" />
                        <span>Elección de la Comunidad • Cada uno recibe <strong className="text-[#ffd700]">+1 Punto</strong></span>
                    </span>
                </p>
            </div>

            {/* Podium Layout - Desktop Only */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-end max-w-5xl mx-auto">
                {podiumOrder.map((candidate, index) => {
                    // Map podium position to actual rank
                    const actualRank = index === 0 ? 2 : index === 1 ? 1 : 3;
                    return (
                        <PodiumCard
                            key={candidate?.name || `empty-${index}`}
                            candidate={candidate}
                            rank={actualRank}
                        />
                    );
                })}
            </div>

            {/* Mobile: Simple List View */}
            <div className="lg:hidden mt-8 space-y-4">
                {top3.map((candidate, index) => (
                    <PodiumCard
                        key={candidate.name}
                        candidate={candidate}
                        rank={index + 1}
                    />
                ))}
            </div>

            {/* Info Note */}
            <div className={`
                mt-12 text-center text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}
                pl-3 border-l-2 border-[#ffd700]/50 max-w-2xl mx-auto text-left
            `}>
                <p>
                    <strong className="text-[#ffd700]">Nota:</strong> Los candidatos a campeones son elegidos por la comunidad.
                    Cada uno de los 3 primeros lugares recibe 1 punto adicional por este concepto.
                </p>
            </div>
        </div>
    );
};
