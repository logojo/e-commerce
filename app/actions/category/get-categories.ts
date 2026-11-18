'use server'

import { prisma } from "@/lib/prisma";

export const getCategories = async() => {
    'use cache'

    try {        
        return  await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        })
       
    } catch (error) {
        console.log(error);
        return [];
    }
}