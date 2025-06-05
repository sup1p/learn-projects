import type { Message } from '../types'
import { generateGeminiResponse } from '../services/gemini'

import { useMutation } from '@tanstack/react-query';

export const useAI = (chatId: string) => {
    const aiMutation = useMutation({
        mutationFn: async (userMessage: string): Promise<Message> => {
            const response = await generateGeminiResponse(userMessage);
            return {
                id: `ai-${Date.now()}`,
                chatId,
                content: response,
                sender: 'other',
                createdAt: new Date().toISOString(),
                isRead: true,
            };
        },
    });

    return {
        isTyping: aiMutation.isPending,
        generateAIResponse: aiMutation.mutateAsync, // async function(userMessage) => Message
        status: aiMutation.status, // idle | pending | success | error
        data: aiMutation.data,
        error: aiMutation.error,
    };
};