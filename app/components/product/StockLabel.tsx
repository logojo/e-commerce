import { Suspense } from "react";
import { getProductStock } from "@/app/actions"


interface Props {
 slug: string;
}

export async function StockLabel({ slug } :Props ) {
  return (
     <Suspense fallback={<div>cargando...</div>}> 
        <Stock  slug={slug}/>
      </Suspense>
  )
}

async function Stock({ slug } : Props) {
 const stock = await getProductStock( slug )

 return <h1 className="font-title antialiased font-bold text-lg">Stock: { stock }</h1>
}




