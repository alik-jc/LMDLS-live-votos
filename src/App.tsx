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
import { Trophy } from 'lucide-react';

const FILTER_CACHE_KEY = 'mansion_filter_preference';
const THEME_CACHE_KEY = 'mansion_theme_preference';

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [dangerList, setDangerList] = useState<string[]>([]);

  // Theme State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_CACHE_KEY) || 'dark';
  });
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem(THEME_CACHE_KEY, newTheme);
  };

  // View State
  const [currentView, setCurrentView] = useState('dashboard');

  const [currentFilter, setCurrentFilter] = useState<FilterType>(() => {
    const saved = localStorage.getItem(FILTER_CACHE_KEY);
    return (saved as FilterType) || 'all';
  });

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
    const rawData = data.payload.settings.results.visual_data[0];
    // Map array of objects to array of strings (names)
    const validCandidates = data.payload.candidates?.map(c => c.name);
    const candidatesList: Candidate[] = [];

    for (const [key, value] of Object.entries(rawData)) {
      if (key !== 'round') {
        // Filter by valid candidates list if available
        if (validCandidates && !validCandidates.includes(key)) {
          continue;
        }
        candidatesList.push({ name: key, votes: value });
      }
    }

    candidatesList.sort((a, b) => b.votes - a.votes);

    const total = candidatesList.reduce((sum, c) => sum + c.votes, 0);

    // Calculate Standard Deviation
    const mean = total / candidatesList.length;
    const variance = candidatesList.reduce((sum, c) => sum + Math.pow(c.votes - mean, 2), 0) / candidatesList.length;
    const stdDev = Math.sqrt(variance);
    const threshold = mean + stdDev;

    const enrichedCandidates = candidatesList.map((c) => {
      let botPercentage = '0';

      if (c.votes > threshold) {
        const suspiciousVotes = c.votes - threshold;
        botPercentage = ((suspiciousVotes / c.votes) * 100).toFixed(1);
      }

      const baseCandidate = {
        ...c,
        percentage: ((c.votes / total) * 100).toFixed(1),
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
    if (isVotingPaused) return;

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

    if (shouldFetch && !isVotingPaused) {
      fetchData();
    } else if (isVotingPaused && !cached) {
      setLoading(false);
    }

    let lastFetchMinute = -1;
    const interval = setInterval(() => {
      if (isVotingPaused) return;

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
        <div className="w-10 h-10 border-4 border-gray-300 border-t-[#8c3034] rounded-full animate-[spin_1s_linear_infinite]" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-[#050505] text-gray-100' : 'bg-[#f8f9fa] text-gray-900'}`}>

      {/* Background Glow (Dark Mode Only) */}
      {isDark && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[#8c3034] opacity-[0.07] blur-[150px] rounded-full pointer-events-none z-0"></div>
      )}

      <VersionChecker />

      {isVotingPaused && (
        <div className="fixed top-0 left-0 w-full bg-yellow-500/90 text-black font-bold text-center py-3 z-50 backdrop-blur-sm shadow-lg animate-pulse">
          ⛔ VOTACIONES CERRADAS: Los resultados ya han sido revelados en el stream.
        </div>
      )}

      <Header
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentView={currentView}
        onNavigate={setCurrentView}
      />

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 ${isVotingPaused ? 'mt-12' : ''}`}>

        {/* HERO / STATS HEADER - Always visible */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${isDark ? 'bg-[#8c3034]/20 border-[#8c3034]/30 text-[#f8e2bb]' : 'bg-[#8c3034] text-white border-[#8c3034]'
                  }`}>
                  Día 5
                </span>
                <span className={`text-xs font-semibold flex items-center gap-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Votación en tiempo real
                </span>
              </div>
              <h1 className={`text-4xl md:text-6xl font-bold leading-tight font-serif ${isDark ? 'text-white' : 'text-[#1a1a1a]'}`}>
                Eliminación <br /> en Proceso
              </h1>
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
            </div>

            <StatsPanel
              totalVotes={totalVotes}
              totalCandidates={candidates.length}
              countdown={countdown}
              isDark={isDark}
            />
          </div>

          <div className="w-full">
            <KickPlayer
              channelSlug={CHANNEL_SLUG}
              isDark={isDark}
              isOpen={true}
              onClose={() => { }}
              embedded={true}
            />
          </div>
        </div>

        {/* VIEW CONTENT */}
        {currentView === 'dashboard' && (
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

        {currentView === 'participants' && (
          <ParticipantsGrid candidates={candidates} isDark={isDark} />
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
