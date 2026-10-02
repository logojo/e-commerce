'use client' 

import Link from "next/link"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"
import { useUIStore } from "@/app/store";

export const TopMenu = () => {
  const { handleSideMenu } = useUIStore();
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
                    <span className="absolute px-1 -top-1.5 -right-1.5 bg-blue-700 rounded-full text-white text-xs font-bold">
                        3
                    </span>
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
