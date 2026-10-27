
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { getCountries } from '@/app/actions/country/get-country';
import { getUserAddres } from '@/app/actions/address/get-user-address';

import { Title } from '@/app/components';
import { AddressForm } from './ui/AddressForm';
import Loading from '@/app/loading';
import { redirect } from 'next/navigation';

export default async function() {

  return (
      <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

        <div className="w-full xl:w-250 flex flex-col justify-center text-left">
          
          <Title title="Dirección" subtitle="Dirección de entrega" />

          <Suspense fallback={<Loading />}>
            <CheckoutView />
          </Suspense>

        </div>

      </div>
  );
}


const CheckoutView = async() => {
  const session = await auth.api.getSession({
      headers: await headers(),
  })

   if (!session) {
    redirect("/auth/login");
  }

  const countries = await getCountries();
  const address = await getUserAddres(session.user.id) ?? undefined;

  return (
    <div>
       <AddressForm countries={countries} user={session.user} userAddress={address} />
    </div>
  )
}
