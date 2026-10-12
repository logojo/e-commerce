'use server'

import { ValidTypes } from "@/app/interfaces";
import { prisma } from "@/lib/prisma"

export const getProductBySlug = async(slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                productImages: {
                    select: {
                        url: true
                    }
                },
                category: {
                    select: { name: true }
                },
            },
            where: {
                slug: slug
            }
        })

        if( !product ) return null;
        
        return {
            ...product,
            images: product.productImages.map(image => image.url ),
            type: product.category.name.toLocaleLowerCase() as ValidTypes,
        };

    } catch (error) {
       throw new Error('Error al obtener el producto')
    }
}