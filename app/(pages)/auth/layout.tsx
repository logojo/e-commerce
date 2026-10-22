import { Suspense } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/auth.config";
import Loading from "@/app/loading";

export const instant = false;

export default async function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {

  return (
    <main className="flex justify-center">
      <Suspense fallback={<Loading />}>
        <AuthGuard>{children}</AuthGuard>
      </Suspense>
    </main>
  );
}

async function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if( session?.user) {
    redirect('/')
  }

  return (
        <div className="w-full sm:w-87.5 px-10">
          { children }
        </div>
      )
}
