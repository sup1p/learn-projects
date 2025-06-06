export interface Player {
    id: string;
    x: number;
    y: number;
    color: string;
    name: string;
    created_at?: string;
}

export interface Position {
    x: number;
    y: number;
}

export interface GameConfig {
    width: number;
    height: number;
    playerSize: number;
    moveSpeed: number;
}

export type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

export interface RealtimePayload {
    eventType: RealtimeEvent;
    new: Player;
    old?: Player;
}