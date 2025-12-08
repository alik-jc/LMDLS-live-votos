import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatsPanel } from './components/StatsPanel';
import { DangerZone } from './components/DangerZone';
import { FilterButtons } from './components/FilterButtons';
import { LeaderBoard } from './components/LeaderBoard';
import { BotLeaderBoard } from './components/BotLeaderBoard';
import { VersionChecker } from './components/VersionChecker';
import { KickPlayer } from './components/KickPlayer';
import { AboutSection } from './components/AboutSection';
import { ParticipantsGrid } from './components/ParticipantsGrid';
import { findLowest, getGender } from './utils/helpers';
import { enrichCandidateData } from './utils/enrichment';
import type { Candidate, FilterType, VotesData } from './types';
import { Trophy, Maximize2, Minimize2, MessageSquare, MessageSquareOff, Users, Clock } from 'lucide-react';

const FILTER_CACHE_KEY = 'mansion_filter_preference';
const THEME_CACHE_KEY = 'mansion_theme_preference';

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [dangerList, setDangerList] = useState<string[]>([]);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Theme State
  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_CACHE_KEY);
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(THEME_CACHE_KEY, newTheme);
  };

  // View State
  const [currentView, setCurrentView] = useState('dashboard');

  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  useEffect(() => {
    const savedFilter = localStorage.getItem(FILTER_CACHE_KEY);
    if (savedFilter) {
      setCurrentFilter(savedFilter as FilterType);
    }
  }, []);

  const [totalVotes, setTotalVotes] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState('--:--');
  const [countdown, setCountdown] = useState('--:--');
  const [loading, setLoading] = useState(true);


  const isVotingPaused = import.meta.env.VITE_VOTING_PAUSED === 'true';
  const apiUrl = import.meta.env.VITE_API_URL;
  const CHANNEL_SLUG = "westcol";

  const CACHE_KEY = 'mansion_votes_data';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const processData = (data: VotesData, timestamp?: number) => {
    // Check if we have visual data (votes)
    const hasVisualData = data.payload.settings?.results?.visual_data?.length > 0;
    const rawData = hasVisualData ? data.payload.settings.results.visual_data[0] : {};

    // Map array of objects to array of strings (names)
    const validCandidates = data.payload.candidates?.map(c => c.name) || [];
    const candidatesList: Candidate[] = [];

    if (hasVisualData) {
      // Normal mode: We have votes
      for (const [key, value] of Object.entries(rawData)) {
        if (key !== 'round') {
          // Filter by valid candidates list if available
          if (validCandidates.length > 0 && !validCandidates.includes(key)) {
            continue;
          }
          candidatesList.push({ name: key, votes: value });
        }
      }
    } else if (validCandidates.length > 0) {
      // Fallback mode: We only have candidates, no votes yet
      validCandidates.forEach(name => {
        candidatesList.push({ name, votes: 0 });
      });
    }

    candidatesList.sort((a, b) => b.votes - a.votes);

    const total = candidatesList.reduce((sum, c) => sum + c.votes, 0);

    // Calculate Standard Deviation (only if we have votes)
    let threshold = 0;
    if (total > 0) {
      const mean = total / candidatesList.length;
      const variance = candidatesList.reduce((sum, c) => sum + Math.pow(c.votes - mean, 2), 0) / candidatesList.length;
      const stdDev = Math.sqrt(variance);
      threshold = mean + stdDev;
    }

    const enrichedCandidates = candidatesList.map((c) => {
      let botPercentage = '0';

      if (total > 0 && c.votes > threshold) {
        const suspiciousVotes = c.votes - threshold;
        botPercentage = ((suspiciousVotes / c.votes) * 100).toFixed(1);
      }

      const baseCandidate = {
        ...c,
        percentage: total > 0 ? ((c.votes / total) * 100).toFixed(1) : '0',
        botPercentage: botPercentage === '0.0' ? '0' : botPercentage
      };

      // Enrich with social media and live status
      return enrichCandidateData(baseCandidate);
    });

    const lowestMales = findLowest(enrichedCandidates, 'M');
    const lowestFemales = findLowest(enrichedCandidates, 'F');
    const danger = [...lowestMales, ...lowestFemales].map((c) => c.name);

    setCandidates(enrichedCandidates);
    setDangerList(danger);
    setTotalVotes(total);
    setLastFetchTime(new Date(timestamp || Date.now()).toLocaleTimeString());
    setLoading(false);
  };

  const fetchData = async () => {
    // Removed isVotingPaused check to allow continuous updates
    try {
      const targetUrl = apiUrl;
      const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(targetUrl + '?_=' + Date.now());
      const response = await fetch(proxyUrl, { cache: 'no-store' });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      const now = Date.now();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
      processData(data, now);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (candidates.length === 0) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const cached = localStorage.getItem(CACHE_KEY);
    let shouldFetch = true;

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        processData(data, timestamp);

        const age = Date.now() - timestamp;
        if (age < CACHE_DURATION) {
          shouldFetch = false;
        }
      } catch (e) {
        console.error("Cache parse error", e);
      }
    }

    if (shouldFetch) {
      fetchData();
    }

    let lastFetchMinute = -1;
    const interval = setInterval(() => {
      // Removed isVotingPaused check to allow continuous updates
      const now = new Date();
      const min = now.getMinutes();
      const sec = now.getSeconds();

      if (min % 5 === 0 && lastFetchMinute !== min) {
        lastFetchMinute = min;
        fetchData();
      }

      const remMin = 4 - (min % 5);
      const remSec = 59 - sec;
      setCountdown(`${remMin}:${remSec.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVotingPaused]);

  useEffect(() => {
    localStorage.setItem(FILTER_CACHE_KEY, currentFilter);

    if (currentFilter === 'all') {
      setFilteredCandidates(candidates);
    } else {
      setFilteredCandidates(
        candidates.filter((c) => getGender(c.name) === currentFilter)
      );
    }
  }, [currentFilter, candidates]);

  const dangerCandidates = candidates.filter((c) => dangerList.includes(c.name));
  const botCandidates = candidates
    .filter(c => c.botPercentage && c.botPercentage !== '0')
    .sort((a, b) => parseFloat(b.botPercentage || '0') - parseFloat(a.botPercentage || '0'));

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-[#050505]' : 'bg-gray-50'}`}>
        <div
          suppressHydrationWarning
          className="w-10 h-10 border-4 border-gray-300 border-t-[#8c3034] rounded-full animate-spin"
        />
      </div>
    );
  }

  const isNoVotingState = isVotingPaused && totalVotes === 0;
  const isActiveButNoData = !isVotingPaused && totalVotes === 0;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-[#050505] text-gray-100' : 'bg-[#f8f9fa] text-gray-900'}`}>

      {/* Background Glow (Dark Mode Only) */}
      {isDark && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[#8c3034] opacity-[0.07] blur-[150px] rounded-full pointer-events-none z-0"></div>
      )}

      <VersionChecker />

      {isVotingPaused && !isNoVotingState && (
        <div className="fixed top-0 left-0 w-full bg-blue-600/90 text-white font-bold text-center py-2 z-50 backdrop-blur-sm shadow-lg text-sm">
          ℹ️ Esperando la próxima votación del día. Los datos se siguen actualizando.
        </div>
      )}

      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentView={(isNoVotingState && currentView !== 'about') ? 'participants' : currentView}
        onNavigate={setCurrentView}
      />

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 ${isVotingPaused && !isNoVotingState ? 'mt-8' : ''}`}>

        {/* HERO / STATS HEADER - Always visible */}
        <div className={`grid gap-8 mb-12 animate-in fade-in slide-in-from-bottom-2 transition-all duration-500 ${isTheaterMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'
          }`}>

          {/* Left Column (Stats/Info) - Order changes in theater mode */}
          <div className={`space-y-6 ${isTheaterMode ? 'order-2 flex flex-col items-center text-center' : 'order-1'}`}>
            <div className={`space-y-3 ${isTheaterMode ? 'flex flex-col items-center' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${isDark ? 'bg-[#8c3034]/20 border-[#8c3034]/30 text-[#f8e2bb]' : 'bg-[#8c3034] text-white border-[#8c3034]'
                  }`}>
                  Día 5
                </span>
                <span className={`text-xs font-semibold flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isNoVotingState ? 'bg-gray-500' : 'bg-red-500 animate-pulse'}`}></span>
                  {isNoVotingState ? 'Votación Finalizada' : 'Votación en tiempo real'}
                </span>
              </div>
              <h1 className={`text-4xl md:text-6xl font-bold leading-tight font-serif ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                {isNoVotingState ? 'Votación No Activa' : <>Eliminación <br /> en Proceso</>}
              </h1>
              <p className={`text-[10px] italic opacity-60 ${isDark ? 'text-sm' : 'text-sm'}`}>
                * Los resultados pueden variar por decisión de producción.
              </p>

              {!isNoVotingState && (
                <a
                  href={import.meta.env.VITE_VOTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-block mt-4 px-8 py-3 rounded font-bold uppercase tracking-wider text-sm transition-all ${isDark
                    ? 'bg-gradient-to-r from-[#8c3034] to-[#6d2528] text-white shadow-[0_0_20px_rgba(140,48,52,0.3)]'
                    : 'bg-[#8c3034] text-white hover:bg-[#70262a] shadow-md'
                    }`}
                >
                  Votar Ahora
                </a>
              )}
            </div>

            {/* In theater mode, we might want to display stats differently or keep them here */}
            <div className={isTheaterMode ? "w-full max-w-3xl flex justify-center" : ""}>
              {isActiveButNoData ? (
                <div className="flex justify-center gap-2 w-full lg:w-auto sm:gap-4">
                  {/* Carlangas Card */}
                  <div className={`flex-1 min-w-0 p-2 sm:p-5 rounded-lg text-center ${isDark ? 'bg-[#111] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                    <div className="flex justify-center mb-1 sm:mb-2">
                      <img
                        src="https://i.postimg.cc/kgrWGqZm/image.png"
                        alt="Carlangas"
                        className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border border-[#8c3034] object-cover"
                      />
                    </div>
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5 sm:mb-1 truncate">Carlangas</p>
                    <p className={`text-xs sm:text-sm font-light ${isDark ? 'text-white' : 'text-black'}`}>Hay votaciones activas</p>
                    <p className={`text-xs sm:text-sm font-light ${isDark ? 'text-white' : 'text-black'}`}>Pero no hay datos</p>
                  </div>

                  {/* Participants Card */}
                  <div className={`flex-1 min-w-0 p-2 sm:p-5 rounded-lg text-center ${isDark ? 'bg-[#111] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                    <div className="flex justify-center mb-1 sm:mb-2 text-gray-400"><Users size={14} className="sm:w-4 sm:h-4" /></div>
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5 sm:mb-1 truncate">Participantes Activos</p>
                    <p className={`text-lg sm:text-3xl font-light font-serif ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>{candidates.length}</p>
                  </div>

                  {/* Countdown Card */}
                  <div className={`flex-1 min-w-0 p-2 sm:p-5 rounded-lg text-center ${isDark ? 'bg-[#111] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                    <div className="flex justify-center mb-1 sm:mb-2 text-gray-400"><Clock size={14} className="sm:w-4 sm:h-4" /></div>
                    <p className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-0.5 sm:mb-1 truncate">Cierre</p>
                    <p className={`text-lg sm:text-3xl font-mono font-medium ${isDark ? 'text-[#f8e2bb]' : 'text-[#1a1a1a]'}`}>
                      {countdown}
                    </p>
                  </div>
                </div>
              ) : (
                <StatsPanel
                  totalVotes={totalVotes}
                  totalCandidates={candidates.length}
                  countdown={countdown}
                  isDark={isDark}
                  showVotes={!isNoVotingState}
                  showCountdown={!isNoVotingState}
                />
              )}
            </div>

          </div>

          {/* Right Column (Player) - Order changes in theater mode */}
          <div className={`w-full ${isTheaterMode ? 'order-1' : 'order-2'}`}>
            <div className="flex justify-end mb-2 gap-2">
              <button
                onClick={() => setShowChat(!showChat)}
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${isDark
                  ? 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
              >
                {showChat ? (
                  <>
                    <MessageSquareOff size={14} /> Ocultar Chat
                  </>
                ) : (
                  <>
                    <MessageSquare size={14} /> Mostrar Chat
                  </>
                )}
              </button>
              <button
                onClick={() => setIsTheaterMode(!isTheaterMode)}
                className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${isDark
                  ? 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
              >
                {isTheaterMode ? (
                  <>
                    <Minimize2 size={14} /> Salir de Teatro
                  </>
                ) : (
                  <>
                    <Maximize2 size={14} /> Modo Teatro
                  </>
                )}
              </button>
            </div>
            <KickPlayer
              channelSlug={CHANNEL_SLUG}
              isDark={isDark}
              isOpen={true}
              onClose={() => { }}
              embedded={true}
              showChat={showChat}
              onToggleChat={() => setShowChat(!showChat)}
            />
          </div>
        </div>

        {/* VIEW CONTENT */}
        {!isNoVotingState && currentView === 'dashboard' && (
          <>
            {isActiveButNoData ? (
              <div className="space-y-6">
                {/* Empty state - grid hidden */}
              </div>
            ) : (
              <>
                <DangerZone candidates={dangerCandidates} isDark={isDark} />

                <BotLeaderBoard candidates={botCandidates} isDark={isDark} />

                {/* RANKING TABLE */}
                <div className="mb-12">
                  <div className={`flex justify-between items-end mb-4 border-b pb-2 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <h2 className={`text-2xl font-bold font-serif flex items-center gap-2 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                      <Trophy size={24} className={isDark ? "text-[#f8e2bb]" : "text-[#d4af37]"} /> Ranking General
                    </h2>

                    <FilterButtons
                      currentFilter={currentFilter}
                      onFilterChange={setCurrentFilter}
                      isDark={isDark}
                    />
                  </div>

                  <LeaderBoard
                    candidates={filteredCandidates}
                    dangerList={dangerList}
                    isDark={isDark}
                  />
                </div>
              </>
            )}
          </>
        )}

        {(currentView === 'participants' || (isNoVotingState && currentView !== 'about')) && (
          <div className="space-y-6">
            {!isActiveButNoData && (
              <h2 className={`text-3xl font-bold font-serif text-center mb-8 ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                Activos en La Mansión
              </h2>
            )}
            <p className="text-center text-sm">En esta sección se muestran los candidatos que están activos en la votación.</p>
            <ParticipantsGrid candidates={candidates} isDark={isDark} />
          </div>
        )}

        {currentView === 'about' && (
          <AboutSection isDark={isDark} />
        )}

        <div className="text-center mt-10 text-gray-400 text-sm">
          Actualizado automáticamente. <span>{lastFetchTime}</span>
        </div>
      </main>
    </div>
  );
}

export default App;
