// src/utils/classNames.ts
import clsx from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Main utility function - combines clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Telegram-inspired theme classes
export const themeClasses = {
    // Layout
    layout: {
        main: "flex h-screen bg-gray-50 dark:bg-gray-900",
        sidebar: "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-80 flex flex-col",
        chatArea: "flex-1 flex flex-col bg-white dark:bg-gray-900",
        content: "flex-1 overflow-hidden",
    },

    // Chat Header
    chatHeader: {
        container: "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3",
        avatar: "w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center",
        userInfo: "flex-1",
        userName: "font-medium text-gray-900 dark:text-white",
        userStatus: "text-sm text-gray-500 dark:text-gray-400",
        onlineIndicator: "w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800",
    },

    // Sidebar
    sidebar: {
        header: "p-4 border-b border-gray-200 dark:border-gray-700",
        title: "text-xl font-semibold text-gray-900 dark:text-white",
        searchBar: "w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
        chatList: "flex-1 overflow-y-auto",
    },

    // Chat List Items
    chatItem: {
        container: "flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 transition-colors",
        active: "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500",
        avatar: "w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0",
        content: "flex-1 min-w-0",
        header: "flex items-center justify-between mb-1",
        name: "font-medium text-gray-900 dark:text-white truncate",
        time: "text-xs text-gray-500 dark:text-gray-400 flex-shrink-0",
        lastMessage: "text-sm text-gray-600 dark:text-gray-300 truncate",
        unreadBadge: "bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0",
    },

    // Messages
    message: {
        container: "flex gap-2 mb-4",
        incoming: "justify-start",
        outgoing: "justify-end",
        avatar: "w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0",
        bubble: {
            base: "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative",
            incoming: "bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md shadow-sm",
            outgoing: "bg-blue-200 text-black rounded-br-md",
        },
        content: "break-words",
        time: "text-xs opacity-70 mt-1",
        status: "text-xs opacity-70 mt-1 flex items-center gap-1",
    },

    // Message Input
    messageInput: {
        container: "bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3",
        form: "flex items-end gap-2",
        textareaWrapper: "flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2",
        textarea: "w-full bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 max-h-32",
        sendButton: {
            base: "bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors flex items-center justify-center",
            disabled: "bg-gray-300 dark:bg-gray-600 cursor-not-allowed",
        },
    },

    // Typing Indicator
    typingIndicator: {
        container: "flex items-center gap-2 px-4 py-2 text-gray-500 dark:text-gray-400",
        dots: "flex gap-1",
        dot: "w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse",
    },

    // Empty States
    emptyState: {
        container: "flex-1 flex items-center justify-center",
        content: "text-center text-gray-500 dark:text-gray-400",
        icon: "w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600",
        title: "text-lg font-medium mb-2",
        description: "text-sm",
    },

    // Buttons
    button: {
        primary: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors",
        secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-4 py-2 rounded-lg transition-colors",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors",
    },

    // AI Specific
    ai: {
        badge: "bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full",
        avatar: "bg-gradient-to-r from-purple-500 to-blue-500 text-white",
    },

    // Mobile Responsive
    mobile: {
        sidebarOverlay: "lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40",
        sidebarMobile: "lg:hidden fixed left-0 top-0 h-full w-80 bg-white dark:bg-gray-800 z-50 transform transition-transform",
        chatAreaMobile: "lg:flex-1",
    },

    // Utility Classes
    utils: {
        scrollbar: "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800",
        truncate: "truncate",
        srOnly: "sr-only",
    },
};

// Conditional class helpers
export const conditionalClasses = {
    // Message status
    messageStatus: (status: 'sent' | 'delivered' | 'read') => cn(
        "text-xs opacity-70 mt-1",
        {
            'text-gray-400': status === 'sent',
            'text-blue-400': status === 'delivered',
            'text-blue-500': status === 'read',
        }
    ),

    // Online status
    onlineStatus: (isOnline: boolean) => cn(
        "w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
        {
            'bg-green-500': isOnline,
            'bg-gray-400': !isOnline,
        }
    ),

    // Chat item (active/inactive)
    chatItemState: (isActive: boolean, hasUnread: boolean) => cn(
        themeClasses.chatItem.container,
        {
            [themeClasses.chatItem.active]: isActive,
            'font-semibold': hasUnread,
        }
    ),

    // User type (human/ai)
    userType: (type: 'human' | 'ai') => cn(
        themeClasses.chatItem.avatar,
        {
            [themeClasses.ai.avatar]: type === 'ai',
        }
    ),

    // Message bubble
    messageBubble: (isOutgoing: boolean) => cn(
        themeClasses.message.bubble.base,
        {
            [themeClasses.message.bubble.outgoing]: isOutgoing,
            [themeClasses.message.bubble.incoming]: !isOutgoing,
        }
    ),
};

// Common animation variants
export const animations = {
    fadeIn: "animate-in fade-in duration-200",
    slideIn: "animate-in slide-in-from-bottom duration-300",
    slideOut: "animate-out slide-out-to-bottom duration-200",
    scaleIn: "animate-in zoom-in duration-200",
    typing: "animate-pulse",
};

// Dark mode utilities
export const darkMode = {
    toggle: "dark:hidden", // Hide in dark mode
    showInDark: "hidden dark:block", // Show only in dark mode
    text: "text-gray-900 dark:text-white",
    textSecondary: "text-gray-600 dark:text-gray-300",
    bg: "bg-white dark:bg-gray-900",
    bgSecondary: "bg-gray-50 dark:bg-gray-800",
    border: "border-gray-200 dark:border-gray-700",
};