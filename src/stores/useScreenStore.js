import { create } from "zustand";

export const useScreenStore = create((set, get) => ({
  mode: 'dark',
  sidebarWidth: 320,
  isSidebarOpen: true,
  switchTheScreen: '',

  setMode: (value) => {
    set({mode : value})
  },

  setSwitchTheScreen: (value) => {
    set({switchTheScreen : value})
  },

  setSidebarWidth: (width) => {
    set({ sidebarWidth : width })
  },

  /** 
   * @param {Boolean} boolean 
   */
  setIsSidebarOpen: (boolean = true) => {
    set({isSidebarOpen : boolean})
  }

}))