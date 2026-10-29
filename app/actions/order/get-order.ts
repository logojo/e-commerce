'use server'

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";


export const getOrder = async( orderId: string ) => {

    try {    
        const session = await auth.api.getSession({
            headers: await headers() 
        })

        const pendingOrder = await prisma.order.findUnique({
            where: { 
                id: orderId,
                ...(session?.user.role !== 'admin' &&{
                    userId : session?.user.id
                })
            },
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
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                },
                OrderAddress: true
            }
        })

        if(!pendingOrder) return null;

        const { OrderAddress, OrderItem, ...order } = pendingOrder;

        const products = OrderItem.map( item => ({
            id: item.id,
            slug: item.product.slug,
            title: item.product.title,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            image: item.product.productImages[0].url,
        }))

        const address = {
            firstName:     OrderAddress!.firstName,
            lastName:      OrderAddress!.lastName,
            address:       OrderAddress!.address,
            address2:      OrderAddress?.address2 ?? '',
            postalCode:    OrderAddress!.postalCode,
            city:          OrderAddress!.city,
            country:       OrderAddress!.countryId,
            phone:         OrderAddress!.phone,
        }
                
        return {
            order,
            products,
            address
        };

    } catch (error) {
        console.log(error);
        return null;
    }
}