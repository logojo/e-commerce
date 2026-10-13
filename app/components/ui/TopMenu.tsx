'use client' 

import { useEffect, useState } from 'react';
import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { useUIStore } from "@/app/store";
import { useCartStore } from "@/app/store/cart/cart-store";

export const TopMenu = () => {
  const { handleSideMenu } = useUIStore();

  const total = useCartStore( state => state.cart.reduce((total, item) => total + item.quantity, 0) );
  const hasHydrated = useCartStore((state) => state.hasHydrated);

 //* esperando el la sincronización de zustand con el server

  


  return (
    <nav className="flex px-5 py-2.5 justify-between items-center w-full">
        <div>
            <Link href='/'>
                <span className="font-title antialiased font-bold">Teslo</span>
                <span> | Shop</span>
            </Link>
        </div>

        <div className="hidden sm:block">
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 text-[13px] font-semibold" href="/category/men">Hombres</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 text-[13px] font-semibold" href="/category/women">Mujeres</Link>
            <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 text-[13px] font-semibold" href="/category/kid">Niños</Link>
        </div>

        <div className="flex items-center">
            <Link href="/search" className="mx-1">
                <IoSearchOutline className="w-5 h-5" />
            </Link>

            <Link href="/cart" className="mx-1">

                <div className="relative">
                   
                    {
                        total > 0  &&
                        (
                            <span className="absolute px-1 -top-1.5 -right-1.5 bg-blue-700 rounded-full text-white text-xs font-bold">
                            { total }
                            </span>
                        ) 
                    }
                    {
                        !hasHydrated && (
                           
                            <div className="absolute px-1 -top-1.5 -right-2.5">
                                <div className="p-1 size-2 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                            </div>
                            
                        )
                    } 
                    <IoCartOutline className="w-5 h-5" />
                </div>
            </Link>

            <button 
              onClick={ handleSideMenu }
              className="m-2 p-2 rounded-md transition-all hover:bg-gray-100 text-[13px] font-semibold"
            >
                Menú
            </button>
        </div>
      
    </nav>
  )
}
