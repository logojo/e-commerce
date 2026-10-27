import { Suspense } from "react";
import { OrderSkeleton, Title } from "@/app/components";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { ProductsToBuy } from "@/app/components/sale/ProductsToBuy";
import { DeliverAddress } from "@/app/components/sale/DeliverAddress";
import { OrderResume } from "@/app/components/sale/OrderResume";


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

  // todo: verificar usuario orden etc
  // redirect();

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
                'bg-amber-600' : false,
                'bg-green-600' : true
              }
            )
          }>
            <IoCardOutline  size={30}/>
            {/* <span className="mx-2">Pendiente de pago</span> */}
            <span className="mx-2">Pagada</span>
          </div>
        

          <ProductsToBuy />
        </div>

        {/* Checkout - Resumen de la orden */}
        <div className="rounded-xl shadow-xl p-7">
          <DeliverAddress />

          <div className="w-full h-0.5 rounded bg-gray-100 my-10" />

          <OrderResume />

          <div className="mt-5 mb-2">  

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-amber-600' : false,
                  'bg-green-600' : true
                }
              )
            }>
              <IoCardOutline  size={30}/>
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div> 
            
          </div>
        </div>

      </div>
    </>
  );
}