import { create } from "zustand";

export const useScreenStore = create((set, get) => ({
  mode: 'dark',
  adminGrid: 320,
  isSideOpen: true,
  switchTheScreen: '',

  setSwitchTheScreen: (value) => {
    set({switchTheScreen : value})
  }

}))