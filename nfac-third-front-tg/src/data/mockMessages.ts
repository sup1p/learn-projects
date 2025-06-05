import type { Message } from '../types';


export const mockMessages: Message[] = [
    {
        id: '1',
        chatId: '1',
        content: 'Hello, how are you?',
        sender: 'other',
        createdAt: "2025-06-04T12:34:56.789Z",
        isRead: false
    },
    {
        id: '2',
        chatId: '1',
        content: 'Hello, Im fine what about you',
        sender: 'user',
        createdAt: "2025-06-04T11:33:56.789Z",
        isRead: false
    },
    {
        id: '3',
        chatId: '1',
        content: 'Where are you now?',
        sender: 'other',
        createdAt: "2025-06-04T10:32:56.789Z",
        isRead: false
    },
    {
        id: '4',
        chatId: '1',
        content: 'Im in satbayev uni?',
        sender: 'user',
        createdAt: "2025-06-04T09:31:56.789Z",
        isRead: false
    },
    {
        id: '5',
        chatId: '2',
        content: 'AHAHAHAHHAHAHA',
        sender: 'user',
        createdAt: "2025-06-04T08:30:56.789Z",
        isRead: false
    },
    {
        id: '6',
        chatId: '2',
        content: 'IM AN ANANANAN',
        sender: 'other',
        createdAt: "2025-06-04T07:29:56.789Z",
        isRead: false
    },
    {
        id: '7',
        chatId: '2',
        content: 'YO',
        sender: 'other',
        createdAt: "2025-06-04T06:28:56.789Z",
        isRead: false
    },
    {
        id: '8',
        chatId: '2',
        content: 'FR',
        sender: 'other',
        createdAt: "2025-06-04T05:27:56.789Z",
        isRead: false
    },
]