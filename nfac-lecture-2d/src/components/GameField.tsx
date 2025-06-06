import React from 'react';
import type { Player } from '../types';

const GAME_WIDTH = 1850;
const GAME_HEIGHT = 700;
const PLAYER_SIZE = 4;

interface GameFieldProps {
    players: Map<string, Player>;
    currentPlayerId: string;
}

const GameField: React.FC<GameFieldProps> = ({ players, currentPlayerId }) => {
    return (
        <div
            style={{
                width: `${GAME_WIDTH}px`,
                height: `${GAME_HEIGHT}px`,
                backgroundColor: '#1a1a2e',
                position: 'relative',
                border: '2px solid #16213e',
                borderRadius: '8px',
                overflow: 'hidden'
            }}
        >
            {/* Рендер всех игроков */}
            {Array.from(players.values()).map(player => (
                <div
                    key={player.id}
                    style={{
                        position: 'absolute',
                        left: `${player.x}px`,
                        top: `${player.y}px`,
                        width: `${PLAYER_SIZE}px`,
                        height: `${PLAYER_SIZE}px`,
                        backgroundColor: player.color,
                        borderRadius: '1px',
                        boxShadow: player.id === currentPlayerId
                            ? '0 0 8px rgba(255,255,255,0.8)'
                            : 'none',
                        transition: 'box-shadow 0.2s ease',
                        zIndex: player.id === currentPlayerId ? 10 : 1
                    }}
                    title={`${player.name} ${player.id === currentPlayerId ? '(You)' : ''}`}
                />
            ))}

            {/* Инструкции по управлению */}
            <div style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                color: '#ffffff',
                fontSize: '14px',
                fontFamily: 'monospace',
                opacity: 0.7,
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '5px 8px',
                borderRadius: '4px'
            }}>
                WASD to move
            </div>

            {/* Счетчик игроков */}
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                color: '#ffffff',
                fontSize: '14px',
                fontFamily: 'monospace',
                opacity: 0.7,
                backgroundColor: 'rgba(0,0,0,0.5)',
                padding: '5px 8px',
                borderRadius: '4px'
            }}>
                Online: {players.size}
            </div>
        </div>
    );
};

export default GameField;
