import { create } from 'zustand'

interface State {
    isSideMenuOpen: boolean;
    loading: boolean;
    error: string|null;
    handleSideMenu: () => void
    handleloading: () => void
    handleError: ( value : string|null ) => void
}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  loading: false,
  error: null,
  handleSideMenu: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
  handleloading: () => set((state) => ({ loading: !state.loading })),
  handleError: ( value ) => set(() => ({ error: value })),
}))