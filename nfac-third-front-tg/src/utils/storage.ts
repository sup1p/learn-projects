import type { Chat, Message } from '../types';

const CHATS_KEY = 'telegram-clone-chats';

export const storage = {
    // Get all chats from localStorage
    getChats: (): Chat[] => {
        const stored = localStorage.getItem(CHATS_KEY);
        return stored ? JSON.parse(stored) : [];
    },

    // Save all chats to localStorage
    saveChats: (chats: Chat[]): void => {
        localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
    },

    // Add message to specific chat
    addMessage: (chatId: string, message: Message): void => {
        const chats = storage.getChats();
        const chatIndex = chats.findIndex(chat => chat.id === chatId);

        if (chatIndex >= 0) {
            chats[chatIndex].messages.push(message);
            chats[chatIndex].lastMessage = message;
        } else {
            // Create new chat if doesn't exist
            const newChat: Chat = {
                id: chatId,
                user: { id: chatId, name: 'New Chat', type: 'human' },
                messages: [message],
                lastMessage: message,
            };
            chats.push(newChat);
        }

        storage.saveChats(chats);
    },

    // Get messages for specific chat
    getChatMessages: (chatId: string): Message[] => {
        const chats = storage.getChats();
        const chat = chats.find(chat => chat.id === chatId);
        return chat ? chat.messages : [];
    }
};