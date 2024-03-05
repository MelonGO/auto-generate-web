import prisma from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import { auth } from "@/auth"
import { Metadata } from 'next';

import { Fragment } from 'react'
import { Navbar } from '@/app/components/header';
import { SideNav } from '@/app/components/side-nav'
import { SideNavItems } from '@/app/components/sidenav-items'
import { MemoizedReactMarkdown } from '@/app/components/markdown'
import { CodeBlock } from '@/app/components/codeblock'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { ScrollToTop } from '@/app/components/button-scroll-to-top';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
    const categoryLink = params.category
    const category = await prisma.category.findUnique({
        where: { link: categoryLink },
    })

    return {
        title: category?.name
    }
}

export default async function Page({ params }: { params: { category: string } }) {
    const session = await auth()

    const categoryLink = params.category

    const category = await prisma.category.findUnique({
        where: { link: categoryLink },
        include: {
            sections: {
                orderBy: {
                    id: "asc",
                },
            },
        },
    })

    if (!category) notFound()

    return (
        <>
            <div className="drawer-content">
                {/* Page content here */}
                <Navbar session={session} />

                <div className="flex flex-col md:flex-row md:overflow-hidden">

                    <SideNav type='category' path={category.link} />

                    <div className="flex-grow p-6 md:overflow-y-auto md:p-12 min-h-screen">
                        <div className="prose sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto">
                            {category.sections.map((section, index) => {
                                return (
                                    <Fragment key={index}>
                                        <MemoizedReactMarkdown
                                            className="prose sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl 
                                                break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
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
                                            {section.content ? section.content : ''}
                                        </MemoizedReactMarkdown>
                                    </Fragment>
                                );
                            })}
                        </div>
                    </div>

                    <ScrollToTop />
                </div>
            </div>
            <div className="drawer-side no-scrollbar">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <SideNavItems type='category' path={category.link} />
                </ul>
            </div>
        </>

    );

}