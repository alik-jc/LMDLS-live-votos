import { getAvatar, getGender } from '../utils/helpers';
import type { Candidate } from '../types';

interface DangerZoneProps {
    candidates: Candidate[];
}

export const DangerZone = ({ candidates }: DangerZoneProps) => {
    if (candidates.length === 0) return null;

    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⚠️</span>
                <div>
                    <div className="text-white font-bold text-lg">ZONA DE ELIMINACIÓN</div>
                    <div className="text-sm text-gray-400">
                        Los participantes con menos votos actualmente.
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {candidates.map((candidate) => {
                    const gender = getGender(candidate.name);
                    return (
                        <div
                            key={candidate.name}
                            className="bg-gradient-to-br from-danger/10 to-black/80 border border-danger/30 rounded-2xl p-5 flex items-center gap-5 relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)] animate-[pulse-border_3s_infinite]"
                        >
                            <div className="absolute top-0 left-0 bottom-0 w-1 bg-danger shadow-[0_0_15px_var(--danger)]" />

                            <img
                                src={getAvatar(candidate.name)}
                                alt={candidate.name}
                                className="w-20 h-20 rounded-full border-4 border-danger object-cover shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                                loading="lazy"
                            />

                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white mb-1">
                                    {candidate.name}
                                </h3>
                                <p className="text-danger text-sm font-semibold uppercase">
                                    Posible Eliminación ({gender === 'M' ? 'H' : 'M'})
                                </p>
                            </div>

                            <div className="text-right">
                                <div className="text-2xl font-bold">
                                    {candidate.votes.toLocaleString()}
                                </div>
                                <div className="text-sm text-white/50">
                                    {candidate.percentage}%
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
