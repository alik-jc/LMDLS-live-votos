import { BarChart3 } from 'lucide-react';
import { getAvatar } from '../utils/helpers';
import type { Candidate } from '../types';

interface BotLeaderBoardProps {
    candidates: Candidate[];
    isDark: boolean;
}

export const BotLeaderBoard = ({ candidates, isDark }: BotLeaderBoardProps) => {
    const styles = {
        card: isDark
            ? 'bg-[#0a0a0a] border-[#8c3034]/30 hover:bg-[#8c3034]/5'
            : 'bg-white border-pink-100 hover:bg-pink-50 shadow-sm',
        textPrimary: isDark ? 'text-white' : 'text-gray-900',
        textSecondary: isDark ? 'text-gray-400' : 'text-gray-500',
        accent: isDark ? 'text-[#8c3034]' : 'text-pink-600',
        border: isDark ? 'border-[#8c3034]' : 'border-pink-500',
    };

    return (
        <div className="mb-12">
            <div className={`border-t pt-4 flex flex-col md:flex-row justify-between items-center gap-4 mb-6 ${isDark ? 'border-[#1f1f1f]' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${isDark ? 'bg-[#1a1a1a] text-gray-500' : 'bg-gray-100 text-gray-600'}`}>
                        <BarChart3 size={16} />
                    </div>
                    <div>
                        <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Análisis de Integridad</p>
                        <p className={`text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Sistema anti-bots activo</p>
                    </div>
                </div>
            </div>

            {candidates.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidates.map((candidate, index) => (
                        <div
                            key={candidate.name}
                            className={`border p-4 rounded-lg flex items-center gap-4 relative overflow-hidden group transition-all ${styles.card}`}
                        >
                            <div className={`absolute top-0 right-0 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg ${isDark ? 'bg-[#8c3034]' : 'bg-pink-500'}`}>
                                #{index + 1}
                            </div>

                            <img
                                src={getAvatar(candidate.name)}
                                alt={candidate.name}
                                className={`w-12 h-12 rounded-full object-cover border-2 grayscale group-hover:grayscale-0 transition-all ${styles.border}`}
                                loading="lazy"
                            />

                            <div className="flex-1 min-w-0">
                                <div className={`font-bold truncate ${styles.textPrimary}`}>
                                    {candidate.name}
                                </div>
                                <div className={`text-xs ${styles.textSecondary}`}>
                                    {candidate.votes.toLocaleString()} votos
                                </div>
                            </div>

                            <div className="text-right">
                                <div className={`text-xl font-bold ${styles.accent}`}>
                                    {candidate.botPercentage}%
                                </div>
                                <div className={`text-[10px] uppercase font-semibold opacity-70 ${styles.accent}`}>
                                    Probabilidad
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
