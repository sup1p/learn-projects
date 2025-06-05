export interface User {
    id: string;
    name: string;
    avatar?: string;
    type: 'human' | 'ai';
    isOnline?: boolean;
}

export interface Message {
    id: string;
    chatId: string;
    content: string;
    sender: 'user' | 'other';
    createdAt: string;
    isRead: boolean;
}

export interface Chat {
    id: string;
    user: User;
    messages: Message[];
    lastMessage?: Message;
}