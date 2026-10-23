'use client'
import type { SubmitEvent } from 'react'
import Link from 'next/link'

import { authClient } from '@/lib/auth-client'
import { useUIStore } from '@/app/store'
import { useState } from 'react';

const LoginForm = () => {
    const { loading, error, handleloading, handleError } = useUIStore();

    const handleSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const { data, error } = await authClient.signIn.email({
            email, // user email address
            password, // user password -> min 8 characters by default
            callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
            rememberMe: false
        }, {
            onRequest: (ctx) => {
                handleloading()
                handleError(null)
                //show loading
            },
            onSuccess: (ctx) => {
                handleloading()
                //redirect to the dashboard or sign in page
            },
            onError: (ctx) => {
                // display the error message
                handleloading()
                handleError(ctx.error.message);
            },
    });


    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">

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
          type="submit"
          disabled={loading}
          className="btn-primary cursor-pointer active:scale-95">
          { loading ? 'Ingresando...' : 'Ingresar' }
        </button>


        {/* divisor l ine */ }
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

export default LoginForm
