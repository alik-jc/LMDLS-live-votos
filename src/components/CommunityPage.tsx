import { Users, Trophy } from 'lucide-react';
import { ParticipantsGrid } from './ParticipantsGrid';
import { LeaderBoard } from './LeaderBoard';
import { ALL_PARTICIPANTS, FALLBACK_CANDIDATES } from '../data/fallbackData';
import { enrichCandidateData } from '../utils/enrichment';
import type { Candidate } from '../types';

interface CommunityPageProps {
    isDark: boolean;
}

export const CommunityPage = ({ isDark }: CommunityPageProps) => {
    const styles = {
        textPrimary: isDark ? 'text-white' : 'text-gray-900',
        textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
        accent: isDark ? 'text-[#f8e2bb]' : 'text-[#8c3034]',
    };

    // Enrich participants with social data
    const enrichedParticipants: Candidate[] = ALL_PARTICIPANTS.map(p => enrichCandidateData(p));
    const enrichedFinalRanking: Candidate[] = FALLBACK_CANDIDATES.map(p => enrichCandidateData(p));

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 mt-8">
            <div className="text-center mb-12">
                <h1 className={`text-4xl md:text-5xl font-serif mb-4 ${styles.textPrimary}`}>
                    Las Votaciones!
                </h1>
                <p className={`text-lg ${styles.textSecondary} mb-4`}>
                    Esta app nació de la necesidad creada después de descubrir que el sistema de encuestas con las cuales...
                </p>
                <p className={`text-sm ${styles.textSecondary}`}>
                    Conoce a los protagonistas de La Mansión: Participantes, Profesores y Rectores.
                </p>
            </div>

            {/* Final Ranking */}
            <section>
                <div className={`flex items-center gap-3 mb-6 border-b pb-4 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <Trophy className={styles.accent} size={24} />
                    <h2 className={`text-2xl font-serif ${styles.textPrimary}`}>Ranking Final</h2>
                </div>
                <p className={`text-sm mb-6 ${styles.textSecondary}`}>
                    *Datos de ejemplo representativos. Los resultados oficiales pueden variar.
                </p>
                <LeaderBoard
                    candidates={enrichedFinalRanking}
                    dangerList={[]}
                    isDark={isDark}
                />
            </section>

            {/* All Participants */}
            <section>
                <div className={`flex items-center gap-3 mb-6 border-b pb-4 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <Users className={styles.accent} size={24} />
                    <h2 className={`text-2xl font-serif ${styles.textPrimary}`}>Todos los Integrantes</h2>
                </div>
                <ParticipantsGrid candidates={enrichedParticipants} isDark={isDark} />
            </section>
        </div>
    );
};
