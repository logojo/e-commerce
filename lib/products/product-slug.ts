import { getProductBySlug } from "@/app/actions";
import { cacheLife, cacheTag } from "next/cache";

export async function getCachedProductBySlug( slug: string) {
    "use cache"

    cacheLife({
        stale: 604800, // 7 días
        revalidate: 604800,
        expire: 604800,
    });

    //con este tag puedo invalidar por gender así revalidateTag("products-men", "max"); o todos los productos así revalidateTag("products", "max");
    cacheTag( `product-${slug}`);

    return getProductBySlug( slug )
}
