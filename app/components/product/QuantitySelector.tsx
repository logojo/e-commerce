'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity : number;
    setQuantity: (quantity: number) =>  void;
}

export const QuantitySelector = ({ quantity, setQuantity } : Props) => {
    
  return (
    <div className="my-3">
        <h3 className="font-bold text-sm mb-1">Cantidad</h3>
        <div className="flex">
            <button type="button" className="cursor-pointer active:scale-90" onClick={() => {
                if( quantity <= 1 ) return;
                 setQuantity( quantity -1 )
            }}>
                <IoRemoveCircleOutline size={20} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded"> { quantity } </span>            
            <button type="button" className="cursor-pointer active:scale-90"  onClick={() => setQuantity( quantity +1 )}>
                <IoAddCircleOutline size={20} />
            </button>
        </div>
    </div>
  )
}
