

import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { requireAdmin } from '@/lib/auth/permissions';

import {  Pagination, Title } from '@/app/components';
import { Loader } from '@/app/components/ui/Loader';
import { getUsers } from '@/app/actions/users/get-users';
import RowsTable from './ui/RowsTable';

interface Props {
  searchParams: Promise<{
    page?: string;
    take?: string; 
  }>
}


export default async function({ searchParams }: Props) {
 
  return (
    <>
      <Title title="Users" />

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
  const take = params.take ? parseInt(params.take) : 6;

  const result = await requireAdmin();

  if (!result.authorized) {
    if (result.status === 401) {
      redirect("/auth/login");
    }

    redirect("/");
  }

  const { users = [], totalPages } = await getUsers({page, take});

  return ( 
  <>
    <RowsTable users={users}  />
    <Pagination totalPages={totalPages} />
  </>
  )
  
}


