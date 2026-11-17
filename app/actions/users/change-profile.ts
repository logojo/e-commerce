'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const changeProfile = async( userId : string, profile: string ) => {

    try {
        await prisma.user.update({
         where: { id: userId },
         data: {
             role: profile
         }
        })

        revalidatePath('/users')
        
        return {
            ok: true,
            message: 'Perfil actualizado'
        }

        
    } catch (error) {
        console.log(error);
        
         return {
            ok: false,
            message: 'No se puedo actualizar el perfil '
        }
    }
}