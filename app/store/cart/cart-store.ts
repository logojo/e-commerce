import type { CartProduct } from "@/app/interfaces";
import { create } from "zustand";

interface State {
    cart: CartProduct[];
    addProduct: ( product: CartProduct ) => void;
    updateQuantity: () => void;
    removeProduct: () => void;
}

export const useCartStore = create<State>()(
    (set, get) => ({
        cart: [],
        addProduct: ( product : CartProduct) => {
            const { cart } = get();

            //Revisando si el producto existe con la talla seleccionada
            const productInCart =  cart.some( 
                (item) => item.id === product.id && item.size === product.size
            );

            if( !productInCart ) {
                set({cart: [...cart, product ]})
                return;
            }

            //2. el produco existe por talla
            const updateCartProducts = cart.map( (item) => {
                if( item.id === product.id && item.size === product.size ) {
                    return {...item, quantity: item.quantity + product.quantity }
                }

                return item;
            })

            set({ cart: updateCartProducts })
        },
        updateQuantity: () => {},
        removeProduct: () => {},
    })
)