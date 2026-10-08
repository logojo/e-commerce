import { cacheLife, cacheTag } from "next/cache";
import { getPaginatedProductsWithImages } from "@/app/actions";

export async function getCachedProducts(
  page: number,
  take: number,
  gender?: "men" | "women" | "kid"
) {
  "use cache";

  //cacheando el resultado de la consulta y manteniendolo 60 segundos
  cacheLife({
    stale: 60,
    revalidate: 60,
    expire: 60,
  });

  //con este tag puedo invalidar por gender así revalidateTag("products-men", "max"); o todos los productos así revalidateTag("products", "max");
  cacheTag(
    "products",
    `products-${gender}`
  );

  return getPaginatedProductsWithImages({
    page,
    take,
    gender,
  });
}