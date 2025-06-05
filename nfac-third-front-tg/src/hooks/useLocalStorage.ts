import { useState, useEffect } from 'react';
import type { Chat } from '../types';
import { storage } from '../utils/storage.ts';

export const useChats = () => {
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        setChats(storage.getChats());
    }, []);

    const addMessage = (chatId: string, content: string, sender: 'user' | 'other') => {
        const message = {
            id: Date.now().toString(),
            chatId,
            content,
            createdAt: new Date().toISOString(),
            sender,
            isRead: false,
        };

        storage.addMessage(chatId, message);
        setChats(storage.getChats());
    };

    return { chats, addMessage };
};