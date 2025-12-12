import React from 'react';
import { Sun, Moon, Menu, Github } from 'lucide-react';

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
    currentView: string;
    onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, currentView, onNavigate }) => {
    return (
        <nav className={`border-b backdrop-blur-md sticky top-0 z-50 transition-colors duration-300 ${isDark ? 'border-white/10 bg-[#0a0a0a]/80' : 'border-[#8c3034] bg-[#8c3034]/95'}`}>
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
                        Integrantes
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
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-colors hover:bg-white/10`}
                    >
                        {isDark ? <Sun size={20} className="text-[#f8dcb2]" /> : <Moon size={20} className="text-gray-300" />}
                    </button>
                    <button className={`md:hidden p-2 text-white`}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};
