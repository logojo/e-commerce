import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { sendVerificationEmail } from "./email/resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: { 
        enabled: true,
        requireEmailVerification: true 
    }, 
    emailVerification: {
		sendVerificationEmail: async ({ user, url, token }) => {
            console.log('Send verification Email:', { user, url, token });
			// Send verification email to user
            await sendVerificationEmail({
                to: user.email,
                name: user.name || "usuario",
                url,
            });
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 60 * 60,
	},

});