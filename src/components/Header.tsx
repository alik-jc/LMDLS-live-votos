import React, { useState } from 'react';
import { Menu, Github, X } from 'lucide-react';

interface HeaderProps {
    currentView: string;
    onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavigate = (view: string) => {
        onNavigate(view);
        setIsMenuOpen(false);
    };

    return (
        <nav className="border-b backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 border-white/10 bg-[#0a0a0a]/80">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src="/lamansion-logo.svg" alt="La Mansión" className="h-12 w-auto" />
                    <div className="hidden md:block">
                        <h1 className={`font-serif tracking-wider text-xl leading-none text-white`}>LA MANSIÓN</h1>
                        <p className="text-[10px] text-gray-300 uppercase tracking-[0.2em] font-bold">DE LOS STREAMERS BY WESTCOL</p>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-gray-300">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className={`transition-colors ${currentView === 'dashboard' ? 'text-white' : 'hover:text-white'}`}
                    >
                        Inicio
                    </button>
                    <button
                        onClick={() => onNavigate('community')}
                        className={`transition-colors ${currentView === 'community' ? 'text-white' : 'hover:text-white'}`}
                    >
                        Votaciones
                    </button>
                    <button
                        onClick={() => onNavigate('about')}
                        className={`transition-colors ${currentView === 'about' ? 'text-white' : 'hover:text-white'}`}
                    >
                        Qué es La Mansión
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/alik-jc/LMDLS-live-votos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full transition-colors hover:bg-white/10 text-gray-300 hover:text-white`}
                        title="Ver código fuente"
                    >
                        <Github size={20} />
                    </a>
                    <button
                        className={`md:hidden p-2 text-white transition-colors hover:bg-white/10 rounded-full`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 animate-in slide-in-from-top-5">
                    <div className="flex flex-col p-6 space-y-6 text-center">
                        <button
                            onClick={() => handleNavigate('dashboard')}
                            className={`text-xl font-medium py-3 border-b border-white/10 ${currentView === 'dashboard' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Inicio
                        </button>
                        <button
                            onClick={() => handleNavigate('community')}
                            className={`text-xl font-medium py-3 border-b border-white/10 ${currentView === 'community' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Votaciones
                        </button>
                        <button
                            onClick={() => handleNavigate('about')}
                            className={`text-xl font-medium py-3 border-b border-white/10 ${currentView === 'about' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Qué es La Mansión
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
