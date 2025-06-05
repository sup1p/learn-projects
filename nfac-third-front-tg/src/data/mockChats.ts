import type { Chat } from '../types';
import { mockUsers } from './mockUsers';
import { mockMessages } from './mockMessages.ts';

export const mockChats: Chat[] = [
    {
        id: '1',
        user: mockUsers[0],
        messages: mockMessages.slice(0, 4),
        lastMessage: mockMessages[3]
    },
    {
        id: '2',
        user: mockUsers[1],
        messages: mockMessages.slice(4, 8),
        lastMessage: mockMessages[7]
    }
]