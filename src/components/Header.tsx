import { useState } from 'react';
import { Menu, X, Sun, Moon, Github } from 'lucide-react';

// Logo SVG Component
const LogoMansion = ({ className = "w-10 h-10" }: { className?: string }) => (
    <img src="/lamansion-logo.svg" alt="Logo La Mansión" className={className} />
);

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
    currentView: string;
    onNavigate: (view: string) => void;
}

export const Header = ({ isDark, toggleTheme, currentView, onNavigate }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Styles based on theme
    const styles = {
        navBg: isDark
            ? 'bg-[#0a0a0a]/90 border-b border-white/5 backdrop-blur-md'
            : 'bg-[#8c3034] shadow-md',
        navText: isDark ? 'text-gray-300 hover:text-white' : 'text-white/90 hover:text-white',
        navActive: isDark ? 'bg-white/10 text-white' : 'bg-white/20 text-white font-bold',
        btnStream: isDark
            ? 'bg-white text-black hover:bg-[#f8e2bb]'
            : 'bg-[#f8e2bb] text-[#8c3034] hover:bg-white',
        mobileMenuBg: isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-[#7a2a2d] border-[#8c3034]',
    };

    const navItems = [
        { id: 'dashboard', label: 'Votación' },
        { id: 'participants', label: 'Participantes' },
        { id: 'about', label: 'Qué es La Mansión' },
    ];

    return (
        <nav className={`sticky top-0 z-50 transition-colors duration-300 ${styles.navBg}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo + Brand */}
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
                        <LogoMansion className="w-10 h-10" />
                        <div className="hidden sm:flex flex-col">
                            <span className="font-serif font-bold text-lg leading-none tracking-wide text-white">LA MANSIÓN</span>
                            <span className={`text-[10px] tracking-[0.2em] uppercase ${isDark ? 'text-gray-400' : 'text-white/70'}`}>DE LOS STREAMERS BY WESTCOL</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`px-4 py-1.5 text-sm font-medium rounded transition-all ${currentView === item.id ? styles.navActive : styles.navText}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://github.com/alik-jc/LMDLS-live-votos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-2 rounded-full transition-colors ${isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/20'}`}
                            title="Ver código fuente"
                        >
                            <Github size={18} />
                        </a>
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full ${isDark ? 'text-yellow-400 hover:bg-white/10' : 'text-white/80 hover:bg-white/20'}`}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-1 text-white">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className={`md:hidden border-t ${styles.mobileMenuBg}`}>
                    <div className="px-4 py-2 space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }}
                                className="block w-full text-left py-3 text-white font-medium"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};
