'use server'

import { prisma } from "@/lib/prisma";


interface PaginatonOptions {
    page?:number,
    take?: number,
}

export const getUsers = async({ page = 1, take = 10 } : PaginatonOptions) => {

    if( isNaN( Number( page )) || page < 1 ) page = 1;

    if( isNaN( Number( take )) ) take = 10;

    try {

         const [users, totalUsers] = await Promise.all([
            prisma.user.findMany({
                take: take,
                skip: (page - 1) * take,
            }),

            //todo
            prisma.user.count(),
        ]);
        

        const totalPages = Math.ceil(totalUsers / take);
               
        return  {
        totalPages,
        currentPage: page,
        users
        
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error al cargar los productos')
    }
}