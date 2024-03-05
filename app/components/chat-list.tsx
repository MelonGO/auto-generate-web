import { type Message } from 'ai'

import { ChatMessage } from '@/app/components/chat-message'

export interface ChatList {
    messages: Message[]
}

export function ChatList({ messages }: ChatList) {
    if (!messages.length) {
        return null
    }

    return (
        <div className="relative mx-auto max-w-3xl px-4 m-12">
            {messages.map((message, index) => (
                <div key={index}>
                    <ChatMessage message={message} />
                    {(index % 2 === 0) && (
                        <div className="divider my-4 md:my-8" />
                    )}
                </div>
            ))}
        </div>
    )
}
