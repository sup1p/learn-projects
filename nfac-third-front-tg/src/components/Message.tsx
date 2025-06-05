import React from 'react';
import { Check, CheckCheck } from 'lucide-react';
import { cn, themeClasses, conditionalClasses } from '../utils/classNames';
import type { Message as MessageType } from '../types';

interface MessageProps {
    message: MessageType;
    showAvatar?: boolean;
    userAvatar?: string;
}

export const Message: React.FC<MessageProps> = ({ message, showAvatar, userAvatar }) => {
    const isOutgoing = message.sender === 'user';

    return (
        <div className={cn(
            themeClasses.message.container,
            isOutgoing ? themeClasses.message.outgoing : themeClasses.message.incoming
        )}>
            {!isOutgoing && showAvatar && (
                <div className={themeClasses.message.avatar}>
                    {userAvatar?.startsWith('http') ? (
                        <img src={userAvatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <span className="text-sm">{userAvatar || '👤'}</span>
                    )}
                </div>
            )}

            <div className={conditionalClasses.messageBubble(isOutgoing)}>
                <div className={themeClasses.message.content}>
                    {message.content}
                </div>
                <div className={cn(
                    themeClasses.message.time,
                    isOutgoing && "flex items-center justify-end gap-1"
                )}>
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                    {isOutgoing && message.isRead !== undefined && (
                        <div>
                            {message.isRead === false && <Check className="w-3 h-3" />}
                            {message.isRead === true && <CheckCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
