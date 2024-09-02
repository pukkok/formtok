import { atom } from "recoil";

const gridAtom  = atom({
    key: 'amdin-grid',
    default : 300
})

const isSideOpenAtom = atom({
    key: 'sidebar-open',
    default : true
})

const tabsAtom = atom({
    key: 'tab-list',
    default: []
})

const activeTabAtom = atom({
    key: 'active-tab',
    default: ''
})

const pagesAtom = atom({
    key: 'pages',
    default : [{
        header: {title: '', description : ''}, 
        questions: [
            {type: 'multiple', q: '', d: '', a: []}
        ]}]
})
const activeCardAtom = atom({
    key: 'activeCard',
    default : 'h-0'
})

export {
    gridAtom, isSideOpenAtom,
    tabsAtom, activeTabAtom,
    pagesAtom, activeCardAtom
}