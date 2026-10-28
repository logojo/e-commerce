'use server'

import { prisma } from "@/lib/prisma";


export const getOrder = async( orderId: string ) => {
    
    
    try {    
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                OrderItem: {
                    include: {
                        product: {
                            select: {
                                slug: true,
                                title: true,
                                productImages: {
                                    select: {
                                        url: true
                                    }
                                }
                            }
                        }
                    }
                },
                OrderAddress: true
            }
        })
        
        return order;

    } catch (error) {
        console.log(error);
        return null;
    }
}