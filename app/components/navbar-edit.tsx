import Link from 'next/link'
import { IconSidebar } from '@/app/components/icons';

export function NavbarEdit() {

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

            <Link href={`/generate`}>
                <button className="btn btn-neutral btn-outline">
                    Generate
                </button>
            </Link>

        </div>
    );

}