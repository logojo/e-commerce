import clsx from "clsx";
import Link from "next/link"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"


interface Props {
  totalPages: number;
  page: number;
  path: string;
}


export const Pagination = ({ totalPages, page, path }: Props) => {
  return (
    <div className="flex justify-center mb-6 space-x-2">
      <Link href={`/?page=${page - 1}`}
          className={
            clsx(
              "flex items-center rounded border border-gray-300 px-2 hover:bg-gray-100 active:scale-90 active:bg-gray-200",
              {
                 "pointer-events-none opacity-30": page === 1
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
                "bg-blue-500 border-blue-600 text-white": page === pageNumber 
                }
              )}  
          >
            {pageNumber}
          </Link>
        )
      })}

      <Link href={`/?page=${page + 1}`}
          className={
            clsx(
              "flex items-center rounded border border-gray-300 px-2 hover:bg-gray-100 active:scale-90 active:bg-gray-200",
              {
                 "pointer-events-none opacity-30": page === totalPages
              }
            )}
       >
        <IoChevronForward className="h-4 w-4" />
      </Link>
    </div>
  )
}

