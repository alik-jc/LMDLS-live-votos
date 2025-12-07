import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatsPanel } from './components/StatsPanel';
import { DangerZone } from './components/DangerZone';
import { FilterButtons } from './components/FilterButtons';
import { LeaderBoard } from './components/LeaderBoard';
import { BotLeaderBoard } from './components/BotLeaderBoard';
import { findLowest, getGender } from './utils/helpers';
import type { Candidate, FilterType, VotesData } from './types';

const FILTER_CACHE_KEY = 'mansion_filter_preference';

function App() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [dangerList, setDangerList] = useState<string[]>([]);

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

  const CACHE_KEY = 'mansion_votes_data';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  const processData = (data: VotesData, timestamp?: number) => {
    const rawData = data.payload.settings.results.visual_data[0];
    const candidatesList: Candidate[] = [];

    for (const [key, value] of Object.entries(rawData)) {
      if (key !== 'round') {
        candidatesList.push({ name: key, votes: value });
      }
    }

    candidatesList.sort((a, b) => b.votes - a.votes);

    const total = candidatesList.reduce((sum, c) => sum + c.votes, 0);

    // Calculate Standard Deviation
    const mean = total / candidatesList.length;
    const variance = candidatesList.reduce((sum, c) => sum + Math.pow(c.votes - mean, 2), 0) / candidatesList.length;
    const stdDev = Math.sqrt(variance);
    const threshold = mean + stdDev; // Threshold is Mean + 1 Standard Deviation

    const withPercentage = candidatesList.map((c) => {
      let botPercentage = '0';

      // Only flag if votes exceed the threshold (Mean + SD)
      if (c.votes > threshold) {
        const suspiciousVotes = c.votes - threshold;
        botPercentage = ((suspiciousVotes / c.votes) * 100).toFixed(1);
      }

      return {
        ...c,
        percentage: ((c.votes / total) * 100).toFixed(1),
        botPercentage: botPercentage === '0.0' ? '0' : botPercentage
      };
    });

    // Identificar en peligro
    const lowestMales = findLowest(withPercentage, 'M');
    const lowestFemales = findLowest(withPercentage, 'F');
    const danger = [...lowestMales, ...lowestFemales].map((c) => c.name);

    setCandidates(withPercentage);
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
      // If we don't have any candidates yet (no cache), stop loading to show empty state or error
      if (candidates.length === 0) {
        setLoading(false);
      }
    }
  };

  // Timer and Fetch Logic
  useEffect(() => {
    // Check Cache Initial Load
    const cached = localStorage.getItem(CACHE_KEY);
    let shouldFetch = true;

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        // Always show cached data first (Stale-While-Revalidate)
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
      // If paused and no cache (e.g. incognito), stop loading so alert shows
      setLoading(false);
    }

    let lastFetchMinute = -1;
    const interval = setInterval(() => {
      if (isVotingPaused) return;

      const now = new Date();
      const min = now.getMinutes();
      const sec = now.getSeconds();

      // Fetch every 5 minutes
      if (min % 5 === 0 && lastFetchMinute !== min) {
        lastFetchMinute = min;
        fetchData();
      }

      // Update countdown
      const remMin = 4 - (min % 5);
      const remSec = 59 - sec;
      setCountdown(`${remMin}:${remSec.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVotingPaused]);

  // Apply Filter & Save Preference
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

  const maxVotes = filteredCandidates.length > 0 ? filteredCandidates[0].votes : 1;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-white/10 border-t-primary rounded-full animate-[spin_1s_linear_infinite]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-color text-text-color font-sans p-4 md:p-8">
      {isVotingPaused && (
        <div className="fixed top-0 left-0 w-full bg-yellow-500/90 text-black font-bold text-center py-3 z-50 backdrop-blur-sm shadow-lg animate-pulse">
          ⛔ VOTACIONES CERRADAS: Los resultados ya han sido revelados en el stream.
        </div>
      )}

      <div className={`max-w-6xl mx-auto ${isVotingPaused ? 'mt-12' : ''}`}>
        <Header />

        <StatsPanel
          totalVotes={totalVotes}
          totalCandidates={candidates.length}
          countdown={countdown}
        />

        <DangerZone candidates={dangerCandidates} />

        <BotLeaderBoard candidates={botCandidates} />

        <div className="mb-4 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <span className="font-bold text-lg">Ranking General</span>
          </div>
          <FilterButtons
            currentFilter={currentFilter}
            onFilterChange={setCurrentFilter}
          />
        </div>

        <LeaderBoard
          candidates={filteredCandidates}
          dangerList={dangerList}
          maxVotes={maxVotes}
        />

        <div className="text-center mt-10 text-gray-400 text-sm">
          Actualizado automáticamente. <span>{lastFetchTime}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
