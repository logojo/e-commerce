

import { ValidTypes } from "@/app/interfaces";
import { Gender } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma"


interface PaginatonOptions {
    page?:number,
    take?: number,
    gender?: Gender
}

export const getPaginatedProductsWithImages = async({ page = 1, take = 12, gender } : PaginatonOptions) => {
 

    if( isNaN( Number( page )) || page < 1 ) page = 1;

    if( isNaN( Number( take )) ) take = 12;
    
    try {
        //consulta paginada
        const [products, totalProducts] = await Promise.all([
            prisma.product.findMany({
                where: {
                    gender
                },
                take: take,
                skip: (page - 1) * take,
                include: {
                    category: {
                        select: { name: true }
                    },
                    productImages: { //consulta con relación
                        take: 2,
                        select: { //campos que quiero traer de la tabla relacionada
                            url: true
                        }
                    }
                },                
            }),

            //todo
            prisma.product.count({
                where: {
                    gender
                },
            }),
        ]);

       const totalPages = Math.ceil(totalProducts / take);
       
       return  {
        totalPages,
        currentPage: page,
        products: products.map( ( product ) => ({
                    ...product,
                        images: product.productImages.map(image => image.url ),
                        type: product.category.name.toLocaleLowerCase() as ValidTypes,
                  })),
        
       }
    
    } catch ( error ) {
        throw new Error('Error al cargar los productos')
    }
}