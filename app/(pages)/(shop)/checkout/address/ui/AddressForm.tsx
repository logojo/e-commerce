'use client'

import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';

import { Country } from '@/generated/prisma/client';

import { deleteUserAddress, setUserAddress } from '@/app/actions/address/set-user-address';
import { useAddresStore } from '@/app/store/address/address-store';

import type { Address } from '@/app/interfaces';
import { User } from 'better-auth';
import { Loader } from '@/app/components/ui/Loader';

type FormInputs = {
    firstName:     string;
    lastName:      string;
    address:       string;
    address2?:     string;
    postalCode:    string;
    city:          string;
    country:       string;
    phone:         string;
    remeberAddress?: boolean;

}

interface Props {
    countries: Country[];
    user: User 
    userAddress?: Partial<Address>
}

export const AddressForm = ({countries, user, userAddress = {}} : Props) => {
    const router = useRouter();

    const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm<FormInputs>({
        defaultValues: { 
            ...userAddress,
            remeberAddress: false
        },
    });
    
    const { deliverInfo, setDeliverInfo } = useAddresStore();


    const onSubmit = async( data: FormInputs ) => {
        const { remeberAddress, ...rest } = data;
        console.log('rest', rest);
        
        setDeliverInfo(rest);

        if( remeberAddress ) {
            await setUserAddress(data, user.id)  
        }else {
            await deleteUserAddress( user.id );
        }


        router.push('/checkout')
    }

    // const onSaveAddress = async( remember: boolean) => {
        
    //     if( remember ) {
              //* getValues() es una función de useForm para obtener los valores actuales del form
    //         await setUserAddress(getValues(), user.id)
    //         return;
    //     }

    //     await deleteUserAddress(  user.id );
    // }


  useEffect(() => {
      if( deliverInfo.firstName ) {
          reset(deliverInfo)
      }
  }, [deliverInfo])
  

  return (
    <form onSubmit={handleSubmit( onSubmit )} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">

        <div className="flex flex-col mb-2">
            <span>Nombres</span>
            <input 
             type="text" 
             className="p-2 border border-gray-300 rounded-md bg-gray-200"
              {...register("firstName", { required: "first name is required" }) }
            />
            {errors.firstName && <span className="text-rose-700 text-xs">{errors.firstName.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
            <span>Apellidos</span>
            <input 
             type="text" 
             className="p-2 border border-gray-300 rounded-md bg-gray-200"
             {...register("lastName", { required: "last name is required" }) }
            />
            {errors.lastName && <span className="text-rose-700 text-xs">{errors.lastName.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
            <span>Dirección</span>
            <input 
             type="text" 
             className="p-2 border border-gray-300 rounded-md bg-gray-200"
             {...register("address", { required: "address is required" }) }
            />
            {errors.address && <span className="text-rose-700 text-xs">{errors.address.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
            <span>Dirección 2 (opcional)</span>
            <input 
             type="text" 
             className="p-2 border border-gray-300 rounded-md bg-gray-200"
             {...register("address2") }
            />
        </div>


        <div className="flex flex-col mb-2">
            <span>Código postal</span>
            <input 
             type="text" 
             className="p-2 border border-gray-300 rounded-md bg-gray-200"
             {...register("postalCode", { required: "postal code is required" }) }
            />
            {errors.postalCode && <span className="text-rose-700 text-xs">{errors.postalCode.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
            <span>Ciudad</span>
            <input 
             type="text" 
             className="p-2 border border-gray-300 rounded-md bg-gray-200"
             {...register("city", { required: "city  is required" }) }
            />
            {errors.city && <span className="text-rose-700 text-xs">{errors.city.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
            <span>País</span>
            <select 
            className="p-2 border border-gray-300 rounded-md bg-gray-200"
             {...register("country", { required: "country is required" }) }
            >
            <option value="">[ Seleccione ]</option>
            {
                countries.map(country => (
                     <option key={country.id} value={ country.id }>{country.name}</option>
                ))
            }
            </select>
            {errors.country && <span className="text-rose-700 text-xs">{errors.country.message}</span>}
        </div>

        <div className="flex flex-col mb-2">
            <span>Teléfono</span>
            <input 
            type="text" 
            className="p-2 border border-gray-300 rounded-md bg-gray-200"
             {...register("phone", { required: "phone is required" }) }
            />
            {errors.phone && <span className="text-rose-700 text-xs">{errors.phone.message}</span>}
        </div>

        <div className='flex flex-col'>
            <div className="inline-flex items-center mb-1">
                <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="checkbox"
                >
                    <input
                        type="checkbox"
                        className=" border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                        id="checkbox"    
                        {...register("remeberAddress",) }  
                        // onChange={(event) => onSaveAddress(event.target.checked)}       
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </label>
                <span>¿Recordar dirección?</span>
            </div>
        </div>



        <div className="col-span-1 sm:col-span-2  mb-2 sm:mt-10">
            <button 
             type='submit'
             className="btn-primary flex items-center gap-2 w-full sm:w-1/2 justify-center active:scale-95 "
             disabled={isSubmitting}
            >
            { isSubmitting && <Loader />
            }
             <span>Siguiente</span>
            </button>
        </div>


        </form>
)
}


