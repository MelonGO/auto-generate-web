import NextAuth, { User } from 'next-auth';
import { authConfig } from '@/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User as PrismaUser } from '@prisma/client';
import prisma from '@/app/lib/prisma'

async function getUser(username: string): Promise<PrismaUser | undefined> {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username },
        })
        if (!user) return undefined
        const u: PrismaUser = {
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

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ username: z.string().min(1), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { username, password } = parsedCredentials.data;
                    const prisma_user = await getUser(username);
                    if (!prisma_user) return null;

                    const passwordsMatch = password === prisma_user.password;
                    if (passwordsMatch) {
                        const user: User = { name: prisma_user.username };
                        return user;
                    }

                }

                console.log('Invalid credentials');
                return null;

            },
        }),
    ],
});