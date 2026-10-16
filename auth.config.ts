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
                console.log(rest);
                
                return rest;
            },
        }),
    ]
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth( authConfig )