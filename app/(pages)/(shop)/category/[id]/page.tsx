import { notFound } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/app/components";
import { initialData } from "@/seed/seeder";
import { getPaginatedProductsWithImages } from "@/app/actions";


const products = initialData.products;

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
    id: Category;
  }>;

  searchParams: Promise<{
    page?: string;
    take?: string; 
  }>
}

export default async function({ params, searchParams } : Props ) {
  const { id } = await params;
  const queryParams = await searchParams;
  const page = queryParams.page ? parseInt(queryParams.page) : 1;
  const take = queryParams.take ? parseInt(queryParams.take) : 12;
  const pgender = id;

  //* validando que solo las rutas  validas solo sean las incluidas en validCategories
  if (!isCategory(id)) {
    notFound();
  }

  const { products, totalPages } = await getPaginatedProductsWithImages({page, take, pgender });

  return (
    <div className="px-1">
      <Title title={`Articulos para ${ validCategories[id] }`} subtitle="Todos los prod" />
      <ProductGrid products={ products } />
      <Pagination totalPages={ totalPages } />
    </div>
  );
}