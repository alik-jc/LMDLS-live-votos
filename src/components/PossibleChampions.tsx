import React from 'react';
import { Crown, AlertTriangle } from 'lucide-react';
import type { Candidate } from '../types';
import { getAvatar, getGender } from '../utils/helpers';

interface PossibleChampionsProps {
    candidates: Candidate[];
    dangerList: string[];
    isDark: boolean;
}

export const PossibleChampions: React.FC<PossibleChampionsProps> = ({ candidates, dangerList, isDark }) => {
    if (candidates.length === 0) return null;

    // Get top candidates by gender for possible champions
    const males = candidates.filter(c => getGender(c.name) === 'M').slice(0, 3);
    const females = candidates.filter(c => getGender(c.name) === 'F').slice(0, 3);

    // Get danger candidates
    const dangerCandidates = candidates.filter(c => dangerList.includes(c.name));

    const ChampionCard = ({ candidate, rank, type }: { candidate: Candidate; rank: number; type: 'male' | 'female' }) => {
        const isFirst = rank === 0;
        const crownColor = type === 'male' ? 'text-blue-400' : 'text-pink-400';
        const borderColor = type === 'male' ? 'border-blue-500/50' : 'border-pink-500/50';
        const glowColor = type === 'male' ? 'shadow-blue-500/20' : 'shadow-pink-500/20';

        return (
            <div className={`relative p-4 rounded-xl border transition-all duration-300 ${isFirst ? `${borderColor} ${glowColor} shadow-lg` : ''} ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
                {isFirst && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Crown className={`${crownColor} animate-pulse`} size={24} fill="currentColor" />
                    </div>
                )}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={getAvatar(candidate.name)}
                            alt={candidate.name}
                            className={`w-12 h-12 rounded-full object-cover ${isFirst ? `ring-2 ${type === 'male' ? 'ring-blue-500' : 'ring-pink-500'}` : 'border-2 border-gray-300'}`}
                        />
                        <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${isFirst ? (type === 'male' ? 'bg-blue-500' : 'bg-pink-500') + ' text-white' : 'bg-gray-600 text-white'}`}>
                            {rank + 1}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className={`font-bold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{candidate.name}</h4>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {candidate.votes.toLocaleString()} votos • {candidate.percentage}%
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 mt-16 space-y-8">
            {/* Possible Champions Section */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <Crown className="text-[#ffd700]" size={28} />
                    <h2 className={`text-2xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Posibles Campeones de La Mansión
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Rey - Male Champions */}
                    <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#0a0a0a] border-blue-500/20' : 'bg-blue-50/50 border-blue-200'}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-blue-400">👑</span>
                            <h3 className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Candidatos a Rey</h3>
                        </div>
                        <div className="space-y-3">
                            {males.map((c, i) => (
                                <ChampionCard key={c.name} candidate={c} rank={i} type="male" />
                            ))}
                        </div>
                    </div>

                    {/* Reina - Female Champions */}
                    <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#0a0a0a] border-pink-500/20' : 'bg-pink-50/50 border-pink-200'}`}>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-pink-400">👑</span>
                            <h3 className={`font-bold ${isDark ? 'text-pink-400' : 'text-pink-600'}`}>Candidatas a Reina</h3>
                        </div>
                        <div className="space-y-3">
                            {females.map((c, i) => (
                                <ChampionCard key={c.name} candidate={c} rank={i} type="female" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone - Compact Version */}
            {dangerCandidates.length > 0 && (
                <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#111] border-[#8c3034]/30' : 'bg-red-50/50 border-red-200'}`}>
                    <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="text-[#8c3034]" size={18} />
                        <h3 className={`font-bold text-sm ${isDark ? 'text-[#e5a0a3]' : 'text-[#8c3034]'}`}>
                            En Zona de Peligro
                        </h3>
                        <span className="text-xs text-gray-500 ml-auto">Menor cantidad de votos por género</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {dangerCandidates.map((p) => (
                            <div key={p.name} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${isDark ? 'bg-[#1a0a0a] border-[#8c3034]/20' : 'bg-white border-red-200'}`}>
                                <img
                                    src={getAvatar(p.name)}
                                    alt={p.name}
                                    className="w-8 h-8 rounded-full border border-[#8c3034] object-cover"
                                />
                                <div>
                                    <span className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{p.name}</span>
                                    <p className="text-[#8c3034] text-xs">{p.votes.toLocaleString()} ({p.percentage}%)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
