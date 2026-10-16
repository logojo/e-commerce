
import { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { MobileSliceShow, SliceShow, StockLabel } from "@/app/components";
import { ProductDetailSkeleton } from "@/app/components";
import { getCachedProductBySlug } from "@/lib/products/product-slug";
import AddToCart from "./ui/AddToCart";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params } : Props): Promise<Metadata> {
  const slug = (await params).slug
 
  const product = await getCachedProductBySlug( slug )
 
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`]
    }
  }
}


export default async function({ params } : Props) {

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <section className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Product  params={params}/>
      </section>
    </Suspense>
  )
}

async function Product({ params } : Props) {
  const { slug } = await params;
  const product = await getCachedProductBySlug( slug )

  if( !product ) {
    notFound();
  }
  
  return (
    <>
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
        <StockLabel slug={product.slug } />
        <h1 className="font-title antialiased font-bold text-lg">{ product.title}</h1>
        <p className="text-lg mb-5 text-end mt-2">$ { product.price.toFixed(2) }</p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light text-base md:text-sm text-justify">
          {  product.description }
        </p>
      </div>

    </>
  );
}