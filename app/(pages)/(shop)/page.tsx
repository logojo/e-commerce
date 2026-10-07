import { Pagination, ProductGrid, Title } from "@/app/components";
import { getPaginatedProductsWithImages } from "@/app/actions/products/product-pagination";
import { redirect } from "next/navigation";


interface Props {
  searchParams: Promise<{
    page?: string;
    take?: string; 
  }>
}

export default async function Home({searchParams} : Props) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const take = params.take ? parseInt(params.take) : 12;

  const { products, totalPages } = await getPaginatedProductsWithImages({page, take });

  if( products.length === 0 ) {
      redirect('/')
  }
 
  return (
    <div className="">
       <Title title="Tienda" subtitle="Todos los productos" />
       <ProductGrid products={ products } />
       <Pagination totalPages={ totalPages } page={page} path="/"/>
    </div>

  );
}
