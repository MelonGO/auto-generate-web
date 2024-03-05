import prisma from '@/app/lib/prisma'
import { notFound, } from 'next/navigation'
import Link from 'next/link'
import { IconHome } from '@/app/components/icons';

export async function SideNavItems({
    type,
    path,
}: {
    type: string,
    path: string,
}) {

    const renderLink = (name: string, link: string, active: boolean) => {

        return (
            <Link
                key={link}
                href={link}
                className={active ? 'active' : ''}
            >
                {name}
            </Link>
        );

    };

    // Home Page
    if (type == 'home' && path == '/') {
        const categories = await prisma.category.findMany()

        if (!categories) notFound()

        return (
            <ul className="menu bg-base-100 w-64 rounded-box shadow-lg">
                {categories.map((category, index) => {
                    return <li key={index}>{renderLink(category.name, category.link, false)}</li>;
                })}
            </ul>
        );
    }

    // Category Pages
    if (type == 'category' && path != '') {
        const category = await prisma.category.findUnique({
            where: { link: path },
        })

        if (!category) notFound()

        const menus = await prisma.menu.findMany({
            where: { categoryId: category.id },
            include: { submenus: true },
        })

        return (

            <ul className="menu bg-base-100 w-64 rounded-box shadow-lg">
                <Return />
                {menus.map((menu, index) => {
                    if (menu.submenus.length == 0) {
                        // No submenu
                        const menuLink = `/${category.link}/${menu.link}`;

                        return <li key={index}>{renderLink(menu.name, menuLink, false)}</li>;

                    } else {
                        const menuLink = `/${category.link}/${menu.link}`;

                        return (
                            <li key={index}>
                                {renderLink(menu.name, menuLink, false)}
                                <ul>
                                    {menu.submenus.map((submenu, index) => {
                                        const submenuLink = `/${category.link}/${menu.link}/${submenu.link}`;
                                        return <li key={index}>{renderLink(submenu.name, submenuLink, false)}</li>;
                                    })}
                                </ul>
                            </li>

                        );
                    }

                })}
            </ul>
        );
    }

    // Menu Page
    if (type == 'menu' && path != '') {
        const menu = await prisma.menu.findUnique({
            where: { link: path },
            include: { category: true },
        })

        if (!menu) notFound()

        const category = menu.category;

        const menus = await prisma.menu.findMany({
            where: { categoryId: category.id },
            include: { submenus: true },
        })

        return (
            <ul className="menu bg-base-100 w-64 rounded-box shadow-lg">
                <Return />
                {menus.map((menu, index) => {
                    if (menu.submenus.length == 0) {
                        // No submenu
                        const menuLink = `/${category.link}/${menu.link}`;
                        const isActive = (menu.link == path);

                        return <li key={index}>{renderLink(menu.name, menuLink, isActive)}</li>;
                    } else {
                        const menuLink = `/${category.link}/${menu.link}`;
                        const isActive = (menu.link == path);

                        return (
                            <li key={index}>
                                {renderLink(menu.name, menuLink, isActive)}
                                <ul>
                                    {menu.submenus.map((submenu, index) => {
                                        const submenuLink = `/${category.link}/${menu.link}/${submenu.link}`;
                                        return <li key={index}>{renderLink(submenu.name, submenuLink, false)}</li>;
                                    })}
                                </ul>
                            </li>
                        );
                    }

                })}
            </ul>
        );

    }

    // Submenu Page
    if (type == 'submenu' && path != '') {
        const submenu = await prisma.submenu.findUnique({
            where: { link: path },
            include: { menu: true },
        })

        if (!submenu) notFound()

        const menu = submenu.menu;

        const category = await prisma.category.findUnique({
            where: { id: menu.categoryId },
        })

        if (!category) notFound()

        const menus = await prisma.menu.findMany({
            where: { categoryId: category.id },
            include: { submenus: true },
        })

        return (

            <ul className="menu bg-base-100 w-64 rounded-box shadow-lg">
                <Return />
                {menus.map((menu, index) => {
                    if (menu.submenus.length == 0) {
                        // No submenu
                        const menuLink = `/${category.link}/${menu.link}`;

                        return <li key={index}>{renderLink(menu.name, menuLink, false)}</li>;

                    } else {
                        const menuLink = `/${category.link}/${menu.link}`;

                        return (
                            <li key={index}>
                                {renderLink(menu.name, menuLink, false)}
                                <ul>
                                    {menu.submenus.map((submenu, index) => {
                                        const submenuLink = `/${category.link}/${menu.link}/${submenu.link}`;
                                        const isActive = (submenu.link == path);

                                        return <li key={index}>{renderLink(submenu.name, submenuLink, isActive)}</li>;
                                    })}
                                </ul>
                            </li>
                        );
                    }

                })}
            </ul>
        );

    }

    return (
        <div>Error</div>
    );

}

function Return() {
    return (
        <ul className="bg-base-100">
            <li>
                <Link href={"/"}>
                    <IconHome className='size-6' />
                    HOME
                </Link>
            </li>
        </ul>

    );
}