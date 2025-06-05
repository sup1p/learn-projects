import React from 'react';
import { themeClasses } from '../utils/classNames';
import { Message } from './Message';
import type { Message as MessageType } from '../types';

interface ChatListProps {
    messages: MessageType[];
    userAvatar?: string;
    isTyping?: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({ messages, userAvatar, isTyping }) => {
    if (!messages.length && !isTyping) {
        return (
            <div className={themeClasses.emptyState.container}>
                <div className={themeClasses.emptyState.content}>
                    <h3 className={themeClasses.emptyState.title}>No Messages Yet</h3>
                    <p className={themeClasses.emptyState.description}>
                        Start the conversation by sending a message
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full bg-gray-500">
            {messages.map((message) => (
                <Message
                    key={message.id}
                    message={message}
                    showAvatar={false}
                />
            ))}
            {isTyping && (
                <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                        {userAvatar || '🤖'}
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                </div>
            )}
        </div>
    );
};