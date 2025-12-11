import { Info } from 'lucide-react';

interface AboutSectionProps {
    isDark: boolean;
}

export const AboutSection = ({ isDark }: AboutSectionProps) => {
    const styles = {
        container: isDark ? 'bg-[#111] border-white/5' : 'bg-white border-gray-200 shadow-sm',
        textPrimary: isDark ? 'text-white' : 'text-gray-900',
        textSecondary: isDark ? 'text-gray-400' : 'text-gray-600',
        accent: isDark ? 'text-[#f8e2bb]' : 'text-[#8c3034]',
    };

    return (
        <div className={`max-w-4xl mx-auto p-8 rounded-xl border ${styles.container} animate-in fade-in slide-in-from-bottom-4`}>
            <div className="flex flex-col items-center gap-4 mb-8 text-center">
                <img src="/lamansion-logo.svg" alt="La Mansión Logo" className="w-24 h-24 object-contain drop-shadow-[0_0_15px_rgba(140,48,52,0.5)]" />
                <div className="flex items-center gap-3">
                    <Info className={styles.accent} size={28} />
                    <h2 className={`text-3xl font-bold font-serif ${styles.textPrimary}`}>¿Qué es La Mansión?</h2>
                </div>
            </div>

            <div className={`space-y-6 text-lg leading-relaxed ${styles.textSecondary}`}>
                <p>
                    <strong className={styles.textPrimary}>La Mansión de los Streamers</strong> es el proyecto más ambicioso del streaming latinoamericano, creado por <span className="font-bold">Westcol</span>. Un experimento social donde creadores de contenido conviven 24/7 bajo el mismo techo, enfrentando desafíos, eliminaciones y la convivencia diaria.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                    <div className={`p-5 rounded-lg border ${isDark ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <h3 className={`font-bold mb-2 ${styles.textPrimary}`}>🎥 Transmisión Diaria</h3>
                        <p className="text-sm">Todo lo que sucede es captado por cámaras en vivo. Nada se edita, todo es real. La audiencia es el juez supremo.</p>
                    </div>
                    <div className={`p-5 rounded-lg border ${isDark ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                        <h3 className={`font-bold mb-2 ${styles.textPrimary}`}>🗳️ El Poder del Voto</h3>
                        <p className="text-sm">Tú decides quién se queda y quién se va. Las votaciones en tiempo real definen el destino de los participantes cada dia.</p>
                    </div>
                </div>

                <p>
                    El objetivo es simple: sobrevivir a la convivencia, ganar los retos y conquistar al público para convertirse en el <span className={styles.accent}>Campeón o Campeona de La Mansión</span>.
                </p>
            </div>
        </div>
    );
};
