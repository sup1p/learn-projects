// src/components/Sidebar.tsx
import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Bot } from 'lucide-react';
import { cn, themeClasses, conditionalClasses } from '../utils/classNames';
import { mockUsers } from '../data/mockUsers';
import { useChats } from '../hooks/useChats';

import { useNavigate } from 'react-router-dom';

export const Sidebar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { chatId } = useParams();
    const { chats, createNewAIChat } = useChats();

    const allUsers = useMemo(() => {
        const aiUsers = chats
            .filter(chat => chat.user.type === 'ai')
            .map(chat => chat.user);

        const existingUserIds = new Set(mockUsers.map(user => user.id));
        const uniqueAiUsers = aiUsers.filter(user => !existingUserIds.has(user.id));

        return [...uniqueAiUsers, ...mockUsers];
    }, [chats]);

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getChatForUser = (userId: string) => {
        return chats.find(chat => chat.id === userId);
    };

    const handleCreateNewChat = () => {
        const newChat = createNewAIChat();
        navigate(`/chat/${newChat.id}`);
    };

    return (
        <div className={themeClasses.layout.sidebar}>
            {/* Header */}
            <div className={themeClasses.sidebar.header}>
                <div className="flex items-center gap-3">
                    <h1 className={themeClasses.sidebar.title}>Telegram Clone</h1>
                    <button onClick={handleCreateNewChat} className="w-8 h-8 rounded-full bg-blue-300 hover:bg-blue-100 text-black flex items-center justify-center text-xl">+</button>
                </div>
                <div className="mt-3 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={cn(themeClasses.sidebar.searchBar, "pl-10")}
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className={themeClasses.sidebar.chatList}>
                {filteredUsers.map((user) => {
                    const chat = getChatForUser(user.id);
                    const isActive = chatId === user.id;

                    return (
                        <Link
                            key={user.id}
                            to={`/chat/${user.id}`}
                            className={conditionalClasses.chatItemState(isActive, false)}
                        >
                            <div className={conditionalClasses.userType(user.type)}>
                                {user.avatar?.startsWith('http') ? (
                                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <span className="text-xl">{user.avatar || '👤'}</span>
                                )}
                                {user.type === 'human' && user.isOnline && (
                                    <div className={cn(conditionalClasses.onlineStatus(true), "absolute -bottom-1 -right-1")} />
                                )}
                            </div>

                            <div className={themeClasses.chatItem.content}>
                                <div className={themeClasses.chatItem.header}>
                                    <span className={themeClasses.chatItem.name}>
                                        {user.name}
                                        {user.type === 'ai' && (
                                            <Bot className="inline w-4 h-4 ml-1 text-purple-500" />
                                        )}
                                    </span>
                                    {chat?.lastMessage && (
                                        <span className={themeClasses.chatItem.time}>
                                            {new Date(chat.lastMessage.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className={themeClasses.chatItem.lastMessage}>
                                        {chat?.lastMessage?.content || 'Start a conversation...'}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};