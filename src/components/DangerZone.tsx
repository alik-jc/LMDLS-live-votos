import React from 'react';
import { AlertOctagon, TrendingUp } from 'lucide-react';
import type { Candidate } from '../types';
import { getAvatar, getDisplayName } from '../utils/helpers';

interface DangerZoneProps {
    candidates: Candidate[];
    isDark: boolean;
}

export const DangerZone: React.FC<DangerZoneProps> = ({ candidates, isDark }) => {
    if (candidates.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 mt-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                    <AlertOctagon className="text-[#8c3034] flex-shrink-0" size={28} />
                    <h2 className={`text-xl sm:text-2xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>Participantes eliminados hasta el momento</h2>
                </div>
                <span className="text-[#8c3034] text-xs sm:text-sm bg-[#8c3034]/20 px-3 py-1 rounded-full border border-[#8c3034]/30 whitespace-nowrap self-start sm:self-auto">
                    Posible eliminación de {candidates.length} participantes
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {candidates.map((p) => (
                    <div key={p.name} className={`border rounded-lg overflow-hidden relative group transition-all duration-300 ${isDark ? 'bg-[#111] border-[#8c3034]/20 hover:border-[#8c3034]/50' : 'bg-white border-red-200 hover:border-[#8c3034]/50'}`}>
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#8c3034]/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                        <div className="p-4 flex items-center gap-4 relative z-10">
                            <div className="relative">
                                <img
                                    src={getAvatar(p.name)}
                                    alt={p.name}
                                    className="w-14 h-14 rounded-full border-2 border-[#8c3034] object-cover bg-gray-800"
                                />
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{getDisplayName(p.name)}</h3>
                                <p className="text-[#8c3034] text-xs font-medium uppercase tracking-wider mt-1">En Peligro</p>
                                <p className="text-gray-500 text-xs mt-1">{p.votes.toLocaleString()} ({p.percentage}%)</p>
                            </div>
                        </div>

                        {/* Progress Bar background to show "closeness" to leaving */}
                        <div className={`h-1 w-full mt-2 ${isDark ? 'bg-[#222]' : 'bg-gray-200'}`}>
                            <div className="h-full bg-[#8c3034] w-[80%] animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`mt-3 flex items-start gap-2 text-xs p-3 rounded border-l-2 border-yellow-600 ${isDark ? 'text-gray-500 bg-[#111]' : 'text-gray-600 bg-gray-50'}`}>
                <TrendingUp size={14} className="mt-0.5 text-yellow-600 flex-shrink-0" />
                <p><span className="text-yellow-600 font-bold">Atención:</span> Debido a la mecánica especial de esta semana, los {candidates.length} participantes con menor porcentaje de apoyo abandonarán La Mansión inmediatamente al cierre.</p>
            </div>
        </div>
    );
};
