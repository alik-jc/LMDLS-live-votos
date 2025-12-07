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
    const averageVotes = total / candidatesList.length;

    const withPercentage = candidatesList.map((c) => {
      let botPercentage = '0';
      if (c.votes > averageVotes) {
        botPercentage = (((c.votes - averageVotes) / c.votes) * 100).toFixed(1);
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
    try {
      const targetUrl = 'https://app.rankedvote.co/api/settings/rv/lamansiondia4';
      const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(targetUrl + '?_=' + Date.now());
      const response = await fetch(proxyUrl, { cache: 'no-store' });
      const data = await response.json();

      const now = Date.now();
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
      processData(data, now);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Timer and Fetch Logic
  useEffect(() => {
    // Check Cache Initial Load
    const cached = localStorage.getItem(CACHE_KEY);
    let initialLoadDone = false;

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        if (age < CACHE_DURATION) {
          processData(data, timestamp);
          initialLoadDone = true;
        }
      } catch (e) {
        console.error("Cache parse error", e);
      }
    }

    if (!initialLoadDone) {
      fetchData();
    }

    let lastFetchMinute = -1;
    const interval = setInterval(() => {
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
  }, []);

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
    <div className="max-w-6xl mx-auto px-5 py-8">
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
  );
}

export default App;
