'use client'

import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"
import { useUIStore } from "@/app/store";
import clsx from "clsx";

export const Sidebar = () => {
  const { isSideMenuOpen, handleSideMenu } = useUIStore();

  return (
    <div> 
      {
          isSideMenuOpen && (
              <>
              {/* black background   */}
                <div 
                    className="
                        fixed
                        top-0
                        left-0
                        w-screen
                        h-screen
                        z-10
                        bg-black
                        opacity-30
                    "
                    />

                    {/* Blur   */}
                    <div 
                        onClick={handleSideMenu}
                        className="
                            fade-in
                            fixed
                            top-0
                            left-0
                            w-screen
                            h-screen
                            z-10
                            backdrop-blur-xs
                        "
                    />
            </>
        )
      }


      {/* Sidenav */}
      <nav 
       className={ clsx (
        "fixed p-5 right-0 top-0 w-100 h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 ease-in",
        {
            "translate-x-full": !isSideMenuOpen
        }) }
      >
            <IoCloseOutline  
                size={50} 
                className="absolute top-5 right-5 cursor-pointer active:scale-90 rotate-0 transform transition-all duration-300 ease-in"
                onClick={ handleSideMenu }
            />

            <div className="relative mt-14">
                <IoSearchOutline size={20} className="absolute top-2 left-2" />
                <input
                    type="text"
                    placeholder="Buscar.."
                    className="w-full bg-gray-50 rounded pl-10 py-1.5 border-b text-md border-gray-200 focus:outline-none focus:border-blue-300"
                />
            </div>

            <Link href="/" className="flex items-center gap-2 mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoPersonOutline size={18} />
                <span>Perfil</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoTicketOutline size={18} />
                <span>Ordenes</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoLogInOutline size={18} />
                <span>Ingresar</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoLogOutOutline size={18} />
                <span>Salir</span>
            </Link>

            <div  className="w-full h-px bg-gray-200 my-10"/>

            <Link href="/" className="flex items-center gap-2 mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoShirtOutline size={18} />
                <span>Productos</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoTicketOutline size={18} />
                <span>Ordenes</span>
            </Link>

            <Link href="/" className="flex items-center gap-2 mt-10 p-2 hover:bg-gray-100 rounded transition-all">
                <IoPeopleOutline size={18} />
                <span>Usuarios</span>
            </Link>
      </nav>


    </div>
  )
}


