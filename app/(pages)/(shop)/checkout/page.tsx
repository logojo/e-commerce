import Link from "next/link";

import { Title } from "@/app/components";
import { ProductsToBuy } from "../../../components/sale/ProductsToBuy";
import { OrderResume } from "../../../components/sale/OrderResume";

export default function() {
  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250 ">
          <Title title="Verificar orden" />

          <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-10">
            
            {/* Productos en carrito */}
            <div className="flex flex-col mt-5">
              <span className="text-xl">Ajustar articulos</span>
              <Link href="/cart" className="underline mb-5">
                Editar carrito
              </Link>

              <ProductsToBuy />
           
            </div>

            {/* Checkout - Resumen de la orden */}
            <OrderResume />

          </div>
      </div>
    </div>
  );
}