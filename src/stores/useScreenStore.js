import { create } from "zustand";

export const useScreenStore = create((set, get) => ({
  mode: 'dark',
  setMode: (value) => set({mode : value}),

  sidebarWidth: 320,

  activeTab: '/my-form/manage',
  setActiveTab: (value) => set({ activeTab : value }),
  resetActiveTab: () => set({activeTab : '/my-form/manage' }),

  isSidebarOpen: true,
  setIsSidebarOpen: (boolean = true) => set({ isSidebarOpen : boolean }),

  switchTheScreen: '',

  setSwitchTheScreen: (value) => {
    set({switchTheScreen : value})
  },

  setSidebarWidth: (width) => {
    set({ sidebarWidth : width })
  },

  

}))