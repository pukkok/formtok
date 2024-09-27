import { atom } from "recoil";

const modeAtom = atom({
    key: 'mode',
    default: 'dark'
})

const gridAtom  = atom({
    key: 'amdin-grid',
    default : 320
})

const isSideOpenAtom = atom({
    key: 'sidebar-open',
    default : true
})

const switchTheScreenAtom = atom({
    key: 'switchTheScreen',
    default : ''
})

export {
    modeAtom,
    gridAtom, isSideOpenAtom,
    switchTheScreenAtom
}