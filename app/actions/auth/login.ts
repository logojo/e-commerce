'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

export type LoginState = {
  error?: string;
  success?: boolean;
};

//*redirección automatica gestionada por nextAuth

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }
 

//* redirección manual para poder manejar sessión del lado del cliente.
 
export async function authenticate( prevState: LoginState | undefined,
  formData: FormData,
): Promise<LoginState>  {
  try {
    
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: true, // si lo pongo el false puedo manejar la redirección manual si no al ingresar next-auth maneja las redirecciones
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Credenciales incorrectas." };
      }

      return { error: "Ocurrió un error al iniciar sesión." };
    }

    throw error;
  }
}

//logueo de usuario a traves de registro
export const login = async( email: string , password: string) => {
  try {
     await signIn("credentials", {
      email,
      password,
    });

    return {
      ok: true
    }
  } catch (error) {
    
    return {
      ok: false,
      message: 'no se pudo iniciar sesión'
    }
  
  }
}