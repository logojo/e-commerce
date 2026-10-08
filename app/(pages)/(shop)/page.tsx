import { Suspense } from "react";
import { Pagination, ProductGrid, ProductsSckeleton, Title } from "@/app/components";
import { redirect } from "next/navigation";
import { getCachedProducts } from "@/lib/products/products";

interface Props {
  searchParams: Promise<{
    page?: string;
    take?: string; 
  }>
}


export default async function Home({ searchParams }: Props) {
  return (
    <div className="px-1">
      <Title
        title="Tienda"
        subtitle="Todos los productos"
      />

      <Suspense fallback={<ProductsSckeleton />}>
        <Products
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

async function Products({searchParams} : Props) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const take = params.take ? parseInt(params.take) : 6;

  //tomando los productos de la funsión cacheada 
  const { products, totalPages  } = await getCachedProducts(page, take );

  if( products.length === 0 ) {
      redirect('/')
  }
 
  return (
    <>
      <ProductGrid products={ products } />
      <Pagination totalPages={totalPages} />
    </>
  );
}
