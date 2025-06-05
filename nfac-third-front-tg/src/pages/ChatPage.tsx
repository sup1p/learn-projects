import { ChatHeader } from "../components/ChatHeader"
import { mockUsers } from "../data/mockUsers"
import { useParams } from "react-router-dom"
import { ChatList } from "../components/ChatList"
import { MessageInput } from "../components/MessageInput"
import type { Message } from "../types"
import { useEffect, useState } from "react"
import { mockMessages } from "../data/mockMessages"
import { useAI } from "../hooks/useAI"
import { useChats } from "../hooks/useChats"

export const ChatPage = () => {
    const { chatId } = useParams()
    const { chats } = useChats()
    const currentUser = mockUsers.find(user => user.id === chatId) || chats.find(chat => chat.id === chatId)?.user
    const { isTyping, generateAIResponse } = useAI(chatId || '0')

    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const chatMessages = mockMessages.filter(message => message.chatId === chatId)
        const storedMessages = JSON.parse(localStorage.getItem(`chat_messages_${chatId}`) || '[]') as Message[]
        setMessages([...chatMessages, ...storedMessages])
    }, [chatId])

    const handleSendMessage = async (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            chatId: chatId?.toString() || '',
            content,
            sender: 'user',
            createdAt: new Date().toISOString(),
            isRead: false
        }

        // Add user message
        setMessages(prev => {
            const mockMsgs = mockMessages.filter(message => message.chatId === chatId)
            const userMsgs = prev.filter(message => !mockMessages.some(mock => mock.id === message.id))
            const newMsgs = [...userMsgs, newMessage]
            localStorage.setItem(`chat_messages_${chatId}`, JSON.stringify(newMsgs))
            return [...mockMsgs, ...newMsgs]
        })

        // If this is an AI chat, generate and add AI response
        if (currentUser?.type === 'ai') {
            try {
                const aiResponse = await generateAIResponse(content)
                setMessages(prev => {
                    const mockMsgs = mockMessages.filter(message => message.chatId === chatId)
                    const userMsgs = prev.filter(message => !mockMessages.some(mock => mock.id === message.id))
                    const newMsgs = [...userMsgs, aiResponse]
                    localStorage.setItem(`chat_messages_${chatId}`, JSON.stringify(newMsgs))
                    return [...mockMsgs, ...newMsgs]
                })
            } catch (error) {
                console.error('Failed to get AI response:', error)
            }
        }
    }

    return (
        <div className="flex flex-col h-screen">
            {currentUser && <ChatHeader user={currentUser} />}
            <div className="flex-1 overflow-hidden">
                <ChatList
                    messages={messages}
                    userAvatar={currentUser?.avatar}
                    isTyping={isTyping && currentUser?.type === 'ai'}
                />
            </div>
            <MessageInput
                onSendMessage={handleSendMessage}
                disabled={isTyping}
                placeholder={currentUser?.type === 'ai' ? "Ask me anything..." : "Type a message..."}
            />
        </div>
    )
}