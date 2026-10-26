'use client'

import type { SubmitEvent } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation';

import { SubmitHandler, useForm } from "react-hook-form";

import { authClient } from '@/lib/auth-client';
import { useUIStore } from "@/app/store";
import clsx from 'clsx';

type FormInputs = {
  name: string
  email: string
  password: string
}

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;


const FormRegister = () => {
    const router = useRouter();
    const { loading, error, handleloading, handleError } = useUIStore();
    const { register, handleSubmit, formState: { errors }  } = useForm<FormInputs>();


    const onSubmit: SubmitHandler<FormInputs> =  async (formData) => {
      const { name, email, password } = formData

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
                handleloading()
                handleError(ctx.error.message);
            },
      });

     
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

          <div className="mb-4 flex flex-col">
            <label htmlFor="name">Nombre completo</label>
            <input
                className={clsx(
                    "px-5 py-2 border border-gray-300 bg-gray-200 rounded", {
                        'border-red-500': errors.name
                    }
                )}
                type="text" 
                autoFocus
                {...register("name", { required: "name is required" }) }
            />
            {errors.name && <span className="text-rose-700 text-xs">{errors.name.message}</span>}
          </div>

          <div className="mb-4 flex flex-col">
              <label htmlFor="email">Correo electrónico</label>
              <input
                  className={clsx(
                      "px-5 py-2 border border-gray-300 bg-gray-200 rounded", {
                          'border-red-500': errors.email
                      }
                  )}
                  type="email"
                  {...register("email",{ required: "Email Address is required", pattern: {value: EMAIL_REGEX, message: "Invalid email"}})}                
              />
              {errors.email && <span className="text-rose-700 text-xs">{errors.email.message}</span>}
          </div>


          <div className="mb-4 flex flex-col">
              <label htmlFor="email">Contraseña</label>
              <input
                  className={clsx(
                      "px-5 py-2 border border-gray-300 bg-gray-200 rounded", {
                          'border-red-500': errors.password
                      }
                  )}
                  type="password" 
                  {...register("password", { required: "password is required", minLength: { value: 8, message: "Min length is 8" }})}
              />
              {errors.password && <span className="text-rose-700 text-xs">{errors.password.message}</span>}
          </div>


        <span className='text-xs text-red-500'>{ error }</span>

        <button
          type='submit'
          className="btn-primary cursor-pointer active:scale-95"
          disabled={loading}
          >
          { loading ? 'Creando...' : 'Crear'}
        </button>


        {/* divisor line */ }
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
