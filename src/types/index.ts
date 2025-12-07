export interface Candidate {
    name: string;
    votes: number;
    percentage?: string;
    botPercentage?: string;
    socials?: {
        instagram?: string;
        tiktok?: string;
        twitch?: string;
        kick?: string;
        of?: string;
    };
    isLive?: boolean;
    livePlatform?: 'tiktok' | 'twitch' | 'kick' | 'instagram';
}

export interface VotesData {
    payload: {
        candidates?: Array<{
            id: number;
            name: string;
            [key: string]: unknown;
        }>;
        settings: {
            results: {
                visual_data: Array<Record<string, number>>;
            };
        };
    };
}

export type Gender = 'M' | 'F' | 'U';
export type FilterType = 'all' | 'M' | 'F';
