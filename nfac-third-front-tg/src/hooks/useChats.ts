import { useState, useEffect } from 'react';
import type { Chat, User } from '../types';

const CHATS_STORAGE_KEY = 'telegram_clone_chats';
const NEXT_AI_ID_KEY = 'telegram_clone_next_ai_id';

export const useChats = () => {
    const [chats, setChats] = useState<Chat[]>(() => {
        const stored = localStorage.getItem(CHATS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });
    const [nextAIId, setNextAIId] = useState(() => {
        const stored = localStorage.getItem(NEXT_AI_ID_KEY);
        return stored ? parseInt(stored) : 5;
    });

    useEffect(() => {
        localStorage.setItem(CHATS_STORAGE_KEY, JSON.stringify(chats));
    }, [chats]);

    useEffect(() => {
        localStorage.setItem(NEXT_AI_ID_KEY, (nextAIId).toString());
    }, [nextAIId]);

    const createNewAIChat = (name: string = "New AI Assistant - " + (nextAIId - 4)) => {
        const newUser: User = {
            id: nextAIId.toString(),
            name,
            avatar: '🤖',
            type: 'ai',
            isOnline: true
        };

        const newChat: Chat = {
            id: newUser.id,
            user: newUser,
            messages: []
        };

        setChats(prev => [...prev, newChat]);
        setNextAIId(prev => prev + 1);
        return newChat;
    };
    return {
        chats,
        createNewAIChat,
    };
};
