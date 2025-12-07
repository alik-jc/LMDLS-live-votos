import type { Candidate } from '../types';

// Mock data for social media handles and live status
// In a real app, this could come from a separate API or a static config file
const SOCIAL_DATA: Record<string, { instagram?: string; tiktok?: string; twitch?: string; kick?: string; of?: string }> = {
    "Ismael Sanchez": { instagram: "ismael_sanchez18", kick: "ismaelsanchez18" },
    "El Agropecuario": { instagram: "elreydelosagropecuarios_", tiktok: "juandavidtejadaoficial" },
    "May Osorio": { instagram: "may_osorio25", tiktok: "may_osorio21" },
    "El Domi": { instagram: "xeldomi_", kick: "eldomi" },
    "Andyyuz": { instagram: "andyyuz", tiktok: "andyyuz" },
    "Juanda": { instagram: "juand4aaa", tiktok: "juand4aaa", kick: "juand4aaa" },
    "Emikukis": { instagram: "emikukiss", kick: "emikukis" },
    "SoyFrezo": { instagram: "soyfrezo", kick: "soyfrezo" },
    "Alejandra Buitrago": { instagram: "alejandrabuitragoarias", of: "alejandrab01" },
    "KingLuiz": { instagram: "kingluiz", tiktok: "kingluiz" },
    "El Cone": { instagram: "el_c0ne", tiktok: "clips.elc0ne2", kick: "elc0ne" },
    "Soley": { instagram: "soley", tiktok: "soleyoficial" },
    "Pesque": { instagram: "xpesque", tiktok: "xpesque", kick: "pesque" },
    "Edits De Mierda": { instagram: "soyedits_oficial", kick: "editsdemrd" },
    "La Piquiña": { instagram: "lapiquina_", kick: "lapiquina" },
    "Ness": { instagram: "ness.zv", tiktok: "justnesszv" },
    "Natalia Es Mejor": { instagram: "nataliaeslamejorl", tiktok: "nataliaeslamejorl" },
    "Andyysuz": { instagram: "andyys_suz", tiktok: "angiesuzlives" },
    "Karen Orozco": { instagram: "karen_orozco_05" },
    "Cami Pulgarin": { instagram: "camipulgarin" },
    "Male": { instagram: "soymale.gonzalez", kick: "soymalegonzalez" },
    // Add more mappings as needed
};

// Mock function to simulate checking live status
// In reality, this would need backend integration with TikTok/Twitch/Kick APIs
const checkLiveStatus = (handle: string): boolean => {
    // Randomly simulate live status for demo purposes
    // Returns true for ~20% of calls if handle exists
    return !!handle && Math.random() > 0.8;
};

export const enrichCandidateData = (candidate: Candidate): Candidate => {
    const socials = SOCIAL_DATA[candidate.name] || {};

    // Simulate live status detection
    let isLive = false;
    let livePlatform: Candidate['livePlatform'] = undefined;

    if (socials.kick && checkLiveStatus(socials.kick)) {
        isLive = true;
        livePlatform = 'kick';
    } else if (socials.tiktok && checkLiveStatus(socials.tiktok)) {
        isLive = true;
        livePlatform = 'tiktok';
    } else if (socials.instagram && checkLiveStatus(socials.instagram)) {
        isLive = true;
        livePlatform = 'instagram';
    }

    return {
        ...candidate,
        socials,
        isLive,
        livePlatform
    };
};
