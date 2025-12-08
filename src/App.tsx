import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DangerZone } from './components/DangerZone';
import { FilterButtons } from './components/FilterButtons';
import { LeaderBoard } from './components/LeaderBoard';
import { VersionChecker } from './components/VersionChecker';
import { AboutSection } from './components/AboutSection';
import { ParticipantsGrid } from './components/ParticipantsGrid';
import { HeroSection } from './components/HeroSection';
import { getGender } from './utils/helpers';
import { enrichCandidateData } from './utils/enrichment';
import type { Candidate, FilterType, VotesData } from './types';
import { Users } from 'lucide-react';

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

    const males = enrichedCandidates.filter(c => getGender(c.name) === 'M');
    const females = enrichedCandidates.filter(c => getGender(c.name) === 'F');

    // Get bottom 2 of each gender
    const lowestMales = males.slice(-2);
    const lowestFemales = females.slice(-2);
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
      {/* Background Glow (Dark Mode Only) - Removed to match original scheme */}
      {/* {isDark && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[#8c3034] opacity-[0.07] blur-[150px] rounded-full pointer-events-none z-0"></div>
      )} */}

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

        {/* HERO SECTION */}
        <HeroSection
          timeLeft={countdown}
          totalVotes={totalVotes}
          activeParticipants={candidates.length}
          isTheaterMode={isTheaterMode}
          toggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
          showChat={showChat}
          toggleChat={() => setShowChat(!showChat)}
          isDark={isDark}
          isNoVotingState={isNoVotingState}
          voteUrl={import.meta.env.VITE_VOTE_URL}
        />

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

                {/* RANKING TABLE */}
                <div id="ranking" className="mt-16 mb-12 scroll-mt-24">
                  <div className={`flex justify-between items-end mb-6 border-b pb-4 ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-[#f8dcb2]"><Users size={24} /></span>
                      <h2 className={`text-2xl font-serif ${isDark ? 'text-white' : 'text-gray-900'}`}>Ranking General</h2>
                    </div>

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
          <div className="space-y-6 mt-12">
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
          <div className="mt-16">
            <AboutSection isDark={isDark} />
          </div>
        )}

        <div className="text-center mt-10 text-gray-400 text-sm">
          Actualizado automáticamente. <span>{lastFetchTime}</span>
        </div>
      </main>
    </div>
  );
}

export default App;
