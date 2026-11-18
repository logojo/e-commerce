import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/auth/permissions';

import {  Pagination, Title } from '@/app/components';
import { Loader } from '@/app/components/ui/Loader';
import RowsTable from './ui/RowsTable';
import { getPaginatedProductsWithImages } from '@/app/actions';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{
    page?: string;
    take?: string; 
  }>
}


export default async function({ searchParams }: Props) {
 
  return (
    <>
      <Title title="Products" />

      <div className='flex justify-end mb-5'>
        <Link href='/products/new' className='btn-primary'>
          Nuevo producto
        </Link>
      </div>

      <Suspense fallback={<RowLoader />} >
        <TableUsers   searchParams={searchParams}/>
      </Suspense>
          
    </>
  );
}

const RowLoader = () => {
  return (
    <div>
      <div className='w-full h-10 p-5 text-center'>
            <div className='flex justify-center items-center'><Loader width='w-10' height='h-10' border='border-6' /></div>
      </div>
    </div>
  )
}


const TableUsers= async( {searchParams} : Props ) => {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const take = params.take ? parseInt(params.take) : 10;

  const result = await requireAdmin();

  if (!result.authorized) {
    if (result.status === 401) {
      redirect("/auth/login");
    }

    redirect("/");
  }

  const { products = [], totalPages } = await getPaginatedProductsWithImages({page, take});
  
  return ( 
  <>
    <RowsTable products={products}  />
    <Pagination totalPages={totalPages} />
  </>
  )
  
}


