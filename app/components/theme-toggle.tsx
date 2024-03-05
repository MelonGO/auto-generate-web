'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect, useTransition } from 'react'
import { IconMoon, IconSun } from '@/app/components/icons';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [_, startTransition] = useTransition()


    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const toggleTheme = () => {
        setTheme((theme === 'light' || theme === 'system') ? 'dark' : 'light');
    };

    return (
        <>
            <button
                className='m-2'
                onClick={() => {
                    startTransition(() => {
                        toggleTheme()
                    })
                }}
            >
                {(theme === 'light' || theme === 'system') ? <IconMoon className='size-6' /> : <IconSun className='size-6' />}
            </button>
        </>
    );
}
