import type { Candidate } from '../types';

/**
 * Datos estáticos de ejemplo para La Mansión
 * Estos datos se usan como fallback cuando el evento ha terminado
 * y las encuestas ya no están disponibles
 */

// Datos de los participantes finales con votos de ejemplo
export const FALLBACK_CANDIDATES: Candidate[] = [
    { name: "El Domi", votes: 892451, percentage: "18.2", botPercentage: "0" },
    { name: "Juanda", votes: 756234, percentage: "15.4", botPercentage: "0" },
    { name: "SoyFrezo", votes: 623891, percentage: "12.7", botPercentage: "0" },
    { name: "Emikukis", votes: 589432, percentage: "12.0", botPercentage: "0" },
    { name: "El Cone", votes: 478923, percentage: "9.8", botPercentage: "0" },
    { name: "Andyyuz", votes: 445678, percentage: "9.1", botPercentage: "0" },
    { name: "Pesque", votes: 398234, percentage: "8.1", botPercentage: "0" },
    { name: "Male", votes: 345678, percentage: "7.0", botPercentage: "0" },
    { name: "La Piquiña", votes: 234567, percentage: "4.8", botPercentage: "0" },
    { name: "Ness", votes: 145678, percentage: "2.9", botPercentage: "0" },
];

// Tot participantes históricos del evento (para mostrar en landing)
export const ALL_PARTICIPANTS: Candidate[] = [
    { name: "El Domi", votes: 0 },
    { name: "Juanda", votes: 0 },
    { name: "SoyFrezo", votes: 0 },
    { name: "Emikukis", votes: 0 },
    { name: "El Cone", votes: 0 },
    { name: "Andyyuz", votes: 0 },
    { name: "Pesque", votes: 0 },
    { name: "Male", votes: 0 },
    { name: "La Piquiña", votes: 0 },
    { name: "Ness", votes: 0 },
    // Eliminados
    { name: "Ismael Sanchez", votes: 0 },
    { name: "El Agropecuario", votes: 0 },
    { name: "May Osorio", votes: 0 },
    { name: "Andyysuz", votes: 0 },
    { name: "KingLuiz", votes: 0 },
    { name: "Soley", votes: 0 },
    { name: "Edits De Mierda", votes: 0 },
    { name: "Natalia Es Mejor", votes: 0 },
    { name: "Karen Orozco", votes: 0 },
    { name: "Cami Pulgarin", votes: 0 },
    { name: "Alejandra Buitrago", votes: 0 },
];

// Información del evento
export const EVENT_INFO = {
    name: "La Mansión de los Streamers",
    creator: "Westcol",
    platform: {
        name: "Kick",
        channel: "westcol",
        url: "https://kick.com/westcol"
    },
    description: "El proyecto más ambicioso del streaming latinoamericano. Un experimento social donde creadores de contenido conviven 24/7 bajo el mismo techo, enfrentando desafíos, eliminaciones y la convivencia diaria.",
    duration: "7 días",
    totalDays: 7
};
