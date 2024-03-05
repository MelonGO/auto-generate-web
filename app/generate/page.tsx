'use client';

import { toast } from 'react-hot-toast'
import { Section } from '@prisma/client';
import { useRef, useTransition } from 'react'
import { useChat } from 'ai/react'

import { ChatList } from '@/app/components/chat-list'
import { ButtonScrollToBottom } from '@/app/components/button-scroll-to-bottom';
import { IconHome, IconStop } from '@/app/components/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { revalidateBySection } from '@/app/components/revalidate-section';

export default function Page() {
    const router = useRouter();

    let sectionID = 0;

    const shouldContinue = useRef(true);
    const [isPending, startTransition] = useTransition();

    const { messages, append, stop, isLoading } =
        useChat({
            onResponse(response) {
                if (response.status === 401) {
                    console.log(response.statusText)
                    toast.error('No permission', {
                        duration: 3000,
                        position: 'bottom-center',
                    });
                }
            },
            onError(error) {
                console.log(error.name)
                toast.error('Failed to call API', {
                    duration: 3000,
                    position: 'bottom-center',
                });
            },
            async onFinish(message) {
                // console.log('Finish')
                const update = await fetch(`/api/section`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: sectionID,
                        content: message.content,
                    }),
                });

                if (update.statusText == 'OK') {
                    console.log('update successfully: ' + message.content);
                }
            }
        })

    const start = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        startTransition(async () => {
            shouldContinue.current = true;

            const sections: Section[] = await fetch(`/api/section`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json());

            if (sections.length == 0) {
                toast.success('No section require update', {
                    duration: 3000,
                    position: 'bottom-center',
                });
                return
            }

            for (const section of sections) {
                if (!shouldContinue.current) break;

                if (section.generate) {
                    sectionID = section.id;

                    await append({
                        content: section.prompt,
                        role: 'user',
                    });

                    revalidateBySection(section);
                }
            }
        })
    }

    return (
        <div className="flex max-w-5xl mx-auto py-2 min-h-screen">
            <main className="w-full flex-col px-4">
                <Link href="/">
                    <button className="btn btn-block">
                        <IconHome className='size-6' />
                    </button>
                </Link>
                <button
                    disabled={isPending}
                    className="btn btn-neutral rounded-xl font-medium mt-5 w-full"
                    onClick={(e) => start(e)}
                >
                    {!isPending && (
                        <>
                            Click to generate sections
                        </>
                    )}

                    {isPending && (
                        <>
                            <span className="loading loading-spinner"></span>
                            Generating...
                        </>
                    )}
                </button>

                <div className='pb-[200px] pt-4 md:pt-8'>
                    {messages.length ? (
                        <ChatList messages={messages} />
                    ) : (
                        null
                    )}
                </div>

                <div className="fixed inset-x-0 bottom-6 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% animate-in duration-300 ease-in-out dark:from-background/10 dark:from-10% dark:to-background/80">
                    <ButtonScrollToBottom />
                    <div className="mx-auto sm:max-w-2xl sm:px-4">
                        <div className="flex items-center justify-center h-12">
                            {isLoading ? (
                                <button
                                    onClick={() => {
                                        stop();
                                        shouldContinue.current = false;
                                    }}
                                    className="btn btn-outline bg-background mb-6"
                                >
                                    <IconStop className="mr-2" />
                                    Stop generating
                                </button>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}