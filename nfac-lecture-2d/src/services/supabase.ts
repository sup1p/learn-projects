import type { RealtimePayload } from "../types";
import type { Player, RealtimeEvent } from "../types";

interface MockSupabaseChannel {
    on: (event: string, filter: any, callback: (payload: RealtimePayload) => void) => MockSupabaseChannel;
    subscribe: () => void;
    unsubscribe: () => void;
}

interface MockSupabaseQuery {
    insert: (data: Player) => Promise<{ data: Player[] | null; error: any }>;
    update: (data: Partial<Player>) => Promise<{ data: Player[] | null; error: any }>;
    delete: () => {
        eq: (field: string, value: string) => Promise<{ data: any[]; error: any }>;
    };
    select: () => Promise<{ data: Player[] | null; error: any }>;
}

interface MockSupabase {
    players: Map<string, Player>;
    listeners: Array<{ event: string; callback: (payload: RealtimePayload) => void }>;
    from: (table: string) => MockSupabaseQuery;
    channel: (name: string) => MockSupabaseChannel;
    notifyListeners: (eventType: RealtimeEvent, data: Player) => void;
}

// Мок Supabase для демонстрации
const mockSupabase: MockSupabase = {
    players: new Map(),
    listeners: [],

    from: (table: string) => ({
        insert: async (data: Player) => {
            mockSupabase.players.set(data.id, data);
            mockSupabase.notifyListeners('INSERT', data);
            return { data: [data], error: null };
        },
        update: async (data: Partial<Player>) => {
            const existing = mockSupabase.players.get(data.id!);
            if (existing) {
                const updated = { ...existing, ...data };
                mockSupabase.players.set(data.id!, updated);
                mockSupabase.notifyListeners('UPDATE', updated);
                return { data: [updated], error: null };
            }
            return { data: null, error: 'Player not found' };
        },
        delete: () => ({
            eq: async (field: string, value: string) => {
                mockSupabase.players.delete(value);
                mockSupabase.notifyListeners('DELETE', { id: value } as Player);
                return { data: [], error: null };
            }
        }),
        select: async () => {
            return { data: Array.from(mockSupabase.players.values()), error: null };
        }
    }),

    channel: (name: string) => {
        const channel: MockSupabaseChannel = {
            on: (event: string, filter: any, callback: (payload: RealtimePayload) => void) => {
                const listener = { event, callback };
                mockSupabase.listeners.push(listener);

                // Отправляем существующих игроков при подключении
                if (event === 'postgres_changes') {
                    mockSupabase.players.forEach(player => {
                        callback({ eventType: 'INSERT', new: player });
                    });
                }

                return channel;
            },
            subscribe: () => { },
            unsubscribe: () => {
                mockSupabase.listeners = [];
            }
        };
        return channel;
    },

    notifyListeners: (eventType: RealtimeEvent, data: Player) => {
        mockSupabase.listeners.forEach(listener => {
            if (listener.event === 'postgres_changes') {
                listener.callback({ eventType, new: data, old: data });
            }
        });
    }
};

export { mockSupabase as supabase };