import { Users, Clock } from 'lucide-react';

interface StatsPanelProps {
    totalVotes: number;
    totalCandidates: number;
    countdown: string;
    isDark: boolean;
}

export const StatsPanel = ({ totalVotes, totalCandidates, countdown, isDark }: StatsPanelProps) => {
    const styles = {
        cardBg: isDark
            ? 'bg-[#111] border border-white/5'
            : 'bg-white border border-gray-200 shadow-sm',
        titleFont: 'font-serif',
        textPrimary: isDark ? 'text-white' : 'text-[#8c3034]',
        textSecondary: isDark ? 'text-white' : 'text-[#1a1a1a]',
        textAccent: isDark ? 'text-[#f8e2bb]' : 'text-[#1a1a1a]',
    };

    return (
        <div className="grid grid-cols-3 gap-2 w-full lg:w-auto sm:flex sm:flex-row sm:gap-4">
            {/* Card 1 */}
            <div className={`flex-1 min-w-0 p-2 sm:p-5 rounded-lg text-center ${styles.cardBg}`}>
                <div className="flex justify-center mb-1 sm:mb-2 text-gray-400"><Users size={14} className="sm:w-4 sm:h-4" /></div>
                <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5 sm:mb-1 truncate">Votos</p>
                <p className={`text-lg sm:text-3xl font-light ${styles.titleFont} ${styles.textPrimary}`}>{totalVotes.toLocaleString()}</p>
            </div>
            {/* Card 2 */}
            <div className={`flex-1 min-w-0 p-2 sm:p-5 rounded-lg text-center ${styles.cardBg}`}>
                <div className="flex justify-center mb-1 sm:mb-2 text-gray-400"><Users size={14} className="sm:w-4 sm:h-4" /></div>
                <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5 sm:mb-1 truncate">Participantes</p>
                <p className={`text-lg sm:text-3xl font-light ${styles.titleFont} ${styles.textSecondary}`}>{totalCandidates}</p>
            </div>
            {/* Card 3 (Timer) */}
            <div className={`flex-1 min-w-0 p-2 sm:p-5 rounded-lg text-center ${styles.cardBg}`}>
                <div className="flex justify-center mb-1 sm:mb-2 text-gray-400"><Clock size={14} className="sm:w-4 sm:h-4" /></div>
                <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5 sm:mb-1 truncate">Cierre</p>
                <p className={`text-lg sm:text-3xl font-mono font-medium ${styles.textAccent}`}>
                    {countdown}
                </p>
            </div>
        </div>
    );
};
