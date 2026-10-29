'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"

export const getOrders = async () => {
    try {

        const session = await auth.api.getSession({
            headers: await headers() 
        })

        const orders = prisma.order.findMany({
            where: {
                ...( session?.user.role !== 'admin' &&{
                    userId: session?.user.id
                })
            },
            select: {
                id: true,
                isPaid: true,                
                OrderAddress: true
            }

        })

        return orders;

    } catch (error) {
       console.log(error);
       return [];
    }
}