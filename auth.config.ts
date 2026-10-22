import NextAuth, { type NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcryptjs from 'bcryptjs';

import { prisma } from './lib/prisma';
 
export const authConfig = {
    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account'
    },
    callbacks: {
       jwt({ token, user}) {
            if( user ) {
                token.data = user;
            }

            return token;
       },

       session({ session, token, user }) {
        session.user = token.data as any;
        
        return session;
       },
       authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            
            const isOnDashboard = nextUrl.pathname.startsWith('/');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
                 return true;
        },
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ email: z.email(), password: z.string().min(6) })
                .safeParse(credentials);

                if ( !parsedCredentials.success )  return null;

                const { email, password } = parsedCredentials.data

                const user = await prisma.user.findUnique({ where: { email } })

                if( !user )   return null;                

                if( !bcryptjs.compareSync(  password, user.password )) return null;

                const { password: _, ...rest } = user;
                
                return rest;
            },
        }),
    ]
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth( authConfig )