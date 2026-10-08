import { notFound } from "next/navigation";
import { Pagination, ProductGrid, ProductsSckeleton, Title } from "@/app/components";
import { getCachedProducts } from "../../../../../lib/products/products";
import { Suspense } from "react";


const validCategories = {
  men: "Hombres",
  women: "Mujeres",
  kid: "Niños",
} as const;

type Category = keyof typeof validCategories;

function isCategory(value: string): value is Category {
  return value in validCategories;
}

interface Props {
  params: Promise<{
    gender: Category;
  }>;

  searchParams: Promise<{
    page?: string;
    take?: string; 
  }>
}

export default async function({ params, searchParams }: Props) {
  return (
    <div className="px-1">
      <Suspense fallback={<ProductsSckeleton />}>
        <ProductsGender
         params={params}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}

async function ProductsGender({ params, searchParams } : Props ) {
  const { gender } = await params;
  const queryParams = await searchParams;

  const page = queryParams.page ? parseInt(queryParams.page) : 1;
  const take = queryParams.take ? parseInt(queryParams.take) : 12;

  //* validando que solo las rutas  validas solo sean las incluidas en validCategories
  if (!isCategory(gender)) {
    notFound();
  }

  //tomando los productos de la funsión cacheada 
  const { products,totalPages  } = await getCachedProducts(page, take, gender);

  return (
    <>
      <Title title={`Articulos para ${ validCategories[gender] }`} subtitle="Todos los prod" />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </>
  );
}