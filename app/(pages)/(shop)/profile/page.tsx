import { redirect } from "next/navigation";
import { Title } from "@/app/components/ui/Title";
import { auth } from "@/auth.config";

export const instant = false

export default async function() {
const session = await auth();
  
 if( !session?.user ) {
    redirect('/')
 }

  return (
    <div className="h-screen">
      <Title 
        title="Perfil"
      />
      <pre className="mt-5 overflow-x-auto rounded-xl  border border-slate-700 bg-slate-900 p-5 text-sm leading-7 text-slate-100 shadow-lg">
        <code className="font-mono whitespace-pre">
        {

            JSON.stringify( session?.user, null, 2)
        }
        </code>
      </pre>
    </div>
  );
}