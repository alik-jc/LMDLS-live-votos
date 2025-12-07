import { KICK_ICON } from '../utils/constants';

export const Header = () => {
    return (
        <header className="flex flex-col items-center mb-8">
            <div className="bg-primary/10 text-purple-300 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                Eliminaciones Día 4
            </div>

            <h1 className="text-5xl font-extrabold text-center tracking-tight mb-2 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                La Mansión
            </h1>

            <div className="text-gray-400 text-sm mb-5">
                Votación en tiempo real
            </div>

            <div className="flex gap-3 flex-wrap justify-center">
                <a
                    href={import.meta.env.VITE_VOTE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-br from-purple-600 to-indigo-600 shadow-[0_4px_20px_rgba(124,58,237,0.3)] border border-white/10 transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(124,58,237,0.5)]"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    Votar Ahora
                </a>

                <a
                    href="https://kick.com/westcol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-gray-400 bg-white/5 border border-white/10 transition-all hover:bg-white/10 hover:text-white"
                >
                    <img src={KICK_ICON} alt="Kick" width="18" height="18" />
                    Ver Stream
                </a>
            </div>
        </header>
    );
};
