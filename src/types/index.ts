export interface Candidate {
    name: string;
    votes: number;
    percentage?: string;
    botPercentage?: string;
}

export interface VotesData {
    payload: {
        settings: {
            results: {
                visual_data: Array<Record<string, number>>;
            };
        };
    };
}

export type Gender = 'M' | 'F' | 'U';
export type FilterType = 'all' | 'M' | 'F';
