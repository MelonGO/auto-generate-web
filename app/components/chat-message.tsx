// Inspired by Chatbot-UI and modified to fit the needs of this project
// @see https://github.com/mckaywrigley/chatbot-ui/blob/main/components/Chat/ChatMessage.tsx

import clsx from 'clsx'
import { Message } from 'ai'

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '@/app/components/codeblock'
import { MemoizedReactMarkdown } from '@/app/components/markdown'

export interface ChatMessageProps {
    message: Message
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
    return (
        <div
            className='group relative mb-4 flex items-start md:-ml-12'
            {...props}
        >
            <div>
                {message.role === 'user' ? 'Prompt' : 'Content'}
            </div>
            <div
                className={clsx(
                    'flex-1 px-1 ml-4 space-y-2 overflow-hidden',
                    message.role === 'assistant' ? 'mb-16' : ''
                )}
            >
                <MemoizedReactMarkdown
                    className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                    remarkPlugins={[remarkGfm, remarkMath]}
                    components={{
                        p({ children }) {
                            return <p className="mb-2 last:mb-0">{children}</p>
                        },
                        code({ node, inline, className, children, ...props }) {
                            if (children.length) {
                                if (children[0] == '▍') {
                                    return (
                                        <span className="mt-1 cursor-default animate-pulse">▍</span>
                                    )
                                }

                                children[0] = (children[0] as string).replace('`▍`', '▍')
                            }

                            const match = /language-(\w+)/.exec(className || '')

                            if (inline) {
                                return (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                )
                            }

                            return (
                                <CodeBlock
                                    key={Math.random()}
                                    language={(match && match[1]) || ''}
                                    value={String(children).replace(/\n$/, '')}
                                    {...props}
                                />
                            )
                        }
                    }}
                >
                    {message.content}
                </MemoizedReactMarkdown>
            </div>
        </div>
    )
}
