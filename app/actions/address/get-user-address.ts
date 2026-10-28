'use server'

import { prisma } from "@/lib/prisma";

export const getUserAddres = async( userId : string ) => {
    'use cache'

    try {        
        const address = await prisma.userAddress.findFirst({
            where: {userId}
        })

        if( !address ) return null;

        //extrayendo todas las proieddades de address que no son necesarias
        const { countryId, userId: user, address2, ...rest} = address;


        return {
            ...rest,
            address2: address2 ? address2 : undefined,
            country: countryId
        };
    } catch (error) {
        console.log(error);
        return null
    }
}