'use client'

import { Product } from "@/app/interfaces"
import { currencyFormat } from "@/app/utils"
import Image from "next/image"
import Link from "next/link"



interface Props {
    products: Product[]
}

const RowsTable = ({ products } : Props ) => {

  return (
  
      <div className="mb-10">
             <table className="min-w-full">
               <thead className="bg-gray-200 border-b border-b-gray-400">
                 <tr>
                   <th scope="col" className="text-sm font-medium py-4 px-3 text-gray-900  text-left">
                     Imagen
                   </th>
                   <th scope="col" className="text-sm font-medium py-4 px-3 text-gray-900  text-left">
                     ID
                   </th>
                   <th scope="col" className="text-sm font-medium py-4 px-3 text-gray-900  text-left">
                     Título
                   </th>
                   <th scope="col" className="text-sm font-medium py-4 px-3 text-gray-900  text-left">
                     Genero
                   </th>
                   <th scope="col" className="text-sm font-medium py-4 px-3 text-gray-900  text-left">
                     Stock
                   </th>
                   <th scope="col" className="text-sm font-medium py-4 px-3 text-gray-900  text-left">
                     Precio
                   </th>
                   <th scope="col" className="text-sm font-medium py-4 px-3 text-gray-900  text-left">
                     Tallas
                   </th>
                 </tr>
               </thead>
               <tbody>        
                {
                    products.length === 0 
                    ? (
                    <tr>
                    <td colSpan={5} className='w-full h-10 p-5 text-center'>
                            <div className='flex justify-center items-center text-red-600'>No existen productos</div>
                    </td>
                    </tr>
                    )
                    :
                    products.map( product => (
                    <tr key={product.id} className="bg-white border-b border-b-gray-300 transition duration-300 ease-in-out hover:bg-gray-100 fade-in">
                        <td className=" whitespace-nowrap text-sm font-medium text-gray-900">
                           <Link href={`/product/${product.slug}`}>
                              <Image
                                src={`/products/${product.images[0]}`}
                                alt={product.title}
                                width={50}
                                height={50}
                                loading="eager"
                                className="mr-5 rounded"
                                style={{
                                  width: '50px',
                                  height: '50px'
                                }}
                              />
                              </Link>
                        </td>
                        <td className=" whitespace-nowrap text-sm font-medium text-gray-900">{ product.id.split('-').at(-1) }</td>
                        <td className="text-sm text-gray-900 font-light  whitespace-nowrap">
                        <Link href={`/products/${product.slug}`} className="hover:underline">
                          { product.title }
                        </Link>
                        </td>
                        <td className="text-sm text-gray-900 font-light  whitespace-nowrap">
                        { product.gender }
                        </td>
                        <td className="text-sm text-gray-900 font-light  whitespace-nowrap">
                        { product.inStock }
                        </td>
                        <td className="text-sm text-gray-900 font-bold  whitespace-nowrap">
                         {  currencyFormat(product.price) }
                        </td>
                        <td className="text-sm text-gray-900 font-light ">{product.sizes.join(', ')}</td>
                    </tr>
                    ))
                }
        </tbody>
        </table>
      </div>
  )
}

export default RowsTable
