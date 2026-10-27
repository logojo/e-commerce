

import { Address } from "@/app/interfaces";


interface Props {
  deliverInfo : Address
}

export const DeliverAddress = ({ deliverInfo } : Props ) => {
  
  return (
    <>
      <h2 className="text-xl mb-2">Dirección de entrega</h2>
      <div className="mb-10 flex flex-col">
          <span className="text-lg font-bold">{deliverInfo.firstName} { deliverInfo.lastName }</span>
          <span>{ deliverInfo.address }</span>
          <span>{ deliverInfo.address2 }</span>
          <span>CP: {deliverInfo. postalCode}</span>
          <span>{ deliverInfo.city }, { deliverInfo.country }</span>
          <span>{ deliverInfo.phone}</span>
      </div>
          
    </>
  )
}

