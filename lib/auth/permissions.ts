import { headers } from "next/headers";
import { auth } from "./auth";

export async function requireAdmin() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if( !session ) {
        return {
            authorized: false,
            status: 401
        }
    }

    if ( session.user.role !== 'admin' ) {
         return {
            authorized: false,
            status: 401
         }
    }

    return {
        authorized: true,
        session,
    };

}