import { Suspense } from "react"
import { ProductDetailSkeleton, Title } from "@/app/components"
import { getCachedProductBySlug } from "@/lib/products/product-slug"
import { notFound } from "next/navigation"
import { ProductForm } from "./ui/ProductForm"
import { getCategories } from "@/app/actions/category/get-categories"


interface Props {
    params:  Promise<{
        slug: string
    }>
}

export default function({ params }: Props) {
  
    return (
    <>
      <Suspense fallback={<ProductDetailSkeleton />}>
        <section className="mt-5 mb-20">
              <ProductPage  params={params}/>
        </section>
      </Suspense>
    </>
    )
}



const ProductPage = async({ params }: Props) => {
    const { slug } = await params;

    const [product,  categories ] = await Promise.all([
            getCachedProductBySlug( slug ),
            getCategories(),
    ]);

  //todo: new
  if( !product && slug !== 'new' ) {
    notFound();
  }

  const title = (slug === 'new') ? 'Nuevo Producto' : 'Editar Producto'

  return (
    <div>
        <Title title={title} />
        <ProductForm product= { product ?? {} } categories={categories}/>
    </div>
  )
}

