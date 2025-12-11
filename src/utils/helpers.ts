import { GENDER_MAP, AVATAR_MAP } from './constants';
import type { Candidate, Gender } from '../types';

// Display name mapping - maps API names to user-facing display names
const DISPLAY_NAME_MAP: Record<string, string> = {
    'Soley': 'Sopley',
    'Juanda': 'Frozono',
    'El Agropecuario': 'Mi Lidel 🐎',
};

export const getDisplayName = (name: string): string => DISPLAY_NAME_MAP[name] || name;

export const getGender = (name: string): Gender => GENDER_MAP[name] || 'U';
export const getAvatar = (name: string): string =>
    AVATAR_MAP[name] || 'https://via.placeholder.com/80?text=?';

export const findLowest = (candidates: Candidate[], gender: Gender): Candidate[] => {
    const filtered = candidates.filter(c => getGender(c.name) === gender);
    if (filtered.length === 0) return [];

    const minVotes = filtered[filtered.length - 1].votes;
    return filtered.filter(c => c.votes === minVotes);
};

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
    });
};
