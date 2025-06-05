import { useState } from 'react'
import type { Message } from '../types'
import { generateGeminiResponse } from '../services/gemini'

export const useAI = (chatId: string) => {
    const [isTyping, setIsTyping] = useState(false)

    const generateAIResponse = async (userMessage: string): Promise<Message> => {
        setIsTyping(true)
        try {
            const response = await generateGeminiResponse(userMessage)

            return {
                id: `ai-${Date.now()}`,
                chatId,
                content: response,
                sender: 'other',
                createdAt: new Date().toISOString(),
                isRead: true
            }
        } finally {
            setIsTyping(false)
        }
    }

    return {
        isTyping,
        generateAIResponse
    }
}
