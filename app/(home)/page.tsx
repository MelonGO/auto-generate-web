import { Navbar } from '@/app/components/header'
import { SideNav } from '@/app/components/side-nav'
import { auth } from "@/auth"
import Link from "next/link"
import { SideNavItems } from '@/app/components/sidenav-items'
import { IconEdit, IconGithub } from '@/app/components/icons'

export default async function Home() {
  const session = await auth()

  return (
    <>
      <div className="drawer-content">
        {/* Page content here */}
        <Navbar session={session} />

        <div className="flex flex-col md:flex-row md:overflow-hidden">

          <SideNav type='home' path='/' />

          <div className="flex-grow p-6 md:overflow-y-auto md:p-12 min-h-screen">
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
              <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                <h1 className="font-heading text-3xl sm:text-2xl md:text-3xl lg:text-4xl">
                  An auto generate web built using Next.js 14 server components.
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                  Define title and topic, then generate using AI.
                </p>
                <div className="space-x-4">
                  <Link href="/edit" className='btn btn-neutral'>
                    <IconEdit className='size-6' />
                    /edit
                  </Link>
                  <Link
                    href={'https://github.com/MelonGO/auto-generate-web'}
                    target="_blank"
                    rel="noreferrer"
                    className='btn btn-outline'
                  >
                    <IconGithub className='size-6' />
                    GitHub
                  </Link>
                </div>
              </div>
            </section>
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
