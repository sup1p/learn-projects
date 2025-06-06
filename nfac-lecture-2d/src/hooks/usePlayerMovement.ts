import { useState, useEffect, useCallback, useRef } from 'react';
import type { Player, Position } from '../types';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_SIZE = 4;
const MOVE_SPEED = 3;

type Direction = 'w' | 'a' | 's' | 'd';

interface UsePlayerMovementReturn {
    position: Position;
}

export const usePlayerMovement = (
    playerId: string,
    updatePlayer: (id: string, updates: Partial<Player>) => Promise<void>
): Position => {
    const [position, setPosition] = useState<Position>({
        x: Math.floor(GAME_WIDTH / 2),
        y: Math.floor(GAME_HEIGHT / 2)
    });

    const keysPressed = useRef<Set<Direction>>(new Set());

    const movePlayer = useCallback((direction: Direction): void => {
        setPosition(prev => {
            let newX = prev.x;
            let newY = prev.y;

            switch (direction) {
                case 'w':
                    newY = Math.max(0, prev.y - MOVE_SPEED);
                    break;
                case 's':
                    newY = Math.min(GAME_HEIGHT - PLAYER_SIZE, prev.y + MOVE_SPEED);
                    break;
                case 'a':
                    newX = Math.max(0, prev.x - MOVE_SPEED);
                    break;
                case 'd':
                    newX = Math.min(GAME_WIDTH - PLAYER_SIZE, prev.x + MOVE_SPEED);
                    break;
            }

            const newPos: Position = { x: newX, y: newY };

            // Обновляем позицию в Supabase только если позиция изменилась
            if (newX !== prev.x || newY !== prev.y) {
                updatePlayer(playerId, newPos);
            }

            return newPos;
        });
    }, [playerId, updatePlayer]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent): void => {
            const key = e.key.toLowerCase() as Direction;
            if (['w', 'a', 's', 'd'].includes(key)) {
                e.preventDefault();
                keysPressed.current.add(key);
            }
        };

        const handleKeyUp = (e: KeyboardEvent): void => {
            const key = e.key.toLowerCase() as Direction;
            keysPressed.current.delete(key);
        };

        // Игровой цикл для плавного движения
        const gameLoop = setInterval(() => {
            keysPressed.current.forEach(key => {
                movePlayer(key);
            });
        }, 16); // ~60 FPS

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            clearInterval(gameLoop);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [movePlayer]);

    return position;
};