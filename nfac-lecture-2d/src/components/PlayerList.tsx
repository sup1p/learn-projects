import React from 'react';
import type { Player } from '../types';

interface PlayerListProps {
    players: Map<string, Player>;
    currentPlayerId: string;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, currentPlayerId }) => {
    return (
        <div style={{
            backgroundColor: '#1a1a2e',
            border: '2px solid #16213e',
            borderRadius: '8px',
            padding: '15px',
            minWidth: '200px',
            maxHeight: '400px',
            overflowY: 'auto'
        }}>
            <h3 style={{
                color: '#ffffff',
                fontSize: '16px',
                marginTop: 0,
                marginBottom: '15px',
                textAlign: 'center'
            }}>
                Players ({players.size})
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Array.from(players.values()).map(player => (
                    <div
                        key={player.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px',
                            backgroundColor: player.id === currentPlayerId
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(255,255,255,0.05)',
                            borderRadius: '4px',
                            border: player.id === currentPlayerId
                                ? '1px solid rgba(255,255,255,0.3)'
                                : '1px solid transparent'
                        }}
                    >
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: player.color,
                                borderRadius: '2px',
                                flexShrink: 0
                            }}
                        />
                        <div style={{ flex: 1 }}>
                            <div style={{
                                color: '#ffffff',
                                fontSize: '14px',
                                fontWeight: player.id === currentPlayerId ? 'bold' : 'normal'
                            }}>
                                {player.name}
                                {player.id === currentPlayerId && ' (You)'}
                            </div>
                            <div style={{
                                color: '#888',
                                fontSize: '12px'
                            }}>
                                {player.x}, {player.y}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayerList;