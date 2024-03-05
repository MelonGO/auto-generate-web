import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/sign-in',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnSignIn = nextUrl.pathname === '/sign-in';
            const isOnEdit = nextUrl.pathname.endsWith('/edit');
            const isOnSetting = nextUrl.pathname === '/setting';
            const isOnGenerate = nextUrl.pathname === '/generate';

            if (!isOnEdit && !isOnSignIn && !isOnSetting && !isOnGenerate) {
                return true;
            }

            if ((isOnEdit || isOnSetting || isOnGenerate) && !isLoggedIn) {
                return Response.redirect(new URL('/sign-in', nextUrl.origin));
            }

            if (isOnSignIn && isLoggedIn) {
                return Response.redirect(nextUrl.origin);
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;