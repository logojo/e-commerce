'use client'

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { IoChevronBack, IoChevronForward } from "react-icons/io5"


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
  }

  return (
    <div className="flex justify-center mb-6 space-x-2">
      <Link href={`/?page=${currenPage - 1}`}
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

      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1

        return (
          <Link
            key={pageNumber}
            href={`${path}?page=${pageNumber}`}
            className={
              clsx(
                "rounded border border-gray-300 px-2 hover:bg-gray-100 active:scale-90 active:bg-gray-200",{
                "bg-blue-500 border-blue-600 text-white": currenPage === pageNumber 
                }
              )}  
          >
            {pageNumber}
          </Link>
        )
      })}

      <Link href={`/?page=${currenPage + 1}`}
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

