import React from 'react';
import { ShieldAlert, BarChart3, AlertTriangle } from 'lucide-react';
import type { Candidate } from '../types';
import { getAvatar } from '../utils/helpers';

interface SuspiciousActivityPanelProps {
    candidates: Candidate[];
    isDark: boolean;
}

export const SuspiciousActivityPanel: React.FC<SuspiciousActivityPanelProps> = ({ candidates, isDark }) => {
    // Filter candidates with suspicious activity (botPercentage > 0)
    const suspects = candidates
        .filter(c => parseFloat(c.botPercentage || '0') > 0)
        .sort((a, b) => parseFloat(b.botPercentage || '0') - parseFloat(a.botPercentage || '0'));

    if (suspects.length === 0) return null;

    const topSuspect = suspects[0];
    const otherSuspects = suspects.slice(1, 4); // Show top 3 others

    return (
        <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Focus: Top Suspect */}
            <div className={`lg:col-span-2 border rounded-xl p-1 relative overflow-hidden ${isDark ? 'bg-[#0d0d0d] border-gray-800' : 'bg-white border-gray-200'}`}>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <ShieldAlert size={120} className="text-[#8c3034]" />
                </div>

                <div className={`rounded-lg p-6 h-full flex flex-col justify-center relative z-10 ${isDark ? 'bg-[#111]' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-[#8c3034]/10 p-2 rounded-lg">
                            <BarChart3 className="text-[#8c3034]" size={20} />
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Top de personas con posiblemente con votos mas duplicados</h3>
                            <p className="text-gray-500 text-xs uppercase">Análisis algorítmico en tiempo real</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* The Suspect Avatar */}
                        <div className="relative">
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#8c3034]/30 p-1 relative">
                                <img
                                    src={getAvatar(topSuspect.name)}
                                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                    alt={topSuspect.name}
                                />
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#8c3034] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                                    MAYOR INDICE
                                </div>
                            </div>
                        </div>

                        {/* The Data */}
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-end mb-2">
                                <h2 className={`text-3xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>{topSuspect.name}</h2>
                                <span className="text-[#8c3034] font-mono font-bold text-xl">{topSuspect.botPercentage}%</span>
                            </div>

                            <div className="w-full bg-gray-800 rounded-full h-4 mb-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-orange-600 to-[#8c3034] h-full rounded-full relative"
                                    style={{ width: `${topSuspect.botPercentage}%` }}
                                >
                                    <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white opacity-50"></div>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                                <span>Votos Totales: <span className={isDark ? "text-gray-300" : "text-gray-700"}>{topSuspect.votes.toLocaleString()}</span></span>
                                <span className="flex items-center gap-1 text-[#8c3034]"><AlertTriangle size={10} /> Posibles Bots Detectados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary List */}
            <div className={`border rounded-xl p-6 flex flex-col justify-center ${isDark ? 'bg-[#111] border-gray-800' : 'bg-white border-gray-200'}`}>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Otros casos bajo revisión</h4>
                <div className="space-y-4">
                    {otherSuspects.map((other, idx) => (
                        <div key={other.name} className={`flex items-center justify-between p-3 rounded border ${isDark ? 'bg-black/40 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="flex items-center gap-3">
                                <div className="text-gray-600 font-mono text-xs">#{idx + 2}</div>
                                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{other.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-orange-500 font-bold text-sm">{other.botPercentage}%</div>
                                <div className="text-[10px] text-gray-600">Duplicado</div>
                            </div>
                        </div>
                    ))}
                    {otherSuspects.length === 0 && (
                        <div className="text-center text-gray-500 text-sm py-4">
                            No hay otros casos sospechosos detectados.
                        </div>
                    )}
                </div>
                <button className="mt-auto w-full py-3 text-xs text-gray-400 hover:text-white border border-dashed border-gray-700 hover:border-gray-500 rounded mt-4 transition-all">
                    Ver Informe Técnico Completo
                </button>
            </div>

        </div>
    );
};
