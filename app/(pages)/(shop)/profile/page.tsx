import { Title } from "@/app/components";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";

export default async function () {
   

   return (
    <div className="h-screen">
      <Title 
        title="Perfil"
      />
      <Suspense fallback={<p className="text-center text-sm text-gray-500">Cargando...</p>}>
        <ViewProfile />
      </Suspense>
    </div>
   )
}
     


const ViewProfile = async() => {
 const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
  
  return (
     <pre className="mt-5 overflow-x-auto rounded-xl  border border-slate-700 bg-slate-900 p-5 text-sm leading-7 text-slate-100 shadow-lg">
        <code className="font-mono whitespace-pre">
        {

            JSON.stringify( session?.user, null, 2)
        }
        </code>
      </pre>
  )
}

