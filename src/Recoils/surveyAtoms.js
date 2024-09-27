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

function randomUrl() {
    let newUrl = ''
    const alphabets = 'abcdefghijklmonpqrstuvwxyz'
    const lowerCase = alphabets.split('')
    const upperCase = alphabets.toUpperCase().split('')
    const number = '0123456789'.split('')
    const merge = [...lowerCase, ...upperCase, ...number]
    while(newUrl.length <= 10){
        let rn = parseInt(Math.random() * merge.length)
        newUrl += merge[rn]
    }
    return newUrl
}

const tabsAtom = atom({
    key: 'tab-list',
    default: []
})

const activeTabAtom = atom({
    key: 'active-tab',
    default: ''
})

const surveyTitleAtom = atom({
    key: 'survey-title',
    default: ''
})

const urlAtom = atom({
    key: 'url',
    default: ''
})

const pagesAtom = atom({
    key: 'pages',
    default : []
})

const endingMentAtom = atom({
    key: 'endingMent',
    default : {
        title: '',
        description: ''
    }
})

const surveyPeriodAtom = atom({
    key: 'surveyPeriod',
    default : {
        start: null,
        end: null
    }
})

const activeCardAtom = atom({
    key: 'activeCard',
    default : 'P-0'
})


export {
    randomKey, randomUrl,
 
    urlAtom, surveyTitleAtom,
    tabsAtom, activeTabAtom, activeCardAtom,
    pagesAtom, endingMentAtom, surveyPeriodAtom, 
}