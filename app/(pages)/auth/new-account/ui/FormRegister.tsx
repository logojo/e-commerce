'use client'

import type { SubmitEvent } from 'react'
import { useUIStore } from "@/app/store";
import Link from "next/link"
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const FormRegister = () => {
  const router = useRouter();
  const { loading, error, handleloading, handleError } = useUIStore();

  const handleSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const name = formData.get("name") as string;
          const email = formData.get("email") as string;
          const password = formData.get("password") as string;

        const { data, error } = await authClient.signUp.email({
                email, // user email address
                password, // user password -> min 8 characters by default
                name, // user display name
                callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
            }, {
                onRequest: (ctx) => {
                   handleloading()
                   handleError(null)
                },
                onSuccess: (ctx) => {
                    handleloading()
                    router.push('/auth/verify-email')
                },
                onError: (ctx) => {
                   console.log('error');
                   
                   handleloading()
                   handleError(ctx.error.message);
                },
        });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">

        <label htmlFor="name">Nombre completo</label>
        <input
          className="px-5 py-2 border border-gray-300 bg-gray-200 rounded mb-5"
          type="text" 
          name='name'
          required
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border border-gray-300 bg-gray-200 rounded mb-5"
          type="email" 
          name='email'
          required
        />


        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border border-gray-300 bg-gray-200 rounded mb-5"
          type="password"
          name='password'
          required
        />

        <span className='text-xs text-red-500'>{ error }</span>
        <button
          type='submit'
          className="btn-primary cursor-pointer active:scale-95"
          disabled={loading}
          >
          { loading ? 'Creando...' : 'Crear'}
        </button>


        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center active:scale-95">
          ¿Ya tiene cuenta?
        </Link>

      </form>
  )
}

export default FormRegister
