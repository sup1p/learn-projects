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

    // 1. Load messages from mock and localStorage
    useEffect(() => {
        const chatMessages = mockMessages.filter(message => message.chatId === chatId)
        const storedMessages = JSON.parse(localStorage.getItem(`chat_messages_${chatId}`) || '[]') as Message[]
        setMessages([...chatMessages, ...storedMessages])
    }, [chatId])

    const persistUserMessages = (userMessages: Message[]) => {
        localStorage.setItem(`chat_messages_${chatId}`, JSON.stringify(userMessages))
    }

    const handleSendMessage = async (content: string) => {
        const newMessage: Message = {
            id: Date.now().toString(),
            chatId: chatId?.toString() || '',
            content,
            sender: 'user',
            createdAt: new Date().toISOString(),
            isRead: false
        }

        // Step 1: Update state and persist user message
        setMessages(prev => {
            const mockMsgs = mockMessages.filter(message => message.chatId === chatId)
            const userMsgs = [...prev.filter(m => !mockMessages.some(mm => mm.id === m.id)), newMessage]
            persistUserMessages(userMsgs)
            return [...mockMsgs, ...userMsgs]
        })

        // Step 2: Generate AI message if chat is with AI
        if (currentUser?.type === 'ai') {
            try {
                const aiMessage = await generateAIResponse(content)
                setMessages(prev => {
                    const mockMsgs = mockMessages.filter(message => message.chatId === chatId)
                    const userMsgs = [...prev.filter(m => !mockMessages.some(mm => mm.id === m.id)), aiMessage]
                    persistUserMessages(userMsgs)
                    return [...mockMsgs, ...userMsgs]
                })
            } catch (error) {
                console.error('AI response failed', error)
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
