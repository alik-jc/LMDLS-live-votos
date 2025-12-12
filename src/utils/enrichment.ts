import type { Candidate } from '../types';
import { SOCIAL_MAP } from './constants';

export const enrichCandidateData = (candidate: Candidate): Candidate => {
    // Get social media data from constants
    const socialMedia = SOCIAL_MAP[candidate.name] || [];

    // Convert to the expected format
    const socials: Record<string, string> = {};
    socialMedia.forEach(s => {
        // Extract username from URL
        const match = s.url.match(/([^\/]+)\/?$/);
        if (match) {
            socials[s.platform] = match[1];
        }
    });

    // Live status disabled since the website won't be updated regularly
    const isLive = false;
    const livePlatform: Candidate['livePlatform'] = undefined;

    return {
        ...candidate,
        socials,
        isLive,
        livePlatform
    };
};
