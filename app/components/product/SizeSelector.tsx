import type { ValidSizes } from "@/app/interfaces"
import clsx from "clsx"

interface Props {
    selectedSize?: ValidSizes
    sizes: ValidSizes[]
    setSize: (size: ValidSizes) => void
}

export const SizeSelector = ({ selectedSize, sizes,setSize } : Props) => {
  return (
    <div className="my-3">
        <h3 className="font-bold text-sm mb-1">Tallas</h3>
        <div>
          {
            sizes.map(size => (
                <button key={size}
                        onClick={() => setSize(size) }
                        className={
                          clsx("mx-2 hover:underline cursor-pointer", {
                          'underline':  selectedSize === size
                        })
                      }
                >
                  {size}
                </button>
            ))
          }
          
        </div>
    </div>
  )
}