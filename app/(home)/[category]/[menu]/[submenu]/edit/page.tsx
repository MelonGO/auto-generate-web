import prisma from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import { Fragment } from 'react';

import { NavbarEdit } from '@/app/components/navbar-edit'
import { SideNav } from '@/app/components/side-nav'
import { SectionCreate } from '@/app/components/section-create'
import { PageDelete } from '@/app/components/page-delete';
import { SectionEdit } from '@/app/components/section-edit'
import { SideNavItems } from '@/app/components/sidenav-items'
import { Metadata } from 'next';
import { ExitEdit } from '@/app/components/exit-edit'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Edit'
    }
}

export default async function Page({ params }: { params: { submenu: string } }) {
    const submenuLink = params.submenu

    const submenu = await prisma.submenu.findUnique({
        where: { link: submenuLink },
        include: {
            sections: {
                orderBy: {
                    id: "asc",
                },
            },
        },
    })

    if (!submenu) notFound()

    return (
        <>
            <div className="drawer-content">
                {/* Page content here */}
                <NavbarEdit />

                <div className="flex flex-col md:flex-row md:overflow-hidden">

                    <SideNav type='submenu' path={submenu.link} />

                    <div className="flex-grow p-6 md:overflow-y-auto min-h-screen">
                        <ExitEdit />
                        <div className="rounded-lg p-3">
                            <SectionCreate type='submenu' id={submenu.id} />

                            {submenu.sections.map((section, index) => (
                                <Fragment key={index}>
                                    <SectionEdit section={section} />
                                </Fragment>
                            ))}

                            <PageDelete type='submenu' id={submenu.id} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="drawer-side no-scrollbar">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <SideNavItems type='submenu' path={submenu.link} />
                </ul>
            </div>
        </>

    );

}