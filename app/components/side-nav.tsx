import { SideNavItems } from '@/app/components/sidenav-items'

export function SideNav({
    type,
    path,
}: {
    type: string,
    path: string,
}) {

    return (
        <div className="w-full flex-none md:w-64 p-3 m-5 hidden md:block">
            <SideNavItems type={type} path={path} />
        </div>
    )
}
