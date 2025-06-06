import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabase';
import type { Player, RealtimePayload } from '../types';

interface UseRealtimePlayersReturn {
    players: Map<string, Player>;
    addPlayer: (player: Player) => Promise<void>;
    updatePlayer: (id: string, updates: Partial<Player>) => Promise<void>;
    removePlayer: (id: string) => Promise<void>;
}

export const useRealtimePlayers = (currentPlayerId: string): UseRealtimePlayersReturn => {
    const [players, setPlayers] = useState<Map<string, Player>>(new Map());

    useEffect(() => {
        // Загружаем существующих игроков
        const loadPlayers = async (): Promise<void> => {
            const { data } = await supabase.from('players').select();
            if (data) {
                const playersMap = new Map<string, Player>();
                data.forEach(player => playersMap.set(player.id, player));
                setPlayers(playersMap);
            }
        };

        loadPlayers();

        // Подписываемся на изменения
        const channel = supabase.channel('players');

        channel
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'players' },
                (payload: RealtimePayload) => {
                    const { eventType, new: newPlayer, old: oldPlayer } = payload;

                    setPlayers(prev => {
                        const newPlayers = new Map(prev);

                        switch (eventType) {
                            case 'INSERT':
                            case 'UPDATE':
                                newPlayers.set(newPlayer.id, newPlayer);
                                break;
                            case 'DELETE':
                                newPlayers.delete(oldPlayer?.id || newPlayer?.id);
                                break;
                        }

                        return newPlayers;
                    });
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, []);

    const addPlayer = useCallback(async (player: Player): Promise<void> => {
        await supabase.from('players').insert(player);
    }, []);

    const updatePlayer = useCallback(async (id: string, updates: Partial<Player>): Promise<void> => {
        await supabase.from('players').update({ id, ...updates });
    }, []);

    const removePlayer = useCallback(async (id: string): Promise<void> => {
        await supabase.from('players').delete().eq('id', id);
    }, []);

    return { players, addPlayer, updatePlayer, removePlayer };
};