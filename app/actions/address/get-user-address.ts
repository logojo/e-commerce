'use server'

import { prisma } from "@/lib/prisma";

export const getUserAddres = async( userId : string ) => {
    'use cache'

    try {        
        const address = await prisma.userAddress.findFirst({
            where: {userId}
        })

        if( !address ) return null;

        const { countryId, address2, ...rest} = address;


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