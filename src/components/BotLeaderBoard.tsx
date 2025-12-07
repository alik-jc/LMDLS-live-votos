import { getAvatar } from '../utils/helpers';
import type { Candidate } from '../types';

interface BotLeaderBoardProps {
    candidates: Candidate[];
}

export const BotLeaderBoard = ({ candidates }: BotLeaderBoardProps) => {
    return (
        <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🤖</span>
                <div>
                    <div className="text-white font-bold text-lg">Análisis de Posibles Bots</div>
                    <div className="text-sm text-gray-400">
                        Participantes con votos inusualmente altos respecto al promedio.
                    </div>
                    <div className="text-xs text-gray-500 mt-1 italic">
                        * Este porcentaje es una estimación basada en la desviación del promedio. Indica la probabilidad de <strong>votos automatizados</strong> (bots).
                    </div>
                </div>
            </div>

            {candidates.length === 0 ? (
                <div className="bg-card-bg border border-green-500/30 p-6 rounded-xl flex items-center justify-center gap-3 text-green-400">
                    <span className="text-2xl">✅</span>
                    <span className="font-semibold">No se ha detectado actividad inusual en este momento.</span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidates.map((candidate, index) => (
                        <div
                            key={candidate.name}
                            className="bg-card-bg border border-pink-500/30 p-4 rounded-xl flex items-center gap-4 relative overflow-hidden group hover:bg-pink-500/5 transition-all"
                        >
                            <div className="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                                #{index + 1}
                            </div>

                            <img
                                src={getAvatar(candidate.name)}
                                alt={candidate.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                                loading="lazy"
                            />

                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-white truncate">
                                    {candidate.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {candidate.votes.toLocaleString()} votos
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-xl font-bold text-pink-400 drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]">
                                    {candidate.botPercentage}%
                                </div>
                                <div className="text-[10px] text-pink-300/70 uppercase font-semibold">
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
