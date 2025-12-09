import { Tv, Users, Trophy, Play, Calendar } from 'lucide-react';
import { ParticipantsGrid } from './ParticipantsGrid';
import { LeaderBoard } from './LeaderBoard';
import { ALL_PARTICIPANTS, FALLBACK_CANDIDATES, EVENT_INFO } from '../data/fallbackData';
import { enrichCandidateData } from '../utils/enrichment';
import type { Candidate } from '../types';
import { useState } from 'react';
import { KickPlayer } from './KickPlayer';

interface EventFinishedLandingProps {
    isDark: boolean;
}

export const EventFinishedLanding = ({ isDark }: EventFinishedLandingProps) => {
    const [showStream, setShowStream] = useState(false);

    const styles = {
        container: isDark ? 'bg-[#050505]' : 'bg-[#f8f9fa]',
        card: isDark ? 'bg-[#111] border-white/5' : 'bg-white border-gray-200 shadow-sm',
        textPrimary: isDark ? 'text-white' : 'text-gray-900',
        textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
        accent: isDark ? 'text-[#f8e2bb]' : 'text-[#8c3034]',
    };

    // Enrich participants with social data
    const enrichedParticipants: Candidate[] = ALL_PARTICIPANTS.map(p => enrichCandidateData(p));
    const enrichedFinalRanking: Candidate[] = FALLBACK_CANDIDATES.map(p => enrichCandidateData(p));

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4">
            {/* Hero Section - Event Finished */}
            <section className="text-center py-12">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="bg-gradient-to-r from-[#8c3034] to-[#c45a5e] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                        🎉 EVENTO FINALIZADO
                    </span>
                </div>

                <h1 className={`text-4xl md:text-6xl font-serif mb-4 ${styles.textPrimary}`}>
                    La Mansión
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#f8e2bb] to-[#c4a574]">
                        Ha Terminado
                    </span>
                </h1>

                <p className={`text-lg max-w-2xl mx-auto ${styles.textSecondary}`}>
                    Gracias por ser parte de la historia del streaming latinoamericano.
                    Aquí puedes revivir los momentos y conocer a los participantes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button
                        onClick={() => setShowStream(!showStream)}
                        className="bg-[#8c3034] hover:bg-[#70262a] text-white font-bold py-4 px-8 rounded shadow-lg transition-all transform hover:scale-105 uppercase tracking-widest text-sm flex items-center gap-2 justify-center"
                    >
                        <Play size={18} />
                        {showStream ? 'Ocultar Stream' : 'Ver Stream'}
                    </button>
                    <a
                        href={EVENT_INFO.platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`border font-bold py-4 px-8 rounded shadow-sm transition-all transform hover:scale-105 uppercase tracking-widest text-sm flex items-center gap-2 justify-center ${isDark ? 'border-white/20 hover:bg-white/5 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-900'}`}
                    >
                        <Tv size={18} />
                        Canal de Kick
                    </a>
                </div>
            </section>

            {/* Stream Player (Hidden by default) */}
            {showStream && (
                <section className="max-w-5xl mx-auto">
                    <div className="rounded-xl overflow-hidden shadow-2xl border border-white/10">
                        <KickPlayer
                            channelSlug="westcol"
                            isDark={isDark}
                            isOpen={true}
                            onClose={() => setShowStream(false)}
                            embedded={true}
                            showChat={false}
                        />
                    </div>
                </section>
            )}

            {/* What was La Mansión */}
            <section className={`p-8 rounded-xl border ${styles.card}`}>
                <div className="flex items-center gap-3 mb-6">
                    <img src="/lamansion-logo.svg" alt="La Mansión" className="w-12 h-12" />
                    <h2 className={`text-2xl font-serif ${styles.textPrimary}`}>¿Qué fue La Mansión?</h2>
                </div>

                <p className={`text-lg leading-relaxed mb-6 ${styles.textSecondary}`}>
                    <strong className={styles.textPrimary}>La Mansión de los Streamers</strong> fue el proyecto más ambicioso del streaming latinoamericano, creado por <span className="font-bold">{EVENT_INFO.creator}</span>. Un experimento social donde creadores de contenido convivieron 24/7 bajo el mismo techo, enfrentando desafíos, eliminaciones y la convivencia diaria.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg border text-center ${isDark ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <Calendar className={`mx-auto mb-2 ${styles.accent}`} size={24} />
                        <div className={`text-2xl font-bold ${styles.textPrimary}`}>{EVENT_INFO.totalDays}</div>
                        <div className={`text-sm ${styles.textSecondary}`}>Días de evento</div>
                    </div>
                    <div className={`p-4 rounded-lg border text-center ${isDark ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <Users className={`mx-auto mb-2 ${styles.accent}`} size={24} />
                        <div className={`text-2xl font-bold ${styles.textPrimary}`}>{ALL_PARTICIPANTS.length}</div>
                        <div className={`text-sm ${styles.textSecondary}`}>Participantes</div>
                    </div>
                    <div className={`p-4 rounded-lg border text-center ${isDark ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <Tv className={`mx-auto mb-2 ${styles.accent}`} size={24} />
                        <div className={`text-2xl font-bold ${styles.textPrimary}`}>Kick</div>
                        <div className={`text-sm ${styles.textSecondary}`}>Plataforma</div>
                    </div>
                </div>
            </section>

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
                    <h2 className={`text-2xl font-serif ${styles.textPrimary}`}>Todos los Participantes</h2>
                </div>
                <ParticipantsGrid candidates={enrichedParticipants} isDark={isDark} />
            </section>

            {/* Where it was streamed */}
            <section className={`p-8 rounded-xl border text-center ${styles.card}`}>
                <Tv className={`mx-auto mb-4 ${styles.accent}`} size={32} />
                <h2 className={`text-2xl font-serif mb-2 ${styles.textPrimary}`}>¿Dónde se transmitió?</h2>
                <p className={`mb-6 ${styles.textSecondary}`}>
                    Todo el evento fue transmitido en vivo las 24 horas del día en Kick.
                </p>
                <a
                    href={EVENT_INFO.platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#53fc18] text-black font-bold py-3 px-6 rounded-lg hover:bg-[#42ca12] transition-all transform hover:scale-105"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M1.333 0h21.334C23.4 0 24 .6 24 1.333v21.334c0 .733-.6 1.333-1.333 1.333H1.333C.6 24 0 23.4 0 22.667V1.333C0 .6.6 0 1.333 0zm16.334 18.667v-4l-3.667-3.334 3.667-3.333V4h-4.667v5.333L9.333 5.667H5.333v12.666h4v-5.333l3.667 3.667v2h4z" />
                    </svg>
                    kick.com/{EVENT_INFO.platform.channel}
                </a>
            </section>
        </div>
    );
};
