import React, { useState, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { cn, themeClasses } from '../utils/classNames';

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
    onSendMessage,
    disabled = false,
    placeholder = "Type a message..."
}) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);

        // Auto-resize textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className={themeClasses.messageInput.container}>
            <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className={themeClasses.messageInput.form}
            >
                <div className={themeClasses.messageInput.textareaWrapper}>
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={handleTextareaChange}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        disabled={disabled}
                        rows={1}
                        className={themeClasses.messageInput.textarea}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className={cn(
                        themeClasses.messageInput.sendButton.base,
                        (!message.trim() || disabled) && themeClasses.messageInput.sendButton.disabled
                    )}
                >
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
};