import { TrendingUp, Flame } from 'lucide-react';
import { getAvatar } from '../utils/helpers';
import type { Candidate } from '../types';

interface LeaderBoardProps {
    candidates: Candidate[];
    dangerList: string[];
    isDark: boolean;
}

export const LeaderBoard = ({ candidates, dangerList, isDark }: LeaderBoardProps) => {
    const styles = {
        cardBg: isDark ? 'bg-[#111] border border-white/5' : 'bg-white border border-gray-200 shadow-sm',
        tableHeader: isDark ? 'bg-[#151515] text-gray-400' : 'bg-gray-50 text-gray-500',
        tableRow: isDark ? 'hover:bg-white/5 border-white/5' : 'hover:bg-gray-50 border-gray-100',
        textPrimary: isDark ? 'text-white' : 'text-gray-900',
        textSecondary: isDark ? 'text-gray-300' : 'text-gray-800',
        rankBadge: (rank: number) => {
            if (rank <= 3) return 'bg-[#f8e2bb] text-[#8c3034]';
            return isDark ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className={`rounded-xl overflow-hidden ${styles.cardBg}`}>
            <table className="w-full">
                <thead className={styles.tableHeader}>
                    <tr>
                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider">Participante</th>
                        <th className="px-6 py-4 text-center text-[10px] font-bold uppercase tracking-wider hidden sm:table-cell">Tendencia</th>
                        <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider w-1/4 hidden sm:table-cell">Popularidad</th>
                        <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-wider">Votos</th>
                    </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-gray-100'}`}>
                    {candidates.map((p, index) => {
                        const rank = index + 1;
                        const isDanger = dangerList.includes(p.name);
                        // Mock trend logic for visual variety
                        let trend: 'up' | 'down' | 'stable' | 'danger' = 'stable';
                        if (index < 5) trend = 'up';
                        else if (index > 15) trend = 'danger';
                        else if (index > 10) trend = 'down';

                        return (
                            <tr key={p.name} className={`group transition-colors ${styles.tableRow}`}>
                                <td className="px-6 py-4">
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs ${styles.rankBadge(rank)}`}>
                                        {rank}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={getAvatar(p.name)} className="w-10 h-10 rounded-full object-cover" alt="" />
                                        <div>
                                            <p className={`font-bold text-sm ${styles.textPrimary}`}>{p.name}</p>
                                            {isDanger && <span className="text-[10px] text-red-500 font-bold uppercase">En Riesgo</span>}
                                            {p.botPercentage && p.botPercentage !== '0' && (
                                                <span className="ml-2 text-[10px] text-pink-500 font-bold uppercase">🤖 {p.botPercentage}% Bots</span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center hidden sm:table-cell">
                                    {trend === 'up' && <TrendingUp size={16} className="text-green-500 mx-auto" />}
                                    {trend === 'down' && <TrendingUp size={16} className="text-red-400 rotate-180 mx-auto" />}
                                    {trend === 'stable' && <span className="text-gray-400">-</span>}
                                    {trend === 'danger' && <Flame size={16} className="text-red-500 mx-auto" />}
                                </td>
                                <td className="px-6 py-4 hidden sm:table-cell">
                                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                                        <div className="h-full bg-[#8c3034]" style={{ width: `${p.percentage}%` }}></div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">{p.percentage}% del total</p>
                                </td>
                                <td className={`px-6 py-4 text-right font-mono font-bold ${styles.textSecondary}`}>
                                    {p.votes.toLocaleString()}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
