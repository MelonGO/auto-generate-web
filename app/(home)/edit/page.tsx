import { SideNav } from '@/app/components/side-nav'
import { SideNavCreate } from '@/app/components/sidenav-create'
import { NavbarEdit } from '@/app/components/navbar-edit'
import { SideNavItems } from '@/app/components/sidenav-items'
import { Metadata } from 'next'
import { ExitEdit } from '@/app/components/exit-edit'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Edit'
    }
}

export default function Home() {

    return (
        <>
            <div className="drawer-content">
                {/* Page content here */}
                <NavbarEdit />

                <div className="flex flex-col md:flex-row md:overflow-hidden">
                    <SideNav type='home' path='/' />

                    <div className="flex-grow p-6 md:overflow-y-auto md:p-12 min-h-screen">
                        <ExitEdit className='mb-2' />
                        <div className="rounded-lg p-3">
                            <div className='mb-10'>
                                <div className="collapse bg-base-100 outline-dashed">
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-center text-xl font-medium">
                                        Add Category
                                    </div>
                                    <div className="collapse-content">
                                        <SideNavCreate type='home' id={0} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-side no-scrollbar">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <SideNavItems type='home' path='/' />
                </ul>
            </div>
        </>

    );
}
