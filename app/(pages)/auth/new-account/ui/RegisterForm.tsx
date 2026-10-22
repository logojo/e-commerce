'use client'

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form";
import { registerUser } from "@/app/actions/auth/register";
import { login } from '@/app/actions/auth/login';
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

type FormInputs = {
  name: string
  email: string
  password: string
}

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;



export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string|null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting },  } = useForm<FormInputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> =  async (data) => {
    setErrorMessage(null)
    const { name, email, password } = data

    const res = await registerUser( name, email, password );

    if( !res.ok ) {
        setErrorMessage(res.message!)
        return;
    }

    await login(email, password)
    
    window.location.replace('/');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

        <div className="mb-4">
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

        <div className="mb-4">
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

        <div className="mb-4">
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

        <span className="text-red-500 text-sm">{errorMessage}</span>

        <button
            className="btn-primary cursor-pointer active:scale-95"
            type="submit"
            disabled={isSubmitting}
            >
            { !isSubmitting ?  'Crear cuenta' : 'Enviado...' }
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
