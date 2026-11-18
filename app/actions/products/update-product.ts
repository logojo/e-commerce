'use server'

import z from 'zod';
import { prisma } from "@/lib/prisma";
import { Gender, Size } from '@/generated/prisma/enums';
import { Product } from '@/generated/prisma/client';
import { revalidateTag } from 'next/cache';


const productSchema = z.object({
    id: z.uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug:  z.string().min(3).max(255),
    description:  z.string(),
    price:  z.coerce.number().min(0).transform( val => Number( val.toFixed(2))), //coerce me ayuda a convertir un numero que viene como estring
    inStock:  z.coerce.number().min(0).transform( val => Number( val.toFixed(0))),
    categoryId: z.uuid(),
    sizes: z.coerce.string().transform( val => val.split(',')),
    tags: z.coerce.string().transform( val => val.split(',')),
    gender: z.enum( Gender )
});

export const  createUpdateProduct = async (formData : FormData) => {
   const data = Object.fromEntries( formData );
   const producParsed = productSchema.safeParse( data );

   if ( !producParsed.success ){
       console.log(producParsed.error);
       return {
           ok: false,
           message: producParsed.error
       }

   }

   const { id,  ...rest } = producParsed.data;
   rest.slug = rest.slug.toLocaleLowerCase().replace(/ /g, '-').trim()

    try {
        
        const prismaTx = await prisma.$transaction( async (tx) => {
            
            let product: Product
            if( id ) {
                //actualizar
                console.log('actualizar');
                
                product = await tx.product.update({
                    where: { id: id },
                    data: { 
                        ...rest,
                        sizes: { set: rest.sizes as Size[] }
                    }
                })
            } else {
                 console.log('crear');
                 product = await tx.product.create({
                    data: { 
                        ...rest,
                        sizes: { set: rest.sizes as Size[] }
                    }
                })
            }
    
            return {
                product
            }
        })

        revalidateTag("products", "max");

        return {
           ok: true
       }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Ocurrio un error al actualizar el producto'
        }
        
    }

}