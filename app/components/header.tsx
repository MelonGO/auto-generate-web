'use client';

import Link from 'next/link'
import type { Session } from "next-auth"
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/app/components/theme-toggle'
import { IconEdit, IconSidebar, IconSetting } from '@/app/components/icons';

export function Navbar({ session }: { session: Session | null }) {
    const pathname = usePathname();

    let editPath;
    if (pathname == "/") {
        editPath = pathname + "edit";
    } else {
        editPath = pathname + "/edit";
    }

    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-none md:hidden">
                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                    <IconSidebar />
                </label>
            </div>

            <div className="flex-1">
                <Link href="/" className="btn btn-ghost text-xl">Auto Generate Web</Link>
            </div>

            <div className="navbar-end">
                <ThemeToggle />
                {session?.user && (
                    <>
                        <Link href={editPath} className="btn btn-ghost btn-circle">
                            <IconEdit className='size-6' />
                        </Link>

                        <Link href="/setting" className="btn btn-ghost btn-circle">
                            <IconSetting className='size-6' />
                        </Link>
                    </>
                )}
            </div>

        </div>
    );
}