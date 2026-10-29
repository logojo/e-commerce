'use server'

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import type { Address, ValidSizes } from "@/app/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
    productId: string
    quantity: number, 
    size: ValidSizes;
}

export const placeOrder = async( pendingOrder : ProductToOrder[], address: Address ) => {
    

    const session = await auth.api.getSession({
        headers: await headers() 
    })

    if( !session?.user.id ){
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: pendingOrder.map( p => p.productId )
            }
        }
    })

    
    //total de items
    const itemsInOrder =  pendingOrder.reduce((count, p) => count + p.quantity, 0);


    //calcular montos
    const { subtotal, tax, total } = pendingOrder.reduce((totals, item) => {
        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);
        
        if( !product ) throw new Error(`${ item.productId } no existe`)
        

        const subtotal = product.price * productQuantity;
        const tax = (subtotal * 0.16);
        const total = (subtotal + tax);

        totals.subtotal += subtotal;
        totals.tax += tax;
        totals.total += total;

        return { subtotal: totals.subtotal, tax: totals.tax, total: totals.total }
    }, { subtotal: 0, tax: 0, total: 0});

    //transaccion

    
    
    try { 
        
        const prismaTx = await prisma.$transaction( async(tx) => {
            // 1.actualizar el stock de los productos


            const updatedProductsPromises = products.map( async(product) => {

                //Extrayendo la cantidad de el producto, se usa reduce por si existe mas de 1
                const productQuantity =  pendingOrder.filter( item => item.productId === product.id)
                                                    .reduce((acc, item) => item.quantity + acc, 0);

                if( productQuantity == 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`) ;
                }

                return tx.product.update({
                    where: {id: product.id },
                    data: { 
                        inStock: {
                            decrement: productQuantity
                        } 
                    }
                });
            })

            const updatedProducts = await Promise.all( updatedProductsPromises );
           
            

            //comprobando si existen inStock negativo
            updatedProducts.forEach( product => {                
                if( product.inStock < 0 ) {
                    throw new Error(`${product.title}  no tiene suficiente existencia`) ;
                }
            })



            // 2. Crear la orden y detalle
            const order = await tx.order.create({
                data: {
                    subTotal: subtotal,
                    tax: tax,
                    total: total,
                    itemsInOrder,
                    userId: session.user.id,

                    OrderItem: {
                        createMany: {
                            data: pendingOrder.map( item => ({
                                quantity: item.quantity,
                                price: products.find(product => product.id === item.productId)!.price,
                                size: item.size,
                                productId: item.productId
                            }))
                        }
                    }
                }
            })
            
            const { country, ...rest } = address;

            const deliveryAddress = await tx.orderAddress.create({
                data: {
                    ...rest,
                    countryId: country,      
                    orderId: order.id,
                }
            });


            // 3. Crear la direccion de la orden

            return {
                updatedProducts,
                order,
                deliveryAddress
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx,
        };


    } catch (error: any) {
        
        return {
            ok: false,
            message: error?.message
        }
    }
}