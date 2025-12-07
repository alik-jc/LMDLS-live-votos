interface StatsPanelProps {
    totalVotes: number;
    totalCandidates: number;
    countdown: string;
}

export const StatsPanel = ({ totalVotes, totalCandidates, countdown }: StatsPanelProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-card-bg border border-white/10 backdrop-blur-xl p-4 rounded-2xl text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Votos Totales
                </div>
                <div className="text-2xl font-bold">
                    {totalVotes.toLocaleString()}
                </div>
            </div>

            <div className="bg-card-bg border border-white/10 backdrop-blur-xl p-4 rounded-2xl text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Participantes
                </div>
                <div className="text-2xl font-bold">
                    {totalCandidates}
                </div>
            </div>

            <div className="bg-card-bg border border-white/10 backdrop-blur-xl p-4 rounded-2xl text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Actualización
                </div>
                <div className="text-2xl font-bold text-pink-400 drop-shadow-[0_0_15px_rgba(244,114,182,0.3)]">
                    {countdown}
                </div>
            </div>
        </div>
    );
};
