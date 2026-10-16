import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CartProduct } from "@/app/interfaces";

interface State {
    cart: CartProduct[];
    hasHydrated: boolean;
    addProduct: ( product: CartProduct ) => void;
    updateQuantity: (product: CartProduct, quantity: number ) => void;
    getResumenCart: () => {
            totalProducts: number;
            subtotal: number;
            iva: number;
        };
    removeProduct: (product: CartProduct) => void;
    setHasHydrated: (value: boolean) => void;
}

export const useCartStore = create<State>()(
    devtools(
        persist(
                (set, get) => ({
                    cart: [],
                    quantity: 1,
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

                    getResumenCart:() => {
                        const { cart } = get()
                        const totalProducts =  cart.reduce((total, item) => total + item.quantity, 0);
                        const subtotal =  cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                        const iva = subtotal * .16;
                        return  {
                            totalProducts,
                            subtotal,
                            iva
                        };
                    },

                    updateQuantity: ( product : CartProduct, quantity: number ) => {
                        const { cart } = get();
                        const updateQuantity = cart.map( (item) => {
                            if( item.id === product.id && item.size === product.size ) {
                                return {...item, quantity }
                            }

                            return item;
                        })

                        set({ cart: updateQuantity })
                    },
                    removeProduct: ( product ) => {                        
                        const { cart } = get();
                        const updateProducts = cart.filter( (item) =>  item.id !== product.id || item.size !== product.size ) 

                        set({ cart: updateProducts })
                    },       
                    setHasHydrated: (value) => {
                        set({ hasHydrated: value });
                    },            
                    
            }),
            {
                name: 'shopping-cart',
                onRehydrateStorage: () => (state, error) => {
                    if (!error) {
                        state?.setHasHydrated(true);
                    }
                },               
            }
        )
    )
)