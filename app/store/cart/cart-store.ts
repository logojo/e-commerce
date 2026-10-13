import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CartProduct } from "@/app/interfaces";

interface State {
    cart: CartProduct[];
    hasHydrated: boolean;
    addProduct: ( product: CartProduct ) => void;
    updateQuantity: () => void;
    removeProduct: () => void;
    setHasHydrated: (value: boolean) => void;
}

export const useCartStore = create<State>()(
    devtools(
        persist(
                (set, get) => ({
                    cart: [],
                    hasHydrated: false,
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

                    getTotalItems:() => {
                        const { cart } = get()
                        const total =  cart.reduce((total, item) => total + item.quantity, 0);
                        return total;
                    },

                    updateQuantity: () => {},
                    removeProduct: () => {},       
                    setHasHydrated: (value) => {
                        set({ hasHydrated: value });
                    },            
                    
            }),
            {
                name: 'shopping-cart',
                onRehydrateStorage: () => (state, error) => {
                    if (!error) {
                        state?.setHasHydrated(true);
                        console.log( state?.hasHydrated );
                        
                    }
                },               
            }
        )
    )
)