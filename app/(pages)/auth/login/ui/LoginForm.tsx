'use client'

import { Suspense, useActionState, useEffect } from "react";
import { useSearchParams } from "next/navigation";


import Link from "next/link";
import { IoAlertCircle } from "react-icons/io5";
import { authenticate } from "@/app/actions/auth/login";

export default function  LoginForm() {
 
  return (
    <div>
        <Suspense fallback={<div
          className="min-h-40 animate-pulse rounded-xl bg-gray-100"
          aria-label="Cargando formulario de acceso"
        />}>
            <Form />
        </Suspense>
    </div>
  )
}


const Form = () => {
 const searchParams =  useSearchParams();
 const callbackUrl = searchParams.get('callbackUrl') || '/';
 const [status, formAction, isPending] = useActionState(
        authenticate,
        undefined,
  );

  useEffect(() => {
    if ( status?.success ) {
      window.location.replace('/');  //esto recarga la pagina y no se ve muy bonito
    }
  }, [status]);
  
  return (
    <form action={formAction} className="flex flex-col">

        <label htmlFor="email">Correo electrónico</label>
        <input
        className="px-5 py-2 border border-gray-300 bg-gray-200 rounded mb-5"
        name="email"
        type="email" />


        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border border-gray-300 bg-gray-200 rounded"
          name="password"
          type="password" 
        />

        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <div
            className="flex h-6 items-end space-x-0.5 mb-2"
            aria-live="polite"
            aria-atomic="true"
        >
            {status?.error && (
            <>
                <IoAlertCircle className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{status?.error}</p>
            </>
            )}
        </div>

        <button
            type="submit"
            className="btn-primary cursor-pointer active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
            aria-disabled={isPending}
            disabled={isPending}
        >
         {isPending ? "Ingresando..." : "Ingresar"}
        </button>
        
        <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
        href="/auth/new-account" 
        className="btn-secondary text-center active:scale-95">
        Crear una nueva cuenta
        </Link>

    </form>
  )
}


