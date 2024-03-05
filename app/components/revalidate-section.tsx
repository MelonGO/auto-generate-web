'use server';

import { Section } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import prisma from '@/app/lib/prisma';

export async function revalidateBySection(section: Section) {
    let currentPath;

    // Category Section
    if (section.categoryId != null) {
        const category = await prisma.category.findUnique({
            where: { id: section.categoryId },
        })
        currentPath = `/${category?.link}`;
    }

    // Menu Section
    if (section.menuId != null) {
        const menu = await prisma.menu.findUnique({
            where: { id: section.menuId },
            include: { category: true },
        })

        const category = menu?.category;

        const menus = await prisma.menu.findMany({
            where: { categoryId: category?.id },
            include: { submenus: true },
        })
        currentPath = `/${category?.link}/${menu?.link}`;
    }

    // Submenu Section
    if (section.submenuId != null) {
        const submenu = await prisma.submenu.findUnique({
            where: { id: section.submenuId },
            include: { menu: true },
        })

        const menu = submenu?.menu;

        const category = await prisma.category.findUnique({
            where: { id: menu?.categoryId },
        })

        const menus = await prisma.menu.findMany({
            where: { categoryId: category?.id },
            include: { submenus: true },
        })

        currentPath = `/${category?.link}/${menu?.link}/${submenu?.link}`;
    }

    revalidatePath(`${currentPath}/edit`);
}