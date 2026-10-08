'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5"
import clsx from "clsx";

import { generatePagination } from "@/app/utils";


interface Props {
  totalPages: number;
}


export const Pagination = ({ totalPages }: Props) => {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currenPage = Number( searchParams.get('page')  ) || 1;

  const createPageUrl = ( pageNumber: number | string ) => {
    const params = new URLSearchParams( searchParams );    
    
    if ( pageNumber === '...')  {
      return `${ pathname}?${ params.toString() }`
    }

    if( +pageNumber  <= 0 ) { //href="men"
       return `${ pathname }`
    }

    if( +pageNumber  > totalPages ) {
        return `${pathname}?${params.toString()}` //ruta en la que nos encontramos
    }

    params.set('page', pageNumber.toString())
    return `${ pathname }?${ params.toString() }`
  }

  return (
    <div className="flex justify-center mb-6 space-x-2">
      <Link href={createPageUrl( currenPage - 1 )}
          className={
            clsx(
              "flex items-center rounded border border-gray-300 px-2 hover:bg-gray-100 active:scale-90 active:bg-gray-200",
              {
                 "pointer-events-none opacity-30": currenPage === 1
              }
            )}
       >
        <IoChevronBack className="h-4 w-4" />
      </Link>

      {
        generatePagination(currenPage, totalPages).map( (page, index) => {
        
          return (
            <Link
              key={page +'-'+index }
              href={ createPageUrl( page ) }
              className={
                clsx(
                  "rounded border border-gray-300 px-2 hover:bg-blue-600 hover:text-white active:scale-90 active:bg-gray-200",{
                  "bg-blue-500 border-blue-600 text-white": currenPage === page 
                  }
                )}  
            >
              {page}
            </Link>
          )
        })}

      <Link href={createPageUrl( currenPage + 1 )}
          className={
            clsx(
              "flex items-center rounded border border-gray-300 px-2 hover:bg-gray-100 active:scale-90 active:bg-gray-200",
              {
                 "pointer-events-none opacity-30": currenPage === totalPages
              }
            )}
       >
        <IoChevronForward className="h-4 w-4" />
      </Link>
    </div>
  )
}

