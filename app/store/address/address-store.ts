import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface State {
    deliverInfo: {
        firstName:     string;
        lastName:      string;
        address:       string;
        address2?:     string;
        postalCode:    string;
        city:          string;
        country:       string;
        phone:         string;
    },
    hasHydrated: boolean;
    setDeliverInfo: (deliverInfo: State['deliverInfo'] ) => void
    setHasHydrated: (value: boolean) => void;
}

export const useAddresStore = create<State>()(
     devtools(
        persist(
            (set, get) => ({
                deliverInfo: {
                    firstName: '',
                    lastName: '',
                    address: '',
                    address2: '',
                    postalCode: '',
                    city: '',
                    phone: '',
                    country: '',
                },
                hasHydrated: false,
                setDeliverInfo: (deliverInfo) => set({ deliverInfo }),
                setHasHydrated: (value) => {
                    set({ hasHydrated: value });
                }, 
            }), 
            {
                name: 'deliver-information',
                onRehydrateStorage: () => (state, error) => {
                    if (!error) {
                        state?.setHasHydrated(true);
                    }
                }, 
            }
        )
    )
)