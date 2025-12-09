import type { Candidate } from '../types';

/**
 * Datos estáticos de La Mansión de los Streamers
 * Universidad de Streaming - 7 días de contenido
 */

// Lista completa de los 22 participantes originales
export const ALL_PARTICIPANTS: Candidate[] = [
    // Finalistas activos
    { name: "Juanda", votes: 0, gender: 'M' },
    { name: "Malee", votes: 0, gender: 'F' },
    { name: "SoyFrezo", votes: 0, gender: 'M' },
    { name: "ElDomi", votes: 0, gender: 'M' },
    { name: "ElCone", votes: 0, gender: 'M' },
    { name: "Pesque", votes: 0, gender: 'M' },
    { name: "Ness", votes: 0, gender: 'F' },
    { name: "Emikukis", votes: 0, gender: 'M' },
    { name: "Andyyuz", votes: 0, gender: 'F' },
    { name: "La Piquiña", votes: 0, gender: 'F' },
    // Eliminados
    { name: "May Osorio", votes: 0, gender: 'F', eliminated: true },
    { name: "Ismael Sanchez", votes: 0, gender: 'M', eliminated: true },
    { name: "El Agropecuario", votes: 0, gender: 'M', eliminated: true },
    { name: "Soley", votes: 0, gender: 'F', eliminated: true },
    { name: "KingLuiz", votes: 0, gender: 'M', eliminated: true },
    { name: "Cami Pulgarin", votes: 0, gender: 'F', eliminated: true },
    { name: "Natalia Es Mejor", votes: 0, gender: 'F', eliminated: true },
    { name: "Andyysuz", votes: 0, gender: 'F', eliminated: true },
    { name: "Edits De Mierda", votes: 0, gender: 'M', eliminated: true },
    { name: "Vita Celestine", votes: 0, gender: 'F', eliminated: true },
    { name: "Karen Orozco", votes: 0, gender: 'F', eliminated: true },
    { name: "Alejandra Buitrago", votes: 0, gender: 'F', eliminated: true },
];

// Datos de los participantes finales con votos de ejemplo
export const FALLBACK_CANDIDATES: Candidate[] = [
    { name: "ElDomi", votes: 892451, percentage: "18.2", botPercentage: "0", gender: 'M' },
    { name: "Juanda", votes: 756234, percentage: "15.4", botPercentage: "0", gender: 'M' },
    { name: "SoyFrezo", votes: 623891, percentage: "12.7", botPercentage: "0", gender: 'M' },
    { name: "Emikukis", votes: 589432, percentage: "12.0", botPercentage: "0", gender: 'M' },
    { name: "ElCone", votes: 478923, percentage: "9.8", botPercentage: "0", gender: 'M' },
    { name: "Andyyuz", votes: 445678, percentage: "9.1", botPercentage: "0", gender: 'F' },
    { name: "Pesque", votes: 398234, percentage: "8.1", botPercentage: "0", gender: 'M' },
    { name: "Malee", votes: 345678, percentage: "7.0", botPercentage: "0", gender: 'F' },
    { name: "La Piquiña", votes: 234567, percentage: "4.8", botPercentage: "0", gender: 'F' },
    { name: "Ness", votes: 145678, percentage: "2.9", botPercentage: "0", gender: 'F' },
];

// Información del evento
export const EVENT_INFO = {
    name: "La Mansión de los Streamers",
    subtitle: "Universidad de Streaming",
    creator: "Westcol",
    platform: {
        name: "Kick",
        channel: "westcol",
        url: "https://kick.com/westcol"
    },
    description: "La primera Universidad de Streaming en Latinoamérica. 22 creadores de contenido convivieron durante 7 días en La Mansión, aprendiendo, compitiendo y enfrentando eliminaciones decididas por el público.",
    streamInfo: "Streams diarios de hasta 10 horas",
    duration: "7 días",
    totalDays: 7,
    totalParticipants: 22,
    finalists: 10
};

// Posibles campeones (top por género)
export const getPossibleChampions = (candidates: Candidate[]) => {
    const males = candidates.filter(c => c.gender === 'M' || !c.gender);
    const females = candidates.filter(c => c.gender === 'F');

    return {
        male: males.slice(0, 3), // Top 3 hombres
        female: females.slice(0, 3) // Top 3 mujeres
    };
};
