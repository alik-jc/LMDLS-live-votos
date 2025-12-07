import { getAvatar } from '../utils/helpers';
import type { Candidate } from '../types';

interface LeaderBoardProps {
    candidates: Candidate[];
    dangerList: string[];
    maxVotes: number;
}

export const LeaderBoard = ({ candidates, dangerList, maxVotes }: LeaderBoardProps) => {
    const getRankClass = (index: number) => {
        if (index === 0) return 'bg-gradient-to-br from-gold to-orange-600 text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]';
        if (index === 1) return 'bg-gradient-to-br from-gray-200 to-gray-400 text-black';
        if (index === 2) return 'bg-gradient-to-br from-orange-600 to-orange-800 text-white';
        return 'bg-white/5 text-gray-400';
    };

    const getBarColor = (index: number, isDanger: boolean) => {
        if (isDanger) return 'bg-danger';
        if (index === 0) return 'bg-gold';
        return 'bg-primary';
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {candidates.map((candidate, index) => {
                const isDanger = dangerList.includes(candidate.name);
                const barWidth = (candidate.votes / maxVotes) * 100;

                return (
                    <div
                        key={candidate.name}
                        className={`bg-card-bg border ${isDanger ? 'border-danger/30 bg-danger/5' : 'border-white/10'
                            } p-3 rounded-2xl flex items-center gap-4 transition-all hover:bg-white/10 hover:translate-x-1 group`}
                    >
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm flex-shrink-0 ${getRankClass(
                                index
                            )}`}
                        >
                            {index + 1}
                        </div>

                        <img
                            src={getAvatar(candidate.name)}
                            alt={candidate.name}
                            className={`w-11 h-11 rounded-full object-cover border-2 ${index === 0 ? 'border-gold' : 'border-white/10'
                                }`}
                            loading="lazy"
                        />

                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm mb-1 flex items-center gap-2 transition-all group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                                <span className="truncate">{candidate.name}</span>
                                {isDanger && <span className="text-xs text-danger">⚠️</span>}
                            </div>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${getBarColor(
                                        index,
                                        isDanger
                                    )}`}
                                    style={{ width: `${barWidth}%` }}
                                />
                            </div>
                        </div>

                        <div className="text-right min-w-[70px]">
                            <div className="font-bold text-sm transition-all group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]">
                                {candidate.votes.toLocaleString()}
                                {candidate.botPercentage && candidate.botPercentage !== '0' && (
                                    <div className="mt-1 flex justify-end">
                                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-pink-500 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(236,72,153,0.5)] animate-pulse" title="Posible porcentaje de bots">
                                            🤖 {candidate.botPercentage}% BOTS
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-gray-400">
                                {candidate.percentage}%
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
