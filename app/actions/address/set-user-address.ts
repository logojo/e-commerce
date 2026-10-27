'use server'

import { Address } from "@/app/interfaces";
import { prisma } from "@/lib/prisma";

export const setUserAddress = async(address : Address, userId : string) => {
    try {
        const newAddress = createOrReplaceAddress(address, userId);

        return {
          ok: true,
          address: newAddress  
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message: 'No se pudo guardar la dirección'
        }
    }
}

export const deleteUserAddress = async(userId : string) => {
    try {
        await prisma.userAddress.delete({ where: {userId} });

        return {
          ok: true, 
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok:false,
            message: 'No se pudo eliminar la dirección'
        }
    }
}

const createOrReplaceAddress = async (address : Address, userId : string) => {

    const addressToSave  = {
        firstName: address.firstName,    
        lastName: address.lastName,     
        address: address.address,      
        address2: address.address2,     
        postalCode: address.postalCode,   
        city: address.city,             
        phone: address.phone,     
        countryId: address.country,
        userId: userId   
    }
    return  await prisma.userAddress.upsert({
        where: { userId },
        update: addressToSave,
        create: addressToSave,
    });

    // const storeAddress = await prisma.userAddress.findFirst({
    //     where: {userId}
    // })

    

    // if( !storeAddress ) {
    //     const newAddress = await prisma.userAddress.create({
    //         data: addressToSave,
    //     })

    //     return newAddress
    // }

    // const updateAddres = await prisma.userAddress.update({
    //     where: {userId},
    //     data: addressToSave
    // })

    // return updateAddres;
}