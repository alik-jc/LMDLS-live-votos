import React from 'react';
import { Users, TrendingUp } from 'lucide-react';
import type { Candidate } from '../types';
import { getAvatar } from '../utils/helpers';

interface LeaderBoardProps {
    candidates: Candidate[];
    dangerList: string[];
    isDark: boolean;
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({ candidates, dangerList, isDark }) => {
    return (
        <div className={`border rounded-xl overflow-hidden ${isDark ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-gray-200'}`}>
            {/* Table Header */}
            <div className={`grid grid-cols-12 gap-2 md:gap-4 p-4 text-[10px] uppercase tracking-widest font-bold border-b ${isDark ? 'text-gray-500 border-white/5' : 'text-gray-400 border-gray-100'}`}>
                <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                <div className="col-span-6 md:col-span-4">Participante</div>
                <div className="col-span-3 hidden md:block">Tendencia</div>
                <div className="col-span-3 hidden md:block">Popularidad</div>
                <div className="col-span-4 md:col-span-1 text-right">Votos</div>
            </div>

            {/* Rows */}
            <div className={`divide-y ${isDark ? 'divide-white/5' : 'divide-gray-100'}`}>
                {candidates.map((row, index) => {
                    const rank = index + 1;
                    const isLeader = rank === 1;
                    const isDanger = dangerList.includes(row.name);
                    const popularity = parseFloat(row.percentage || '0');
                    // Mock trend logic for now
                    const trend = index % 3 === 0 ? 'up' : (index % 3 === 1 ? 'down' : 'stable');

                    return (
                        <div key={row.name} className={`grid grid-cols-12 gap-2 md:gap-4 p-4 items-center transition-colors group ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>

                            <div className="col-span-2 md:col-span-1 flex justify-center">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold font-serif ${isLeader
                                    ? 'bg-[#f8dcb2]/20 text-[#f8dcb2] border border-[#f8dcb2]/50'
                                    : (isDanger ? 'bg-[#8c3034]/20 text-[#8c3034] border border-[#8c3034]/50' : (isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'))
                                    }`}>
                                    {rank}
                                </div>
                            </div>

                            <div className="col-span-6 md:col-span-4 flex items-center gap-3 md:gap-4">
                                <img
                                    src={getAvatar(row.name)}
                                    className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}
                                    alt={row.name}
                                />
                                <div className="min-w-0">
                                    <div className={`font-bold text-xs md:text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{row.name}</div>
                                    {isLeader && <span className="text-[10px] text-[#f8dcb2] flex items-center gap-1"><Users size={10} /> Líder</span>}
                                    {isDanger && <span className="text-[10px] text-[#8c3034] flex items-center gap-1">Peligro</span>}
                                </div>
                            </div>

                            <div className="col-span-3 hidden md:flex items-center text-xs">
                                {trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
                                {trend === 'down' && <TrendingUp size={16} className="text-[#8c3034] rotate-180" />}
                                {trend === 'stable' && <span className="text-gray-600 font-bold">-</span>}
                            </div>

                            <div className="col-span-3 hidden md:block">
                                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className={`h-full rounded-full ${isLeader ? 'bg-[#f8dcb2]' : (isDanger ? 'bg-[#8c3034]' : 'bg-gray-600')}`} style={{ width: `${popularity}%` }}></div>
                                </div>
                                <span className="text-[10px] text-gray-500 mt-1 block">{popularity}% del total</span>
                            </div>

                            <div className="col-span-4 md:col-span-1 text-right">
                                <div className={`font-serif text-sm md:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>{row.votes.toLocaleString()}</div>
                            </div>

                        </div>
                    );
                })}
            </div>
        </div>
    );
};
