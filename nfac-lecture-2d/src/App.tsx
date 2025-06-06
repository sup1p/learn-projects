import React, { useState, useEffect } from 'react';
import GameField from './components/GameField';
import PlayerList from './components/PlayerList';
import LoginForm from './components/LoginForm';
import { useRealtimePlayers } from './hooks/useRealtimePlayers';
import { usePlayerMovement } from './hooks/usePlayerMovement';
import type { Player } from './types';

const generateId = (): string => 'player_' + Math.random().toString(36).substr(2, 9);

const generateColor = (): string => {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#ff9ff3', '#54a0ff'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const App: React.FC = () => {
  const [playerId] = useState<string>(() => generateId());
  const [playerColor] = useState<string>(() => generateColor());
  const [playerName, setPlayerName] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showPlayerList, setShowPlayerList] = useState<boolean>(false);

  const { players, addPlayer, updatePlayer, removePlayer } = useRealtimePlayers(playerId);
  const position = usePlayerMovement(playerId, updatePlayer);

  // Подключение игрока
  const connectPlayer = async (name: string): Promise<void> => {
    setPlayerName(name);
    const newPlayer: Player = {
      id: playerId,
      x: position.x,
      y: position.y,
      color: playerColor,
      name: name || `Player ${playerId.slice(-4)}`
    };

    await addPlayer(newPlayer);
    setIsConnected(true);
  };

  // Отключение при размонтировании
  useEffect(() => {
    const handleBeforeUnload = (): void => {
      if (isConnected) {
        removePlayer(playerId);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (isConnected) {
        removePlayer(playerId);
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [playerId, isConnected, removePlayer]);

  if (!isConnected) {
    return <LoginForm onConnect={connectPlayer} />;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0f0f23',
      padding: '20px',
      fontFamily: 'monospace'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '20px'
      }}>
        <h1 style={{ color: '#ffffff', fontSize: '24px', margin: 0 }}>
          Realtime 2D Game
        </h1>
        <button
          onClick={() => setShowPlayerList(!showPlayerList)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4ecdc4',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {showPlayerList ? 'Hide' : 'Show'} Players
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <GameField players={players} currentPlayerId={playerId} />

        {showPlayerList && (
          <PlayerList players={players} currentPlayerId={playerId} />
        )}
      </div>

      <div style={{
        marginTop: '20px',
        color: '#888',
        fontSize: '12px',
        textAlign: 'center'
      }}>
        <p>Welcome, {playerName}! • Use WASD to move • Your player glows white</p>
        <p>Open multiple tabs to test multiplayer</p>
        <p style={{ marginTop: '10px', fontSize: '11px' }}>
          В продакшене: замените mockSupabase на настоящий Supabase клиент
        </p>
      </div>
    </div>
  );
};

export default App;