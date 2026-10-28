import { Suspense } from "react";
import { OrderSkeleton, Title } from "@/app/components";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { getOrder } from "@/app/actions/order/get-order";
import { redirect } from "next/navigation";
import { ProductsToOrder } from "./ui/ProductsToOrder";
import { DeliverInfo } from "./ui/DeliverInfo";



interface Props {
  params: Promise<{
    id: string;
  }>;
}


export default async function({ params } : Props ) {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250 ">
        <Suspense fallback={<OrderSkeleton />}>
          <Orden params={params} />
        </Suspense>
      </div>
    </div>
  )
}

async function Orden({ params } : Props ) {
  const { id } = await params;
  const res = await getOrder( id );

  if( !res ) {
     redirect('/');
  }
  
 const { OrderAddress, OrderItem, ...order } = res;

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
  


  return (
    <>
      <Title title={`Orden #${ id }`} />

      <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-10">
        
        {/* Productos en carrito */}
        <div className="flex flex-col mt-5">
          <div className={
            clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
              {
                'bg-amber-600' : !order.isPaid,
                'bg-green-600' : order.isPaid 
              }
            )
          }>
            <IoCardOutline  size={30}/>
            {
              order.isPaid 
              ? (<span className="mx-2">Pagada</span>)
              : (<span className="mx-2">Pendiente de pago</span>)
            }
            
            
          </div>
        

          <ProductsToOrder products={products} />
        </div>

        {/* Checkout - Resumen de la orden */}
        <div className="rounded-xl shadow-xl p-7">
         

          <div className="mt-5 mb-2">  

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-amber-600' : !order.isPaid ,
                  'bg-green-600' : order.isPaid 
                }
              )
            }>
              <IoCardOutline  size={30}/>
              {
                order.isPaid 
                ? (<span className="mx-2">Pagada</span>)
                : (<span className="mx-2">Pendiente de pago</span>)
              }
            </div> 
            
          </div>

          <DeliverInfo
            deliverInfo={address}
            iva={order.tax}
            subtotal={order.subTotal}
            totalProducts={order.itemsInOrder}
            total={order.total}
          />
        </div>

      </div>
    </>
  );
}