import React from 'react';
import { MoreVertical } from 'lucide-react';
import { cn, themeClasses, conditionalClasses } from '../utils/classNames';
import type { User } from '../types';

interface ChatHeaderProps {
    user: User;
    onBack?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ user }) => {
    return (
        <div className={themeClasses.chatHeader.container}>

            <div className={conditionalClasses.userType(user.type)}>
                {user.avatar?.startsWith('http') ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                    <span className="text-lg">{user.avatar || '👤'}</span>
                )}
                {user.type === 'human' && user.isOnline && (
                    <div className={cn(conditionalClasses.onlineStatus(true), "absolute -bottom-0.5 -right-0.5")} />
                )}
            </div>

            <div className={themeClasses.chatHeader.userInfo}>
                <div className={themeClasses.chatHeader.userName}>{user.name}</div>
                <div className={themeClasses.chatHeader.userStatus}>
                    {user.type === 'ai' ? 'AI Assistant' : user.isOnline ? 'Online' : 'Last seen recently'}
                </div>
            </div>

            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <MoreVertical className="w-5 h-5" />
            </button>
        </div>
    );
};