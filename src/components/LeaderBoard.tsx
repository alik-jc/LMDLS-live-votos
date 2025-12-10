import React from 'react';
import { Users, TrendingUp, Instagram, Twitter, Facebook, Youtube, Twitch } from 'lucide-react';
import type { Candidate } from '../types';
import { getAvatar, getDisplayName } from '../utils/helpers';
import { SOCIAL_MAP, KICK_ICON } from '../utils/constants';

interface LeaderBoardProps {
    candidates: Candidate[];
    dangerList: string[];
    isDark: boolean;
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({ candidates, dangerList, isDark }) => {
    const getRankStyle = (rank: number, isDanger: boolean) => {
        if (isDanger) return {
            bg: 'bg-[#8c3034]/20',
            text: 'text-[#8c3034]',
            border: 'border-[#8c3034]/50',
            bar: 'bg-[#8c3034]',
            label: 'En zona de peligro',
            iconColor: 'text-[#8c3034]'
        };

        switch (rank) {
            case 1: return {
                bg: 'bg-[#f8dcb2]/20',
                text: 'text-[#f8dcb2]',
                border: 'border-[#f8dcb2]/50',
                bar: 'bg-[#f8dcb2]',
                label: 'Líder actual',
                iconColor: 'text-[#f8dcb2]'
            };
            case 2: return {
                bg: 'bg-[#C0C0C0]/20',
                text: 'text-[#C0C0C0]',
                border: 'border-[#C0C0C0]/50',
                bar: 'bg-[#C0C0C0]',
                label: 'Top 2',
                iconColor: 'text-[#C0C0C0]'
            };
            case 3: return {
                bg: 'bg-[#CD7F32]/20',
                text: 'text-[#CD7F32]',
                border: 'border-[#CD7F32]/50',
                bar: 'bg-[#CD7F32]',
                label: 'Top 3',
                iconColor: 'text-[#CD7F32]'
            };
            default: return {
                bg: isDark ? 'bg-gray-800' : 'bg-gray-100',
                text: isDark ? 'text-gray-400' : 'text-gray-500',
                border: 'border-transparent',
                bar: 'bg-gray-600',
                label: '',
                iconColor: 'text-gray-500'
            };
        }
    };

    return (
        <div className={`border rounded-xl overflow-hidden shadow-lg ${isDark ? 'bg-[#111] border-white/10' : 'bg-white border-gray-200'}`}>
            {/* Table Header */}
            <div className={`grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 text-[9px] md:text-[10px] uppercase tracking-widest font-bold border-b ${isDark ? 'text-gray-500 border-white/5' : 'text-gray-400 border-gray-100'}`}>
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
                    const isDanger = dangerList.includes(row.name);
                    const popularity = parseFloat(row.percentage || '0');
                    // Mock trend logic for now
                    const trend = index % 3 === 0 ? 'up' : (index % 3 === 1 ? 'down' : 'stable');

                    const style = getRankStyle(rank, isDanger);

                    return (
                        <div key={row.name} className={`grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 items-center transition-colors group ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-gray-50'}`}>

                            <div className="col-span-2 md:col-span-1 flex justify-center">
                                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold font-serif ${style.bg} ${style.text} border ${style.border}`}>
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
                                    <div className={`font-bold text-xs md:text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>{getDisplayName(row.name)}</div>
                                    {(rank <= 3 || isDanger) && (
                                        <span className={`text-[10px] flex items-center gap-1 ${style.text}`}>
                                            {rank <= 3 && !isDanger && <Users size={10} />}
                                            {style.label}
                                        </span>
                                    )}
                                    <div className="flex gap-1 mt-1">
                                        {SOCIAL_MAP[row.name]?.map((social) => {
                                            const iconProps = { size: 12, className: isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black' };
                                            switch (social.platform) {
                                                case 'instagram': return <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"><Instagram {...iconProps} /></a>;
                                                case 'twitter': return <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"><Twitter {...iconProps} /></a>;
                                                case 'facebook': return <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"><Facebook {...iconProps} /></a>;
                                                case 'youtube': return <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"><Youtube {...iconProps} /></a>;
                                                case 'twitch': return <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"><Twitch {...iconProps} /></a>;
                                                case 'kick': return (
                                                    <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer">
                                                        <img src={KICK_ICON} alt="Kick" className={`w-3 h-3 opacity-60 hover:opacity-100 transition-opacity ${isDark ? 'invert' : ''}`} />
                                                    </a>
                                                );
                                                case 'tiktok': return (
                                                    <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="12"
                                                            height="12"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className={iconProps.className}
                                                        >
                                                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                                        </svg>
                                                    </a>
                                                );
                                                default: return null;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-3 hidden md:flex items-center text-xs">
                                {trend === 'up' && <TrendingUp size={16} className="text-green-500" />}
                                {trend === 'down' && <TrendingUp size={16} className="text-[#8c3034] rotate-180" />}
                                {trend === 'stable' && <span className="text-gray-600 font-bold">-</span>}
                            </div>

                            <div className="col-span-3 hidden md:block">
                                <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
                                    <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${popularity}%` }}></div>
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
