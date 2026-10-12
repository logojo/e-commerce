'use server'

import { prisma } from "@/lib/prisma"

export const getProductStock = async(slug: string) => {
    try {
        const product = await prisma.product.findFirst({
           select: {
             inStock: true
           },
           where: { slug }
        })

        if( !product ) return 0;
        
        return product.inStock

    } catch (error) {
       throw new Error('Error al obtener el stock')
    }
}