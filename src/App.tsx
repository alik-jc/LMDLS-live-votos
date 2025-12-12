import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PossibleChampions } from './components/PossibleChampions';
import { DangerZone } from './components/DangerZone';
import { FilterButtons } from './components/FilterButtons';
import { LeaderBoard } from './components/LeaderBoard';
import { VersionChecker } from './components/VersionChecker';
import { AboutSection } from './components/AboutSection';
import { ParticipantsGrid } from './components/ParticipantsGrid';
import { HeroSection } from './components/HeroSection';
import { CommunityPage } from './components/CommunityPage';
import { EventFinishedLanding } from './components/EventFinishedLanding';
import { FALLBACK_CANDIDATES } from './data/fallbackData';
import { enrichCandidateData } from './utils/enrichment';
import { formatTime } from './utils/helpers';
import type { Candidate, FilterType } from './types';
import { Users } from 'lucide-react';

function App() {
  // State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return true;
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [lastFetchTime, setLastFetchTime] = useState<string>('');
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [countdown, setCountdown] = useState<string>('');
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  // Environment variables
  const isEventFinished = import.meta.env.VITE_EVENT_FINISHED === 'true';
  const isFinal = import.meta.env.VITE_IS_FINAL === 'true';
  const currentDay = parseInt(import.meta.env.VITE_CURRENT_DAY || '1');
  const totalDays = parseInt(import.meta.env.VITE_TOTAL_DAYS || '7');
  const voteUrl = import.meta.env.VITE_VOTE_URL;

  // Derived state
  const isVotingPaused = false;
  const isNoVotingState = isEventFinished || isVotingPaused;
  const isActiveButNoData = !loading && candidates.length === 0;

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use fallback data enriched
        const enriched = FALLBACK_CANDIDATES.map(enrichCandidateData);
        setCandidates(enriched);
        setTotalVotes(enriched.reduce((acc, c) => acc + c.votes, 0));
        setLastFetchTime(formatTime(new Date()));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // 1 min update
    return () => clearInterval(interval);
  }, []);

  // Countdown logic
  useEffect(() => {
    const updateCountdown = () => {
      // Placeholder logic for countdown
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setCountdown("00:00:00");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter logic
  const filteredCandidates = candidates.filter(c => {
    if (currentFilter === 'M') return c.gender === 'M';
    if (currentFilter === 'F') return c.gender === 'F';
    return true;
  });

  // Danger list logic (bottom 3 active participants)
  const dangerList = candidates
    .filter(c => !c.eliminated)
    .sort((a, b) => a.votes - b.votes)
    .slice(0, 3)
    .map(c => c.name);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-[#050505] text-gray-100' : 'bg-[#f8f9fa] text-gray-900'}`}>

      <VersionChecker />

      {/* Event Finished Mode */}
      {isEventFinished ? (
        <>
          <Header
            isDark={isDark}
            toggleTheme={toggleTheme}
            currentView={currentView}
            onNavigate={setCurrentView}
          />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            {currentView === 'about' ? (
              <div className="mt-16">
                <AboutSection isDark={isDark} />
              </div>
            ) : currentView === 'community' ? (
              <CommunityPage isDark={isDark} />
            ) : (
              <EventFinishedLanding isDark={isDark} />
            )}
          </main>
        </>
      ) : (
        <>
          {/* Active Voting Mode */}
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
              voteUrl={voteUrl}
              currentDay={currentDay}
              totalDays={totalDays}
              isFinal={isFinal}
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
                    {/* Show PossibleChampions only on final day, otherwise DangerZone */}
                    {isFinal ? (
                      <PossibleChampions candidates={filteredCandidates} dangerList={dangerList} isDark={isDark} />
                    ) : (
                      <DangerZone candidates={candidates.filter(c => dangerList.includes(c.name))} isDark={isDark} />
                    )}

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
        </>
      )}
    </div>
  );
}

export default App;
