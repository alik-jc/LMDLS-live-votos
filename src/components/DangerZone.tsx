import { AlertTriangle, Activity } from 'lucide-react';
import { getAvatar } from '../utils/helpers';
import type { Candidate } from '../types';

interface DangerZoneProps {
    candidates: Candidate[];
    isDark: boolean;
}

export const DangerZone = ({ candidates, isDark }: DangerZoneProps) => {
    if (candidates.length === 0) return null;

    const styles = {
        titleFont: 'font-serif',
        titleColor: isDark ? 'text-white' : 'text-[#8c3034]',
        card: isDark
            ? 'bg-[#0e0e0e] border-[#8c3034]/50 shadow-none'
            : 'bg-white border-l-4 border-l-[#8c3034] shadow-sm',
        textColor: isDark ? 'text-white' : 'text-[#1a1a1a]',
        infoBox: isDark
            ? 'bg-[#8c3034]/10 border-[#8c3034]/20 text-[#f8e2bb]'
            : 'bg-orange-50 border-orange-100 text-orange-800',
    };

    return (
        <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold flex items-center gap-2 ${styles.titleFont} ${styles.titleColor}`}>
                    <AlertTriangle size={20} className="text-[#8c3034]" /> Zona de Riesgo
                </h2>
                <span className="text-xs text-gray-500 italic hidden sm:block">Los 2 participantes con menos votos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {candidates.map((person, index) => (
                    <div key={person.name} className={`p-5 flex items-center gap-4 rounded-lg transition-all hover:translate-y-[-2px] border ${styles.card}`}>
                        <div className="relative">
                            <img src={getAvatar(person.name)} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" alt={person.name} />
                            <span className="absolute -bottom-1 -right-1 bg-[#8c3034] text-white text-[10px] font-bold px-1.5 rounded">#{index + 19}</span> {/* Mock rank logic for now */}
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg ${styles.textColor}`}>{person.name}</h3>
                            <div className="text-[#8c3034] text-xs font-bold uppercase mt-1">En Peligro</div>
                            <div className="text-xs text-gray-500 mt-1">{person.votes.toLocaleString()} votos ({person.percentage}%)</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Box */}
            <div className={`mt-4 p-3 rounded border text-xs flex gap-2 ${styles.infoBox}`}>
                <Activity size={16} className="shrink-0" />
                <p><strong>Atención:</strong> Si la votación cerrara en este momento, estos participantes abandonarían La Mansión.</p>
            </div>
        </div>
    );
};
