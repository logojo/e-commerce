import { create } from 'zustand'

interface State {
    isSideMenuOpen: boolean;
    handleSideMenu: () => void
}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  handleSideMenu: () => set((state) => ({ isSideMenuOpen: !state.isSideMenuOpen })),
}))