
import { notFound } from "next/navigation";

import { initialData } from "@/app/seed/seed";
import { MobileSliceShow, QuantitySelector, SizeSelector, SliceShow } from "@/app/components";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function({ params } : Props) {
  const { slug } = await params;
  const product = initialData.products.find( product => product.slug === slug )

  if( !product ) {
    notFound();
  }
  return (
    <section className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">

        <MobileSliceShow 
            images={product.images} 
            title={ product.title }
            className="bock md:hidden"
        />

        <SliceShow 
            images={product.images} 
            title={ product.title } 
             className="hidden md:block"
          />
      </div>
      <div className="col-span-1 px-5">
        <h1 className="font-title antialiased font-bold text-lg">{ product.title}</h1>
        <p className="text-lg mb-5 text-end mt-2">$ { product.price.toFixed(2) }</p>

        {/* Selector de tallas */}
        <SizeSelector sizes={product.sizes} selectedSize="M" />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={1} />

        <button className="btn-primary my-5 cursor-pointer active:scale-90">
          Agregar al carrito
        </button>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light text-base md:text-sm text-justify">
          {  product.description }
        </p>
      </div>
    </section>
  );
}