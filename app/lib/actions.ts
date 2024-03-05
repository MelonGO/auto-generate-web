'use server';

import prisma from '@/app/lib/prisma'
import { auth } from "@/auth"

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Section, Prisma, User } from '@prisma/client'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { revalidateBySection } from '@/app/components/revalidate-section';

export type GenerateState = {
    message?: string | null;
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export type PromptState = {
    errors?: {
        prompt?: string[];
    };
    message?: string | null;
};

const PromptFormSchema = z.object({
    prompt: z.string({
        invalid_type_error: "Prompt must be a string",
    }).trim()
        .min(1, { message: "Prompt is required" }),
});

export async function updatePrompt(
    id: number,
    isRequired: boolean,
    prevState: PromptState | undefined,
    formData: FormData
) {
    const session = await auth()

    if (session?.user?.name != 'admin') {
        return { message: 'No permission' };
    }

    const validatedFields = PromptFormSchema.safeParse({
        prompt: formData.get('prompt'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { prompt } = validatedFields.data;

    let section;

    try {
        section = await prisma.section.update({
            where: {
                id: id,
            },
            data: {
                prompt: prompt,
                generate: !isRequired,
                updatedAt: new Date(),
            },
        })

    } catch (error) {
        return { message: 'Database Error: Failed to Update Section Prompt.' };
    }

    await revalidateBySection(section);

    return { message: 'success' };
}

export type ContentState = {
    errors?: {
        content?: string[];
    };
    message?: string | null;
};

const ContentFormSchema = z.object({
    content: z.string({
        invalid_type_error: "Content must be a string",
    }),
});

export async function updateContent(
    id: number,
    prevState: ContentState | undefined,
    formData: FormData
) {
    const session = await auth()

    if (session?.user?.name != 'admin') {
        return { message: 'No permission' };
    }

    const validatedFields = ContentFormSchema.safeParse({
        content: formData.get('content'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { content } = validatedFields.data;

    let section;

    try {
        section = await prisma.section.update({
            where: {
                id: id,
            },
            data: {
                content: content,
                updatedAt: new Date(),
            },
        })


    } catch (error) {
        return { message: 'Database Error: Failed to Update Section Content.' };
    }

    await revalidateBySection(section);

    return {
        message: 'success',
    };

}

export type CreateSectionState = {
    message?: string | null;
};

export async function createSection(
    type: string,
    id: number,
    prevState: CreateSectionState | undefined
) {
    const session = await auth()

    if (session?.user?.name != 'admin') {
        return { message: 'No permission' };
    }

    let newSection;

    switch (type) {
        case 'category':
            try {
                newSection = await prisma.section.create({
                    data: {
                        categoryId: id,
                        prompt: "Enter the prompt for this section - Category Page",
                        content: "Enter the content or generate by AI",
                    },
                })
            } catch (error) {
                return {
                    message: 'Database Error: Failed to Create Section.',
                };
            }

            await revalidateBySection(newSection);
            break;

        case 'menu':
            try {
                newSection = await prisma.section.create({
                    data: {
                        menuId: id,
                        prompt: "Enter the prompt for this section - Menu Page",
                        content: "Enter the content or generate by AI",
                    },
                })
            } catch (error) {
                return {
                    message: 'Database Error: Failed to Create Section.',
                };
            }

            await revalidateBySection(newSection);
            break;

        case 'submenu':
            try {
                newSection = await prisma.section.create({
                    data: {
                        submenuId: id,
                        prompt: "Enter the prompt for this section - Submenu Page",
                        content: "Enter the content or generate by AI",
                    },
                })
            } catch (error) {
                return {
                    message: 'Database Error: Failed to Create Section.',
                };
            }

            await revalidateBySection(newSection);
            break;

        default:
            break;
    }
}

export type DeleteSectionState = {
    message?: string | null;
};

export async function deleteSection(
    id: number,
    prevState: DeleteSectionState | undefined
) {
    const session = await auth()

    if (session?.user?.name != 'admin') {
        return { message: 'No permission' };
    }

    let deleteSection;

    try {
        deleteSection = await prisma.section.delete({
            where: { id: id },
        })

    } catch (error) {
        return {
            message: 'Database Error: Failed to Delete Section.',
        };
    }

    await revalidateBySection(deleteSection);
}

export type SideNavState = {
    errors?: {
        name?: string[];
        link?: string[];
    };
    message?: string | null;
};

const SideNavFormSchema = z.object({
    name: z.string({
        invalid_type_error: "Side navigation name must be a string",
    }).trim()
        .min(1, { message: "Side navigation name is required" }),
    link: z.string({
        invalid_type_error: "Side navigation link must be a string",
    }).trim()
        .min(1, { message: "Side navigation link is required" })
        .regex(new RegExp("^(?!sign-in$).*"), { message: `The link can not be "sign-in"` })
        .regex(new RegExp("^(?!edit$).*"), { message: `The link can not be "edit"` })
        .regex(new RegExp("^(?!setting$).*"), { message: `The link can not be "setting"` })
        .regex(new RegExp("^(?!generate$).*"), { message: `The link can not be "generate"` })
        .regex(new RegExp("^(?!api$).*"), { message: `The link can not be "api"` })
        .regex(new RegExp("^[A-Za-z0-9-]*$"), { message: `Only A-Z, a-z, 0-9 and "-"` }),
});

export async function createSideNav(
    type: string,
    id: number,
    prevState: SideNavState | undefined,
    formData: FormData
) {
    const session = await auth()

    if (session?.user?.name != 'admin') {
        return { message: 'No permission' };
    }

    const validatedFields = SideNavFormSchema.safeParse({
        name: formData.get('name'),
        link: formData.get('link'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, link } = validatedFields.data;

    let newSideNav;

    switch (type) {
        case 'home':
            try {
                newSideNav = await prisma.category.create({
                    data: {
                        name: name,
                        link: link,
                    },
                })

            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        return {
                            message: 'The link already exists.',
                        };
                    }
                }

                return {
                    message: 'Database Error: Failed to Create SideNav.',
                };
            }

            revalidatePath("/edit");
            break;

        case 'category':
            try {
                newSideNav = await prisma.menu.create({
                    data: {
                        categoryId: id,
                        name: name,
                        link: link,
                    },
                    include: {
                        category: true,
                    }
                })

            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        return {
                            message: 'The link already exists.',
                        };
                    }
                }

                return {
                    message: 'Database Error: Failed to Create SideNav.',
                };
            }

            revalidatePath(`/${newSideNav.category.link}/edit`);
            break;

        case 'menu':
            try {
                newSideNav = await prisma.submenu.create({
                    data: {
                        menuId: id,
                        name: name,
                        link: link,
                    },
                    include: {
                        menu: true,
                    }
                })

            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        return {
                            message: 'The link already exists.',
                        };
                    }
                }

                return {
                    message: 'Database Error: Failed to Create SideNav.',
                };
            }

            const menu = newSideNav.menu;

            const category = await prisma.category.findUnique({
                where: { id: menu.categoryId },
            })

            revalidatePath(`/${category?.link}/${menu.link}/edit`);
            break;

        default:
            break;
    }
}

export type DeletePageState = {
    message?: string | null;
};

export async function deletePage(
    type: string,
    id: number,
    prevState: DeletePageState | undefined,
) {
    const session = await auth()

    if (session?.user?.name != 'admin') {
        return { message: 'No permission' };
    }

    switch (type) {
        case 'category':
            try {
                const transaction = await prisma.$transaction(async (prisma) => {
                    // Delete Sections related to the Category
                    await prisma.section.deleteMany({
                        where: { categoryId: id },
                    });

                    // Find all Menus related to the Category
                    const menus = await prisma.menu.findMany({
                        where: { categoryId: id },
                        include: { submenus: true },
                    });

                    for (const menu of menus) {
                        // Delete Sections related to each Menu
                        await prisma.section.deleteMany({
                            where: { menuId: menu.id },
                        });

                        // Delete SubMenus and their related Sections
                        for (const submenu of menu.submenus) {
                            await prisma.section.deleteMany({
                                where: { submenuId: submenu.id },
                            });

                            await prisma.submenu.delete({
                                where: { id: submenu.id },
                            });
                        }

                        // Delete the Menu
                        await prisma.menu.delete({
                            where: { id: menu.id },
                        });
                    }

                    // Finally, delete the Category
                    await prisma.category.delete({
                        where: { id: id },
                    });
                });

            } catch (error) {
                return {
                    message: 'Database Error: Failed to Delete Category.',
                };
            }

            redirect("/")

        case 'menu':
            let currentMenu;
            try {
                currentMenu = await prisma.menu.findUnique({
                    where: { id: id },
                    include: { category: true },
                });

                const transaction = await prisma.$transaction(async (prisma) => {
                    // Delete Sections related to Menu
                    await prisma.section.deleteMany({
                        where: { menuId: id },
                    });

                    // Find all SubMenus related to the Menu
                    const submenus = await prisma.submenu.findMany({
                        where: { menuId: id },
                    });

                    // Delete SubMenus and their related Sections
                    for (const submenu of submenus) {
                        await prisma.section.deleteMany({
                            where: { submenuId: submenu.id },
                        });

                        await prisma.submenu.delete({
                            where: { id: submenu.id },
                        });
                    }

                    // Delete the Menu
                    await prisma.menu.delete({
                        where: { id: id },
                    });
                });

            } catch (error) {
                return {
                    message: 'Database Error: Failed to Delete Menu.',
                };
            }

            redirect(`/${currentMenu?.category.link}`)

        case 'submenu':
            let currentSubmenu;
            try {
                currentSubmenu = await prisma.submenu.findUnique({
                    where: { id: id },
                    include: { menu: true },
                });

                const transaction = await prisma.$transaction(async (prisma) => {
                    // Delete Sections related to SubMenu
                    await prisma.section.deleteMany({
                        where: { submenuId: id },
                    });

                    // Delete the SubMenu
                    await prisma.submenu.delete({
                        where: { id: id },
                    });
                });

            } catch (error) {
                return {
                    message: 'Database Error: Failed to Delete Menu.',
                };
            }

            const menu = await prisma.menu.findUnique({
                where: { id: currentSubmenu?.menuId },
                include: { category: true },
            })

            const category = await prisma.category.findUnique({
                where: { id: menu?.category.id },
            })

            redirect(`/${category?.link}/${menu?.link}`)

        default:
            break;
    }

}

export type UpdatePasswordState = {
    errors?: {
        oldPassword?: string[];
        newPassword?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
};

const UpdatePasswordFormSchema = z.object({
    oldPassword: z.string({
        invalid_type_error: "Password must be a string",
    }).trim().min(1, { message: "Old Password is required" }),
    newPassword: z.string({
        invalid_type_error: "Password must be a string",
    }).trim().min(1, { message: "New Password is required" }),
    confirmPassword: z.string({
        invalid_type_error: "Password must be a string",
    }).trim().min(1, { message: "Confirm Password is required" }),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords not match",
    });

async function getUser(username: string): Promise<User | undefined> {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        })
        if (!user) return undefined
        const u: User = {
            id: user.id,
            username: user.username,
            password: user.password,
        };
        return u;

    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}
export async function updatePassword(
    prevState: UpdatePasswordState | undefined,
    formData: FormData
) {
    const session = await auth()

    if (session?.user?.name != 'admin') {
        return { message: 'No permission' };
    }

    const validatedFields = UpdatePasswordFormSchema.safeParse({
        oldPassword: formData.get('oldPassword'),
        newPassword: formData.get('newPassword'),
        confirmPassword: formData.get('confirmPassword'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Password not match',
        };
    }

    const { oldPassword, newPassword } = validatedFields.data;


    try {
        const user = await getUser("admin");

        if (!user) {
            return {
                message: 'Invalid User',
            };
        }

        const passwordsMatch = oldPassword === user.password;

        if (!passwordsMatch) {
            return {
                message: 'Invalid Password',
            };
        }

        await prisma.user.update({
            where: {
                username: "admin",
            },
            data: {
                password: newPassword,
            },
        })

        return {
            message: 'Password updated successfully',
        };


    } catch (error) {
        return { message: 'Fail to update password' };
    }

}
