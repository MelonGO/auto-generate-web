import prisma from '@/app/lib/prisma'
import { notFound, } from 'next/navigation'
import { Fragment } from 'react';

import { SideNav } from '@/app/components/side-nav'
import { NavbarEdit } from '@/app/components/navbar-edit'
import { SideNavCreate } from '@/app/components/sidenav-create'
import { SectionCreate } from '@/app/components/section-create'
import { SectionEdit } from '@/app/components/section-edit'
import { PageDelete } from '@/app/components/page-delete';
import { SideNavItems } from '@/app/components/sidenav-items'
import { Metadata } from 'next';
import { ExitEdit } from '@/app/components/exit-edit'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Edit'
    }
}

export default async function Page({ params }: { params: { menu: string } }) {
    const menuLink = params.menu

    const menu = await prisma.menu.findUnique({
        where: { link: menuLink },
        include: {
            submenus: true,
            sections: {
                orderBy: {
                    id: "asc",
                },
            },
        },
    })

    if (!menu) notFound()

    return (
        <>
            <div className="drawer-content">
                {/* Page content here */}
                <NavbarEdit />

                <div className="flex flex-col md:flex-row md:overflow-hidden">

                    <SideNav type='menu' path={menu.link} />

                    <div className="flex-grow p-6 md:overflow-y-auto md:p-12 min-h-screen">
                        <ExitEdit className='mb-2' />
                        <div className="rounded-lg p-3">
                            <div className='mb-10'>
                                <div className="collapse bg-base-100 outline-dashed">
                                    <input type="checkbox" className="peer" />
                                    <div className="collapse-title text-center text-xl font-medium">
                                        Add SubMenu
                                    </div>
                                    <div className="collapse-content">
                                        <SideNavCreate type='menu' id={menu.id} />
                                    </div>
                                </div>
                            </div>

                            <SectionCreate type='menu' id={menu.id} />

                            {menu.sections.map((section, index) => (
                                <Fragment key={index}>
                                    <SectionEdit section={section} />
                                </Fragment>
                            ))}

                            <PageDelete type='menu' id={menu.id} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-side no-scrollbar">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <SideNavItems type='menu' path={menu.link} />
                </ul>
            </div>
        </>

    );

}