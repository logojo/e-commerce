import { DeliverAddress } from '@/app/components/sale/DeliverAddress'
import { Loader } from '@/app/components/ui/Loader';
import { Address } from '@/app/interfaces';
import { currencyFormat } from '@/app/utils';
import PayPalCheckout from './PayPalCheckout';


interface Props {
 orderId: string
 deliverInfo: Address;
 totalProducts: number;
 subtotal: number;
 iva: number;
 total: number
}
export const DeliverInfo = ({ orderId, deliverInfo, totalProducts, subtotal, iva, total } : Props) => {
  const  loading = false;
  return (
    <div>
         
        <DeliverAddress deliverInfo={deliverInfo} />
            
        <div className="w-full h-0.5 rounded bg-gray-100 my-10" />
    
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{totalProducts} {totalProducts > 1 ? 'artículos' :  'artículo'}</span>

            <span>Subtotal</span>
            <span className="text-right">{ currencyFormat( subtotal ) }</span>

            <span>Impuestos (16%)</span>
            <span className="text-right">{ currencyFormat( iva ) }</span>

            <span className="text-2xl mt-5">Total</span>
            <span className="text-right mt-5 text-2xl"> {currencyFormat( total ) }</span>
        </div>
    
        <div className="mt-5 mb-2">
            <PayPalCheckout orderId={orderId}/>
            {/* <button className={
                    clsx(
                        "w-full flex items-center gap-2 btn-primary justify-center ", {
                        "cursor-pointer active:scale-90": !loading
                        }
                    )
                    }
                    disabled={loading}                   
            >
                    { loading && <Loader />}
                    Realizar Pago
            </button> */}
        </div>
                  
        </div>
  )
}