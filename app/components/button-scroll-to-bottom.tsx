'use client'

import * as React from 'react'

import { useAtBottom } from '@/app/lib/hooks/use-at-bottom'
import clsx from 'clsx'
import { IconArrowDown } from '@/app/components/icons'

export function ButtonScrollToBottom() {
    const isAtBottom = useAtBottom()

    return (
        <button
            className={clsx(
                'btn absolute right-4 top-1 z-10 bg-background transition-opacity duration-300 sm:right-8 md:top-2',
                isAtBottom ? 'opacity-0' : 'opacity-100',
            )}
            onClick={() =>
                window.scrollTo({
                    top: document.body.offsetHeight,
                    behavior: 'smooth'
                })
            }
        >
            <IconArrowDown />
            <span className="sr-only">Scroll to bottom</span>
        </button>
    )
}
