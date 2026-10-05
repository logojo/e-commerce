'use client'
import { useState } from "react"
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5"

interface Props {
    quantity : number
}

export const QuantitySelector = ({ quantity } : Props) => {
    const [count, setCount] = useState(0);
    
  return (
    <div className="my-3">
        <h3 className="font-bold text-sm mb-1">Cantidad</h3>
        <div className="flex">
            <button type="button" className="cursor-pointer active:scale-90" onClick={() => {
                if( count <= 0 ) return;
                 setCount( count -1 )
            }}>
                <IoRemoveCircleOutline size={20} />
            </button>
            <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded"> { quantity + count} </span>            
            <button type="button" className="cursor-pointer active:scale-90"  onClick={() => setCount( count +1 )}>
                <IoAddCircleOutline size={20} />
            </button>
        </div>
    </div>
  )
}
