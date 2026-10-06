import { ProductGrid, Title } from "@/app/components";
import { initialData } from "@/app/seed/seeder";

const products = initialData.products;

export default function Home() {
  return (
    <div className="">
       <Title title="Tienda" subtitle="Todos los productos" />
       <ProductGrid products={ products } />
    </div>

  );
}
