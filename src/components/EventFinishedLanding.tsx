import { Tv, Trophy, Calendar, Instagram } from 'lucide-react';
import { EVENT_INFO } from '../data/fallbackData';
import { KickPlayer } from './KickPlayer';
import { useState } from 'react';
import { KICK_ICON } from '../utils/constants';

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

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
                    <a
                        href="https://www.instagram.com/lamansiondelosstreamers/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`border font-bold py-4 px-8 rounded shadow-sm transition-all transform hover:scale-105 uppercase tracking-widest text-sm flex items-center gap-2 justify-center ${isDark ? 'border-white/20 hover:bg-white/5 text-white' : 'border-gray-300 hover:bg-gray-50 text-gray-900'}`}
                    >
                        <Instagram size={18} className="text-[#E1306C]" />
                        /lamansiondelosstreamers
                    </a>
                    <a
                        href={EVENT_INFO.platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#53fc18] text-black font-bold py-4 px-8 rounded shadow-lg transition-all transform hover:scale-105 uppercase tracking-widest text-sm flex items-center gap-2 justify-center hover:bg-[#42ca12] animate-pulse"
                    >
                        <img src={KICK_ICON} alt="Kick" className="h-4" />
                        /westcol
                    </a>
                </div>
            </section>

            {/* Winners Showcase */}
            <section className="max-w-4xl mx-auto">
                <div className={`relative p-8 rounded-2xl border overflow-hidden ${isDark ? 'bg-gradient-to-br from-[#1a1a1a] to-black border-[#ffd700]/20' : 'bg-white border-yellow-200'}`}>
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ffd700]/10 via-transparent to-transparent pointer-events-none" />

                    <div className="relative text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/20 text-[#ffd700] text-xs font-bold uppercase tracking-wider mb-4">
                            <Trophy size={14} />
                            Ganadores Oficiales
                        </div>
                        <h2 className={`text-3xl md:text-4xl font-serif ${styles.textPrimary}`}>
                            Los Campeones
                        </h2>
                        <p className={`mt-2 text-sm ${styles.textSecondary}`}>
                            Elegidos por la comunidad y el consejo de profesores
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center justify-center max-w-2xl mx-auto">
                        {/* Winner 1 */}
                        <div className="flex flex-col items-center group">
                            <div className="relative w-32 h-32 mb-4">
                                <div className="absolute inset-0 rounded-full bg-[#ffd700] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                <img
                                    src="/avatars/1W1NH2dm.png"
                                    alt="Natalia Es Mejor"
                                    className="relative w-full h-full rounded-full object-cover border-4 border-[#ffd700] shadow-xl"
                                />
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black text-[10px] font-black px-3 py-0.5 rounded-full shadow-lg whitespace-nowrap">
                                    CAMPEONA
                                </div>
                            </div>
                            <h3 className={`text-xl font-bold ${styles.textPrimary}`}>Natalia Es Mejor</h3>
                            <div className="flex gap-3 mt-3">
                                <a href="https://www.instagram.com/nataliaeslamejorl" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors">
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Winner 2 */}
                        <div className="flex flex-col items-center group">
                            <div className="relative w-32 h-32 mb-4">
                                <div className="absolute inset-0 rounded-full bg-[#ffd700] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                                <img
                                    src="/avatars/Us5nUSJm.png"
                                    alt="Edits De Mierda"
                                    className="relative w-full h-full rounded-full object-cover border-4 border-[#ffd700] shadow-xl"
                                />
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffd700] to-[#ffaa00] text-black text-[10px] font-black px-3 py-0.5 rounded-full shadow-lg whitespace-nowrap">
                                    CAMPEÓN
                                </div>
                            </div>
                            <h3 className={`text-xl font-bold ${styles.textPrimary}`}>Edits De Mierda</h3>
                            <div className="flex gap-3 mt-3">
                                <a href="https://www.instagram.com/soyedits_oficial" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-colors">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://kick.com/editsdemrd" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#53fc18] transition-colors">
                                    <img src={KICK_ICON} alt="Kick" className="w-4 h-4 opacity-70 hover:opacity-100" />
                                </a>
                            </div>
                        </div>
                    </div>
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
                    <strong className={styles.textPrimary}>La Mansión de los Streamers</strong> fue la primera <span className="font-bold">Universidad de Streaming</span> en Latinoamérica, creada por <span className="font-bold">{EVENT_INFO.creator}</span>. {EVENT_INFO.totalParticipants} creadores de contenido convivieron durante {EVENT_INFO.totalDays} días, aprendiendo, compitiendo y enfrentando eliminaciones decididas por el público.
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg border text-center ${isDark ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <Calendar className={`mx-auto mb-2 ${styles.accent}`} size={24} />
                        <div className={`text-2xl font-bold ${styles.textPrimary}`}>{EVENT_INFO.totalDays}</div>
                        <div className={`text-sm ${styles.textSecondary}`}>Días de evento</div>
                    </div>
                    <div className={`p-4 rounded-lg border text-center ${isDark ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <Trophy className={`mx-auto mb-2 ${styles.accent}`} size={24} />
                        <div className={`text-2xl font-bold ${styles.textPrimary}`}>{EVENT_INFO.totalParticipants}</div>
                        <div className={`text-sm ${styles.textSecondary}`}>Participantes</div>
                    </div>
                    <div className={`p-4 rounded-lg border text-center ${isDark ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <Tv className={`mx-auto mb-2 ${styles.accent}`} size={24} />
                        <div className={`text-2xl font-bold ${styles.textPrimary}`}>Kick</div>
                        <div className={`text-sm ${styles.textSecondary}`}>Plataforma</div>
                    </div>
                </div>
            </section>

            {/* Sponsors Section */}
            <section className={`p-8 rounded-xl border text-center ${styles.card} mt-12`}>
                <h2 className={`text-xl font-serif mb-6 uppercase tracking-widest ${styles.textSecondary}`}>Patrocinadores Oficiales</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Sponsors */}
                    <div className="flex items-center justify-center p-4">
                        <img src="/sponsors/stake.svg" alt="Stake" className="h-8 object-contain" />
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <img src="/sponsors/dynamo-1.png" alt="Dynamo" className="h-12 object-contain" />
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <img src="/sponsors/AMPER-1.png" alt="Amper" className="h-12 object-contain" />
                    </div>
                    <div className="flex items-center justify-center p-4">
                        <img src="/sponsors/LOGO_HUMO_BARRILES.webp" alt="Humo Barriles" className="h-16 object-contain" />
                    </div>
                </div>
            </section>
        </div>
    );
};
