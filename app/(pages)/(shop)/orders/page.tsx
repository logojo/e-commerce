

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

import { Title } from '@/app/components';
import { getOrders } from '@/app/actions/order/get-orders';
import clsx from 'clsx';
import { Suspense } from 'react';
import { Loader } from '@/app/components/ui/Loader';

export default async function() {
  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b border-b-gray-400">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #ID
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>           
            <Suspense fallback={<RowLoader />} >
              <TableOrders />
            </Suspense>
          </tbody>
        </table>
      </div>
    </>
  );
}



const RowLoader = () => {
  return (
    <tr>
      <td colSpan={5} className='w-full h-10 p-5 text-center'>
            <div className='flex justify-center items-center'><Loader width='w-10' height='h-10' border='border-6' /></div>
      </td>
    </tr>
  )
}


const TableOrders = async() => {
  const orders = await getOrders();

  return (
    <>
    {
        orders.length === 0 
        ? (
          <tr>
          <td colSpan={5} className='w-full h-10 p-5 text-center'>
                <div className='flex justify-center items-center text-red-600'>No existen ordenes</div>
          </td>
        </tr>
        )
        :
        orders.map( order => (
          <tr key={order.id} className="bg-white border-b border-b-gray-300 transition duration-300 ease-in-out hover:bg-gray-100 fade-in">

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ order.id.split('-').at(-1) }</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              { order.OrderAddress?.firstName } { order.OrderAddress?.lastName }
            </td>
            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

              
              <IoCardOutline className={
                clsx(
                  'mx-2', {
                    'text-green-800': order.isPaid,
                    'text-orange-800': !order.isPaid
                  }
                )
              }/>
              <span className={
                clsx(
                  'mx-2', {
                    'text-green-800': order.isPaid,
                    'text-orange-800': !order.isPaid
                  }
                )
              }>{ order.isPaid ? 'Pagada' : 'Pendiente de pago'}</span>

            </td>
            <td className="text-sm text-gray-900 font-light px-6 ">
              <Link href={`/orders/${order.id}`} className="hover:underline">
                Ver orden
              </Link>
            </td>

          </tr>
        ))
    }
    </>
  )
}


