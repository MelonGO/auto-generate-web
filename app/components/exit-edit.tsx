'use client'

import { useRouter } from 'next/navigation'
import { IconExit } from '@/app/components/icons'
import clsx from 'clsx'

interface ExitEditProps {
    className?: string
}

export function ExitEdit({ className }: ExitEditProps) {
    const router = useRouter()

    return (
        <button
            className={clsx('btn btn-block', className)}
            onClick={() => router.back()}
        >
            <IconExit className='size-6' />
            Exit edit
        </button>
    )
}