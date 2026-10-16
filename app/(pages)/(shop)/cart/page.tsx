import { Title } from "@/app/components/ui/Title";

import { ProductsInCart } from "./ui/ProductsInCart";
import { ResumenOrder } from "./ui/ResumenOrder";

export default function() {
  
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-250 ">
          <Title title="Carrito" />

          <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-10">
            
            {/* Productos en carrito */}
            <ProductsInCart />
           

            {/* Checkout - Resumen de la orden */}
            <ResumenOrder />

          </div>
      </div>
    </div>
  );
}