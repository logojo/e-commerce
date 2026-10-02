import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/app/components";
import { initialData } from "@/app/seed/seed";

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
}

export default async function({ params } : Props ) {
  const { id } = await params;

  //* validando que solo las rutas  validas solo sean las incluidas en validCategories
  if (!isCategory(id)) {
    notFound();
  }

  const categoryProducts = products.filter(product => product.gender === id )

  return (
    <div>
      <Title title={`Articulos para ${ validCategories[id] }`} subtitle="Todos los prod" />
      <ProductGrid products={ categoryProducts } />
    </div>
  );
}