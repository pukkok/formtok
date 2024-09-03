import dayjs from "dayjs";
import { atom } from "recoil";

function randomKey(){
    let newKey = ''
    function getRandomNumber () {
        return parseInt(5 + Math.random() * 5)
    }
    const x = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const now = dayjs().format('YYYY-MM-DDTHH:mm:ss')
    let r = getRandomNumber()
    for(let i=0; i<r; i++){
        newKey += x[parseInt(Math.random()*x.length)]
    }
    newKey += now
    return newKey
}

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
        header: {id: 'P'+randomKey(), title: '', description : ''}, 
        questions: [
            {id: randomKey(), type: 'multiple', q: '', d: '', a: []}
        ]}]
})
const activeCardAtom = atom({
    key: 'activeCard',
    default : 'h-0'
})

export {
    randomKey,
    gridAtom, isSideOpenAtom,
    tabsAtom, activeTabAtom,
    pagesAtom, activeCardAtom
}