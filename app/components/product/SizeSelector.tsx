import type { ValidSizes } from "@/app/interfaces"
import clsx from "clsx"

interface Props {
    selectedSize : ValidSizes
    sizes: ValidSizes[]
}

export const SizeSelector = ({ selectedSize, sizes } : Props) => {
  return (
    <div className="my-3">
        <h3 className="font-bold text-sm mb-1">Tallas</h3>
        <div>
          {
            sizes.map(size => (
                <button key={size}
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